const { Router, json } = require('express');
const router = Router();
const {
  models: { Chore },
} = require('../db/models/associations');

router.use(json());

//get all chores
router.get('/', async (req, res, next) => {
  try {
    res.send(await Chore.findAll());
  } catch (err) {
    next.err;
  }
});

//create new chore
router.post('/', async (req, res, next) => {
  try {
    const { name, description, amount, due, isRecurring, recurringInterval } =
      req.body;
    const newChore = await Chore.create({
      name,
      description,
      amount,
      due,
      isRecurring,
      recurringInterval,
    });
    res.status(201).send(newChore);
  } catch (err) {
    next(err);
  }
});

//update chore
router.put('/:id', async (req, res, next) => {
  try {
    const choreToUpdate = await Chore.findByPk(req.params.id);
    const { name, description, amount, due, isRecurring, recurringInterval } =
      req.body;
    await choreToUpdate.update({
      name,
      description,
      amount,
      due,
      isRecurring,
      recurringInterval,
    });
    res.status(200).send(choreToUpdate);
  } catch (err) {
    next(err);
  }
});

//delete chore
router.delete('/:id', async (req, res, next) => {
  try {
    const choreToDelete = await Chore.findByPk(req.params.id);
    await choreToDelete.destroy();
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
