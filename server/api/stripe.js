const { Router } = require('express');
const router = Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET);
const {
  models: { User, Notification },
} = require('../db/models/associations');
const { ToadScheduler, SimpleIntervalJob, Task } = require('toad-scheduler');

const socketUtils = require('../../socketUtils');
const Family = require('../db/models/Family');

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

//stripe payout (creating a negative balance for parent upon withdrawawl to use as credit)
router.post('/payouts', async (req, res, next) => {
  try {
    const { userId, transaction } = req.body;
    const user = await User.findOne({ where: { id: userId } });
    const newBalance = parseFloat(user.balance) - parseFloat(transaction.cost);
    user.balance = newBalance;
    await user.save();
    res.status(201).send(user);
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
      description: `FUNDIT charge for ${kid}'s virtual credit card.`,
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
    const card_details = await stripe.issuing.cards.retrieve(cardId, {
      expand: ['number', 'cvc'],
    });
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

const invoiceScheduler = new ToadScheduler();

//create invoice item
router.post('/invoiceitems/:id', async (req, res, next) => {
  try {
    let invoiceTransactions;
    //create task to create invoice items every month
    const invoiceItemTask = new Task('item', async () => {
      //finds parent and maps over children to get all virtual card Ids
      const parent = await User.findOne({
        where: { stripeAccount: req.params.id },
        include: [
          {
            model: Family,
            include: {
              model: User,
              where: { status: 'Child' },
              attributes: ['virtualCard'],
            },
          },
        ],
      });

      const virtualCards = parent.family.users.map((kid) => kid.virtualCard);

      //for production, this would be by the month, but for testing and demo it is by the date.
      const currDate = new Date().getDate();

      //for each virtual card in family, get transactions and filter based on yesterdays transactions
      await virtualCards.forEach(async (card) => {
        const transactions = await stripe.issuing.transactions.list({
          card,
        });
        const currTransactions = await transactions.data.filter(
          (transaction) => {
            return (
              new Date(transaction.created * 1000).getDate() === currDate - 1
            );
          }
        );

        invoiceTransactions = currTransactions;
        console.log('transactions-sorted', invoiceTransactions?.length);

        if (currTransactions?.length) {
          await currTransactions.forEach(async (transaction) => {
            const completed = await stripe.invoiceItems.create({
              customer: req.params.id,
              amount: Math.abs(transaction.amount),
              currency: 'usd',
            });
            console.log('completed', completed);
          });
        }
      });

      const invoiceItems = await stripe.invoiceItems.list({
        customer: req.params.id,
        pending: true,
      });
    });

    //create new job and add to scheduler
    const newJob = new SimpleIntervalJob({ minutes: 1 }, invoiceItemTask);
    invoiceScheduler.addSimpleIntervalJob(newJob);
  } catch (err) {
    next(err);
  }
});

//create invoice
router.post('/invoice/:id/:user', async (req, res, next) => {
  try {
    const add = new Task('invoice', async () => {
      const invoiceItems = await stripe.invoiceItems.list({
        customer: req.params.id,
        pending: true,
      });
      console.log('invoiceItems', invoiceItems.data.length);
      if (invoiceItems.data.length) {
        const draftInvoice = await stripe.invoices.create({
          customer: req.params.id,
          auto_advance: true,
        });

        if (draftInvoice.id) {
          const finalInvoice = await stripe.invoices.finalizeInvoice(
            draftInvoice.id,
            {
              auto_advance: true,
            }
          );
          await stripe.invoices.pay(finalInvoice.id);

          //create notification
          await Notification.create({
            text: finalInvoice.hosted_invoice_url,
            amount: finalInvoice.total,
            toId: 8,
            isInvoice: true,
          });
        }
      } else {
        return;
      }
    });
    const newJob = new SimpleIntervalJob({ minutes: 1 }, add);

    //for production
    // const newJob = new SimpleIntervalJob({ months: 1 }, add);

    invoiceScheduler.addSimpleIntervalJob(newJob);
  } catch (err) {
    next(err);
  }
});

//route to manually finalize and pay invoice
//invoices are auto finalized after 1 hour and payment is attempted 1 hour after that
//for demo purposes, we want to finalize immediatley after created
//and pay immediately after finalized
router.put('/invoice/:id/finalize', async (req, res, next) => {
  try {
    const invoice = await stripe.invoices.finalizeInvoice(req.params.id, {
      auto_advance: true,
    });
    await stripe.invoices.pay(invoice.id);
    res.status(200).send(invoice);
  } catch (err) {
    next(err);
  }
});

//get transaction by card ID
router.get('/transactions/:card', async (req, res, next) => {
  try {
    const transactions = await stripe.issuing.transactions.list({
      card: req.params.card,
    });
    res.send(transactions);
  } catch (err) {
    next(err);
  }
});

//stops all invoice intervals from running
router.put('/invoice/stopall', async (req, res, next) => {
  try {
    if (invoiceScheduler) await invoiceScheduler.stop();
    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
