const { Router } = require('express');
const router = Router();
const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');
//test key sk_test_4eC39HqLyjWDarjtT1zdp7dc

router.post('/', async (req, res, next) => {
  try {
    const cardholder = await stripe.issuing.cardholders.create({
      name: 'Jenny Rosen',
      email: 'jenny.rosen@example.com',
      phone_number: '+18008675309',
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
    console.log('cardholder:', cardholder.id);
    let card = await stripe.issuing.cards.create({
      cardholder: cardholder.id,
      type: 'virtual',
      currency: 'usd',
      spending_controls: {
        spending_limits: [
          {
            amount: 40,
            interval: 'weekly',
          },
        ],
      },
    });
    console.log('card before activation:', card);
    card = await stripe.issuing.cards.update(card.id, {
      status: 'active',
    });
    console.log('card after activation:', card);
    console.log(
      'card spending limits:',
      card.spending_controls.spending_limits
    );
    // const cardholders = await stripe.issuing.cards.list();
    // console.log('cards', cardholders);
    res.status(200).send();
  } catch (err) {
    console;
    next(err);
  }
});

module.exports = router;
