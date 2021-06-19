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

// get balance
router.get('/balance', async (req, res, next) => {
  try {
    const balance = await stripe.balance.retrieve({});
    res.send(balance);
  } catch (err) {
    next(err);
  }
});

// stripe payout
router.post('/payouts', async (req, res, next) => {
  try {
    const { amount, destination } = req.body;
    console.log('here', amount);
    const payout = await stripe.payouts.create(
      {
        amount,
        currency: 'usd',
        source_type: 'bank_account',
        // destination: 'ba_1IzurxGMLeOpoTZxmnr0PWCS',
      },
      {
        stripeAccount: 'acct_1IzAbQ4TLAmJPSen',
      }
    );
    const refund = await stripe.refunds.create({
      charge: 'ch_1J1ZYZGMLeOpoTZxnj6cjG6Q',
    });
    res.send(refund);
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

//create an ACH charge
router.post('/charges', async (req, res, next) => {
  try {
    const { customer, amount, kid } = req.body;
    const charge = await stripe.charges.create({
      customer: customer,
      amount: amount,
      currency: 'usd',
      description: `FUNDIT charge for ${kid}'s virtual creadit card.`,
    });
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
    const { name, email, id } = req.body;
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

    const user = await User.findByPk(id);
    const updatedUser = await user.update({
      cardHolderId: cardholder.id,
    });

    res.send(updatedUser);
  } catch (err) {
    next(err);
  }
});

//create a card - triggered on register
router.post('/create_card', async (req, res, next) => {
  try {
    const { cardholder, id } = req.body;
    const card = await stripe.issuing.cards.create({
      cardholder: cardholder,
      type: 'virtual',
      currency: 'usd',
      status: 'active',
    });

    const user = await User.findByPk(id);
    await user.update({
      virtualCard: card.id,
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

//create invoice item
router.post('/invoiceitems/:id', async (req, res, next) => {
  try {
    const { amount, description } = req.body;
    const invoiceItem = await stripe.invoiceItems.create({
      customer: req.params.id,
      amount,
      description,
    });
    res.status(201).send(invoiceItem);
  } catch (err) {
    next(err);
  }
});

//create invoice
router.post('/invoice/:id', async (req, res, next) => {
  try {
    const invoice = await stripe.invoices.create({
      customer: req.params.id,
      auto_advance: true,
    });
    res.status(201).send(invoice);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
