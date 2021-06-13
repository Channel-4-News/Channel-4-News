const { Router } = require('express');
const router = Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET);
const {
  models: { User },
} = require('../db/models/associations');

// create stripe customerId for user
router.post('/', async (req, res, next) => {
  try {
    const { email, metadata, fullName } = req.body;
    const customer = await stripe.customers.create({
      email,
      metadata,
      fullName,
    });
    res.status(201).send(customer);
  } catch (err) {
    next(err);
  }
});

//get balance
router.get('/balance', async (req, res, next) => {
  try {
    const balance = await stripe.balance.retrieve({});
    console.log(balance);
    res.send(balance);
  } catch (err) {
    next(err);
  }
});

//stripe payout (creating a negative balance for parent upon withdrawawl to use as credit)
router.post('/payouts', async (req, res, next) => {
  try {
    const { userId, transaction } = req.body;
    const user = await User.findOne({ where: { id: userId } });
    const parents = await User.findAll({
      where: {
        familyId: user.familyId,
        status: 'Parent',
      },
    });
    const parent = parents.filter((data) => {
      if (data.stripeAccount) return data;
    });
    console.log('parent before updated balance', parent[0]);
    const balanceTransaction = await stripe.customers.createBalanceTransaction(
      parent[0].stripeAccount,
      { amount: -transaction.cost * 100, currency: 'usd' }
    );
    console.log('balance:', balanceTransaction);
    parent[0].balance = (balanceTransaction.amount / 100).toFixed(2);
    await parent[0].save();
    console.log('parent after updated balance', parent[0]);
    res.send(balanceTransaction);
  } catch (ex) {
    next(ex);
  }
});

//create bank account using stripe bank account token from plaid - untested -triggered on register/connect bank acct
router.post('/create_bank_account', async (req, res, next) => {
  try {
    const { id, accountToken } = req.body;
    const bankAccount = await stripe.customers.createSource(id, {
      source: accountToken,
    });
    res.status(201).send(bankAccount);
  } catch (err) {
    next(err);
  }
});

//create an ACH charge - untested - triggered on chore payout
router.post('/charges', async (req, res, next) => {
  try {
    const { customer, amount, kid } = req.body;
    let newAmount = amount;
    const parent = await User.findOne({ where: { stripeAccount: customer } });
    if (parseInt(parent.balance) * 100 < 0) {
      newAmount += parseInt(parent.balance) * 100;
    }
    const charge = await stripe.charges.create({
      customer: customer,
      amount: newAmount,
      currency: 'usd',
      description: `FUNDIT charge for ${kid}'s virtual creadit card.`,
    });
    console.log(charge);
    //update parent balance after charge is created
    parent.balance = (
      (parseInt(parent.balance) * 100 + parseInt(amount)) /
      100
    ).toFixed(2);
    await parent.save();
    //update kid's balance after charge is created
    const kidToCharge = await User.findOne({ where: { firstName: kid } });
    kidToCharge.balance = (
      (parseInt(kidToCharge.balance * 100) + parseInt(amount)) /
      100
    ).toFixed(2);
    await kidToCharge.save();
    //update card spending limit
    const card = await stripe.issuing.cards.update(kidToCharge.virtualCard, {
      spending_controls: {
        spending_limits: [
          { amount: parseInt(kidToCharge.balance) * 100, interval: 'all_time' },
        ],
      },
    });
    console.log(card.spending_controls.spending_limits);
    res.status(201).send(charge);
  } catch (err) {
    next(err);
  }
});

// CREATE VIRTUAL CARDS

//create a card holder - triggered on register
router.post('/create_cardholder', async (req, res, next) => {
  try {
    const { name, email } = req.body;
    const cardholder = await stripe.issuing.cardholders.create({
      name: name,
      email: email,
      status: 'active',
      type: 'individual',
      billing: {
        address: {
          line1: '123 Main Street',
          city: 'San Francisco',
          state: 'CA',
          postal_code: '94111',
          country: 'US',
        },
      },
    });

    res.send(cardholder);
  } catch (err) {
    next(err);
  }
});

//create a card - triggered on register
router.post('/create_card', async (req, res, next) => {
  try {
    const { cardholder } = req.body;
    const card = await stripe.issuing.cards.create({
      cardholder: cardholder,
      type: 'virtual',
      currency: 'usd',
      status: 'active',
    });
    res.send(card);
  } catch (err) {
    next(err);
  }
});

//get card details - child landing page
router.get('/card/:id', async (req, res, next) => {
  try {
    const cardId = req.params.id;
    const card_details = await stripe.issuing.cards.retrieve(cardId, {
      expand: ['number', 'cvc'],
    });
    res.send(card_details);
  } catch (err) {
    next(err);
  }
});

//set spending limit - triggered on chore payout
router.put('/card/:id/limit', async (req, res, next) => {
  try {
    const { cardId, limit } = req.body;
    const card = await stripe.issuing.cards.update(cardId, {
      spending_controls: {
        spending_limits: [
          {
            amount: limit,
            interval: 'all_time',
          },
        ],
      },
    });
    res.send(card);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
