const { DataTypes } = require('sequelize');
const db = require('../db');

const TransactionHistory = db.define('transaction history');

const Transaction = db.define('transaction', {
  cost: {
    type: DataTypes.FLOAT,
    defaultValue: 0,
  },
  category: {
    type: DataTypes.ENUM([
      'Electronics',
      'Clothing',
      'Entertainment',
      'Toys',
      'Miscellaneous',
      'Food',
    ]),
    defaultValue: 'Miscellaneous',
  },
  allowanceId: {
    type: DataTypes.INTEGER,
  },
});

module.exports = { Transaction, TransactionHistory };
