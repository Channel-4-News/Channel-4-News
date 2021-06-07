const { Router } = require('express');
const router = Router();

const {
  models: { Transaction },
} = require('../db/models/associations');

//Get all transactions by userId
router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const transactions = await Transaction.findAll({
      where: { userId: id },
    });
    res.send(transactions);
  } catch (err) {
    next(err);
  }
});

//Add item to userId
router.post('/:id', async (req, res, next) => {
  try {
    const { cost, category, itemName, linkUrl } = req.body;
    const { id } = req.params;
    const newItem = await Transaction.create({
      cost,
      category,
      userId: id,
      itemName,
      linkUrl,
    });
    res.status(201).send(newItem);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
