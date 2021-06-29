const router = require('express')();
// const router = Router();
const {
  models: { User },
} = require('../db/models/associations');
const Family = require('../db/models/Family');
const { Transaction } = require('../db/models/Transaction');
const { route } = require('./families');

//interval scheduling
const { ToadScheduler, SimpleIntervalJob, Task } = require('toad-scheduler');
const { Chore } = require('../db/models/Chore');
const { startScheduler } = require('../taskIntervalUtils');

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
              include: [{ model: Transaction }, { model: Chore }],
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
      hasBankAccount,
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
      hasBankAccount,
    });
    res.status(200).send(userToUpdate);
  } catch (err) {
    next(err);
  }
});

//created scheduler
const scheduler = new ToadScheduler();

//route to add allowance
router.put('/allowance/:id', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    const { allowance, intervalNum, name, email } = req.body;

    await user.update({ balance: user.balance * 1 + allowance });

    //add allowance to scheduler
    const add = new Task('allowance', async () => {
      await user.update({ balance: user.balance * 1 + allowance });
    });
    const newJob = new SimpleIntervalJob({ seconds: intervalNum * 2 }, add);

    newJob.id = email;
    startScheduler.addSimpleIntervalJob(newJob);

    //add allowance interval to scheduler
    const addInterval = new Task(name, async () => {
      if (user.daysToAllowance > 1) {
        await user.update({ daysToAllowance: user.daysToAllowance - 1 });
      } else {
        await user.update({ daysToAllowance: user.allowanceInterval });
      }
    });

    const intervalJob = new SimpleIntervalJob({ seconds: 2 }, addInterval);

    intervalJob.id = name;

    // //this is what we would want if the app went into productions
    // const intervalJob = new SimpleIntervalJob({ days: 1 }, addInterval);

    setTimeout(() => {
      startScheduler.addSimpleIntervalJob(intervalJob);
    }, 1700);
    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
});

//stops single allowance interval job from running
router.put('/allowance/stop/:id', async (req, res, next) => {
  try {
    console.log('test');
    console.log(startScheduler);
    const { name, email } = req.body;
    if (name in startScheduler.jobRegistry) {
      await startScheduler.stopById(name);
      await startScheduler.stopById(email);
      await delete startScheduler.jobRegistry[name];
      await delete startScheduler.jobRegistry[email];
    }
    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
});

//stops all allowance intervals from running
router.put('/stop/allowance', async (req, res, next) => {
  try {
    if (startScheduler) await startScheduler.stop();
    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
});

//stop all task jobs
router.put('/stop/all', async (req, res, next) => {
  try {
    await startScheduler.stop();
    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
