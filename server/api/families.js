const { Router, json } = require('express');
const router = Router();
const {
  models: { Family, ChoreList },
} = require('../db/models/associations');

//get all families
router.get('/', async (req, res, next) => {
  try {
    res.send(await Family.findAll());
  } catch (err) {
    next.err;
  }
});

//get single family by id
router.get('/:id', async (req, res, next) => {
  try {
    res.send(await Family.findByPk(req.params.id));
  } catch (err) {
    next(err);
  }
});

//create new family
router.post('/', async (req, res, next) => {
  try {
    const { name, familySecret } = req.body;
    Family.ChoreList = Family.hasOne(ChoreList);
    const newFamily = await Family.create(
      {
        name,
        familySecret,
        choreList: {},
      },
      {
        include: [
          {
            association: Family.ChoreList,
          },
        ],
      }
    );
    res.status(201).send(newFamily);
  } catch (err) {
    next(err);
  }
});

//update family
router.put('/:id', async (req, res, next) => {
  try {
    const familyToUpdate = await Family.findByPk(req.params.id);
    const { name, familySecret } = req.body;
    await familyToUpdate.update({
      name,
      familySecret,
    });
    res.status(200).send(familyToUpdate);
  } catch (err) {
    next(err);
  }
});

//delete family
router.delete('/:id', async (req, res, next) => {
  try {
    const familyToDelete = await Family.findByPk(req.params.id);
    await familyToDelete.destroy();
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
