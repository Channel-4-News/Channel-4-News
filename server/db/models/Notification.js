const { DataTypes } = require('sequelize');
const { db } = require('../db');
const User = require('./User');
const { getSockets } = require('../../../socketUtils');

const NotificationList = db.define('notification list');

const Notification = db.define('notification', {
  text: DataTypes.TEXT,
  // amount: {
  //   type: DataTypes.DECIMAL(10, 2),
  //   allowNull: false,
  //   defaultValue: 0,
  // },
  // category: {
  //   type: DataTypes.ENUM([
  //     'Electronics',
  //     'Clothing',
  //     'Entertainment',
  //     'Toys',
  //     'Miscellaneous',
  //     'Food',
  //   ]),
  //   defaultValue: 'Miscellaneous',
  // },
  // isCash: {
  //   type: DataTypes.BOOLEAN,
  //   defaultValue: false,
  // },
});

Notification.addHook('afterCreate', async (notification) => {
  notification = await Notification.findByPk(notification.id, {
    // include: [
    //   {model: User, as: 'to'},
    //   {model:User, as: 'from'},
    // ]
  });
  getSockets().forEach((socket) =>
    socket.send(JSON.stringify({ type: 'SEND_NOTIFICATION', notification }))
  );
});

module.exports = { Notification, NotificationList };
