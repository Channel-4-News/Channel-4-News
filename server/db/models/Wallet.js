const { Sequelize, DataTypes } = require('sequelize');
const db = require('../db');

const Wallet = db.define('wallet', {
  balance: {
    type: DataTypes.INTEGER,
  },
  userId: {
    type: DataTypes.INTEGER,
  },
  allowanceId: {
    type: DataTypes.INTEGER,
  },
});
