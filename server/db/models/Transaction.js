const { DataTypes } = require('sequelize');
const { db } = require('../db');

const Transaction = db.define('transaction', {
  cost: {
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
  itemName: {
    type: DataTypes.STRING(1000),
  },
  linkUrl: {
    type: DataTypes.STRING(1000),
  },
});

module.exports = { Transaction };
