const { DataTypes } = require('sequelize');
const { db } = require('../db');

const Chore = db.define('chore', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  description: {
    type: DataTypes.STRING(4000),
  },
  isComplete: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  reward: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  due: {
    type: DataTypes.DATE,
  },
  isRecurring: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  recurringInterval: {
    type: DataTypes.TIME,
    defaultValue: null,
    allowNull: true,
  },
});

module.exports = Chore;
