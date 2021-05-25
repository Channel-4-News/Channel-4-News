const { DataTypes } = require('sequelize');
const { db } = require('../db');

const TransactionHistory = db.define('transaction history');

const Transaction = db.define('transaction', {
  amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
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
});

module.exports = { Transaction, TransactionHistory };
