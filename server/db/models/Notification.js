const { DataTypes } = require('sequelize');
const { db } = require('../db');

const NotificationList = db.define('notification list');

const Notification = db.define('notification', {
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
  },
  isChore: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  isCash: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

module.exports = { Notification, NotificationList };
