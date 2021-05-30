const { DataTypes } = require('sequelize');
const { db } = require('../db');

const ChoreList = db.define('choreList');

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
  amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    defaultValue: 0,
  },
  due: {
    type: DataTypes.DATEONLY,
  },
  isRecurring: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  recurringInterval: {
    type: DataTypes.INTEGER,
    defaultValue: null,
    allowNull: true,
  },
  icon: {
    type: DataTypes.STRING,
    defaultValue: 'public/images/choreIcons/misc.png',
  },
});

module.exports = { Chore, ChoreList };
