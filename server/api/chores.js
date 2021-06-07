const { Router } = require('express');
const router = Router();
const {
  models: { User, Chore },
} = require('../db/models/associations');

//get all chores by chorelist id
router.get('/chores/:id', async (req, res, next) => {
  try {
    res.send(await Chore.findAll({ where: { choreListId: req.params.id } }));
  } catch (err) {
    next(err);
  }
});

//get chores by family id
router.get('/family/:id', async (req, res, next) => {
  try {
    const chores = await Chore.findAll({
      where: { familyId: req.params.id },
      include: [User],
      order: [['createdAt', 'DESC']],
    });
    res.send(chores);
  } catch (err) {
    next(err);
  }
});

//create new chore
router.post('/', async (req, res, next) => {
  Chore.User = Chore.belongsTo(User);
  try {
    const {
      icon,
      name,
      description,
      amount,
      due,
      isRecurring,
      recurringInterval,
      choreListId,
      userId,
      familyId,
    } = req.body;
    const newChore = await Chore.create({
      icon,
      name,
      description,
      amount,
      due,
      isRecurring,
      recurringInterval,
      choreListId,
      userId,
      familyId,
    });
    res.status(201).send(newChore);
  } catch (err) {
    next(err);
  }
});

//update chores
router.put('/:id', async (req, res, next) => {
  try {
    const choreToUpdate = await Chore.findByPk(req.params.id);
    const {
      icon,
      name,
      description,
      amount,
      due,
      isRecurring,
      recurringInterval,
      isComplete,
      userId,
      wasPaid,
    } = req.body;
    await choreToUpdate.update({
      icon,
      name,
      description,
      amount,
      due,
      isRecurring,
      recurringInterval,
      isComplete,
      userId,
      wasPaid,
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
