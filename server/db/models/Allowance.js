const { DataTypes } = require('sequelize');
const { db } = require('../db');

const Allowance = db.define('allowance', {
  amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    defaultValue: 0,
  },
  interval: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
  },
});

module.exports = Allowance;
