const router = require('express')();
// const router = Router();
const {
  models: { User },
} = require('../db/models/associations');
const Family = require('../db/models/Family');
const { Transaction } = require('../db/models/Transaction');
const { route } = require('./families');

//interval scheduling
const schedule = require('node-schedule');
const { ToadScheduler, SimpleIntervalJob, Task } = require('toad-scheduler');

//get all users
router.get('/', async (req, res, next) => {
  try {
    res.send(await User.findAll());
  } catch (err) {
    next.err;
  }
});

//get single user by id
router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    res.send(
      await User.findByPk(id, {
        include: [
          { model: Transaction },
          // { model: Allowance },
          {
            model: Family,
            include: {
              model: User,
              include: { model: Transaction },
            },
          },
        ],
      })
    );
  } catch (err) {
    next(err);
  }
});

//create new user
router.post('/', async (req, res, next) => {
  try {
    const {
      username,
      email,
      password,
      firstName,
      lastName,
      status,
      isAdmin,
      stripeAccount,
    } = req.body;
    const newUser = await User.create({
      username,
      email,
      password,
      firstName,
      lastName,
      status,
      isAdmin,
      stripeAccount,
    });
    res.status(201).send(newUser);
  } catch (err) {
    next(err);
  }
});

//delete user
router.delete('/:id', async (req, res, next) => {
  try {
    const userToDelete = await User.findByPk(req.params.id);
    await userToDelete.destroy();
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
});

// //upload image file
// router.put('/image/:id', async (req, res, next) => {
//   console.log(req.file);
//   try {
//     res.send({ file: req.file });
//   } catch (err) {
//     next(err);
//   }
// });

//update user
router.put('/:id', async (req, res, next) => {
  try {
    const userToUpdate = await User.findByPk(req.params.id);
    const {
      username,
      email,
      password,
      firstName,
      lastName,
      imgUrl,
      status,
      isAdmin,
      familyId,
      stripeAccount,
      cardHolderId,
      virtualCard,
      cardColor,
      cardImage,
    } = req.body;

    await userToUpdate.update({
      username,
      email,
      password,
      firstName,
      lastName,
      imgUrl,
      status,
      isAdmin,
      familyId,
      stripeAccount,
      cardHolderId,
      virtualCard,
      cardColor,
      cardImage,
    });
    res.status(200).send(userToUpdate);
  } catch (err) {
    next(err);
  }
});

//created scheduler
const scheduler = new ToadScheduler();

//route to modify allowance
router.put('/allowance/modify/:id', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    const { newAllowance, newInterval } = req.body;
    console.log(newAllowance);
    console.log(newInterval);
    user.allowance = newAllowance;
    user.allowanceInterval = newInterval;
    //check if new allowance interval is less than days to current allowance
    if (user.daysToAllowance > newInterval) user.daysToAllowance = newInterval;
    await user.save();
    console.log(user);
    res.status(201).send(user);
  } catch (err) {
    next(err);
  }
});
//route to add allowance
router.put('/allowance/:id', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    const { allowance, allowanceInterval } = req.body;
    await user.update({ balance: user.balance * 1 + allowance });

    //add allowance to scheduler
    const add = new Task('allowance', async () => {
      await user.update({ balance: user.balance * 1 + allowance });
      console.log('adding allowance');
    });
    const newJob = new SimpleIntervalJob({ seconds: 14 }, add);
    scheduler.addSimpleIntervalJob(newJob);

    //add allowance interval to scheduler
    const addInterval = new Task('interval', async () => {
      if (user.daysToAllowance > 1) {
        await user.update({ daysToAllowance: user.daysToAllowance - 1 });
      } else {
        await user.update({ daysToAllowance: user.allowanceInterval });
      }
    });
    const intervalJob = new SimpleIntervalJob({ seconds: 2 }, addInterval);

    // //this is what we would want if the app went into productions
    // const intervalJob = new SimpleIntervalJob({ days: 1 }, addInterval);

    scheduler.addSimpleIntervalJob(intervalJob);
    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
});

// // run on particular date
// const someDate = new Date('2021-06-14T20:07.00.000-04:00');
// schedule.scheduleJob(someDate, () => {
//   console.log('Job ran @', new Date().toString());
// });

// //run at interval
// schedule.scheduleJob(' */2  * * * *', () => {
//   console.log('I ran ...');
// });

module.exports = router;
