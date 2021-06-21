const { DataTypes } = require('sequelize');
const { db } = require('../db');
const socketUtils = require('../../../socketUtils');
const NotificationList = db.define('notification list');

const Notification = db.define('notification', {
  text: DataTypes.TEXT,
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
  isChoreCompleted: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  isInvoice: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
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

Notification.addHook('afterCreate', async (notification) => {
  const socket = socketUtils
    .getSockets()
    .find((socket) => notification.toId === socket.userId);
  if (socket) {
    notification = await Notification.findByPk(notification.id, {});
    socket.send(JSON.stringify({ type: 'SEND_NOTIFICATION', notification }));
  }
});

module.exports = { Notification, NotificationList };
