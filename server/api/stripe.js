const { Router } = require('express');
const router = Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET);
const {
  models: { User },
} = require('../db/models/associations');

// create stripe account for user
router.post('/', async (req, res, next) => {
  try {
    const { email, metadata } = req.body;
    const account = await stripe.accounts.create({
      type: 'express',
      country: 'US',
      email,
      metadata,
    });
    res.status(201).send(account);
  } catch (err) {
    next(err);
  }
});

//get balance
router.get('/balance', async (req, res, next) => {
  try {
    const balance = await stripe.balance.retrieve({});
    res.send(balance);
  } catch (err) {
    next(err);
  }
});

//stripe payout
router.post('/payouts/:id', async (req, res, next) => {
  try {
    const { amount, destination } = req.body;
    const payout = await stripe.payouts.create({
      amount,
      currency: 'usd',
      destination,
    });
    res.send(payout);
  } catch (ex) {
    next(ex);
  }
});

//create bank account using stripe bank account token from plaid
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

//create an ACH chard
router.post('/charges', async (req, res, next) => {
  try {
    const { amount, source, kid } = req.body;
    const charge = await stripe.charges.create({
      amount: amount,
      currency: 'usd',
      source: source,
      description: `FUNDIT charge for ${kid}'s virtual creadit card.`,
    });
    res.status(201).send(charge);
  } catch (err) {
    next(err);
  }
});

// CREATE VIRTUAL CARDS

//create a card holder
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

//create a card
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

//create card details
router.get('/card', async (req, res, next) => {
  try {
    const { cardId } = req.body;
    const card_details = await stripe.issuing.cards.retrieve(cardId, {
      expand: ['number', 'cvc'],
    });
    res.send(card_details);
  } catch (err) {
    next(err);
  }
});

//set spending limit
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
