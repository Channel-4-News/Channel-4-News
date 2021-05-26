const { Router, json } = require('express');
const router = Router();

const {
  models: { Transaction, TransactionHistory },
} = require('../db/models/associations');

router.use(json());

//Get all transactions in transaction history
router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const transactionHistory = await TransactionHistory.findByPk(id, {
      include: {
        model: Transaction,
      },
    });
    res.send(transactionHistory.transactions);
  } catch (err) {
    next(err);
  }
});

//Add item to transaction history
router.post('/:id', async (req, res, next) => {
  try {
    const { amount, category } = req.body;
    const { id } = req.params;
    const newItem = await Transaction.create({
      amount,
      category,
      transactionHistoryId: id,
    });
    res.status(201).send(newItem);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
