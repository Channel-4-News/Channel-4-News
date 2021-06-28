const { ToadScheduler, SimpleIntervalJob, Task } = require('toad-scheduler');
const stripe = require('stripe')(process.env.STRIPE_SECRET);
const {
  models: { User, Notification },
} = require('../server/db/models/associations');

const startScheduler = new ToadScheduler();

const startAllowanceTasks = async () => {
  const users = await User.findAll({ where: { status: 'Child' } });

  users.forEach((user) => {
    //add allowance interval
    const addAllowance = new Task(`allowance${user.firstName}`, async () => {
      await user.update({ balance: user.balance * 1 + user.allowance });
    });

    const newAllowanceJob = new SimpleIntervalJob(
      { seconds: user.allowanceInterval * 3 + 3 },
      addAllowance
    );

    newAllowanceJob.id = user.firstName;
    startScheduler.addSimpleIntervalJob(newAllowanceJob);

    //add allowance interval
    const addInterval = new Task(`interval${user.firstName}`, async () => {
      if (user.daysToAllowance > 0) {
        await user.update({ daysToAllowance: user.daysToAllowance - 1 });
      } else {
        await user.update({ daysToAllowance: user.allowanceInterval });
      }
    });

    const intervalJob = new SimpleIntervalJob({ seconds: 3 }, addInterval);

    intervalJob.id = user.email;

    setTimeout(() => {
      startScheduler.addSimpleIntervalJob(intervalJob);
    }, 3000);
  });
};

const categories = [
  'Electronics',
  'Clothing',
  'Toys',
  'Food',
  'Entertainment',
  'Miscellaneious',
];

//creates a random invoice item
const getRandomItem = () => {
  let invoiceItem = {
    customer: 'cus_JdBOqmptzdoNis',
    amount: Math.floor(Math.random() * 5003),
    description: categories[Math.floor(Math.random() * 6)],
    currency: 'usd',
  };
  return invoiceItem;
};

const startInvoiceTasks = async () => {
  //adds invoice item to invoice
  const addInvoiceItem = new Task('invoiceItem', async () => {
    await stripe.invoiceItems.create(getRandomItem());
  });
  const invoiceItemJob = new SimpleIntervalJob({ seconds: 10 }, addInvoiceItem);
  startScheduler.addSimpleIntervalJob(invoiceItemJob);

  //creates invoice, finalizes, and submits ACH payment
  const addInvoice = new Task('invoice', async () => {
    const draftInvoice = await stripe.invoices.create({
      customer: 'cus_JdBOqmptzdoNis',
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
  });

  const invoiceJob = new SimpleIntervalJob({ seconds: 30 }, addInvoice);

  setTimeout(() => {
    startScheduler.addSimpleIntervalJob(invoiceJob);
  }, 3000);
};

module.exports = { startAllowanceTasks, startInvoiceTasks, startScheduler };
