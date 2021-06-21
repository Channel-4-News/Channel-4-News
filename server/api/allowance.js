const { Router } = require('express');
const router = Router();
const {
  models: { Allowance, User },
} = require('../db/models/associations');

//get all allowances
router.get('/', async (req, res, next) => {
  try {
    res.send(await Allowance.findAll());
  } catch (err) {
    next.err;
  }
});

//create new allowance
router.post('/', async (req, res, next) => {
  try {
    const { amount, interval } = req.body;
    const newAllowance = await Allowance.create({
      amount,
      interval,
    });
    res.status(201).send(newAllowance);
  } catch (err) {
    next(err);
  }
});

//update allowance
router.put('/:id', async (req, res, next) => {
  try {
    const allowanceToUpdate = await Allowance.findByPk(req.params.id);
    const { amount, interval } = req.body;
    await allowanceToUpdate.update({
      amount,
      interval,
    });
    res.status(200).send(allowanceToUpdate);
  } catch (err) {
    next(err);
  }
});

//delete allowance
router.delete('/:id', async (req, res, next) => {
  try {
    const allowanceToDelete = await Allowance.findByPk(req.params.id);
    await allowanceToDelete.destroy();
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
});

//route to modify allowance on parent landing page
router.put('/modify/:id', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    const { allowance, intervalNum } = req.body;
    user.allowance = allowance;
    user.allowanceInterval = intervalNum;
    user.daysToAllowance = intervalNum;
    //check if new allowance interval is less than days to current allowance
    // if (user.daysToAllowance > intervalNum) user.daysToAllowance = intervalNum;
    await user.save();
    res.status(201).send(user);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
