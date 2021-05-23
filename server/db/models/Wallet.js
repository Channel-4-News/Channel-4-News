const { DataTypes } = require('sequelize');
const db = require('../db');

const Wallet = db.define('wallet', {
  balance: {
    type: DataTypes.FLOAT,
    defaultValue: 0,
  },
});

module.exports = Wallet;
