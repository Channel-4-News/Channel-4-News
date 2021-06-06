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
router.get('/stripe/balance', async (req, res, next) => {
  try {
    const balance = await stripe.balance.retrieve({});
    res.send(balance);
  } catch (err) {
    next(err);
  }
});

//stripe payout
router.post('/stripe/payouts/:id', async (req, res, next) => {
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

module.exports = router;
