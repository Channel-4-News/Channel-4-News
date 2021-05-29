const { db } = require('../db');
const User = require('./User');
const Family = require('./Family');
const Allowance = require('./Allowance');
const { Chore, ChoreList } = require('./Chore');
const { Transaction, TransactionHistory } = require('./Transaction');
const { WishListItem, WishList } = require('./WishListItem');
const { Notification, NotificationList } = require('./Notification');

//associations
User.belongsTo(Family);
Family.hasMany(User);

User.hasOne(WishList);
WishList.belongsTo(User);
WishListItem.belongsTo(WishList);
WishList.hasMany(WishListItem);

User.hasOne(NotificationList);
NotificationList.belongsTo(User);
Notification.belongsTo(NotificationList);
NotificationList.hasMany(Notification);

Allowance.belongsTo(User);
User.hasOne(Allowance);

// ChoreList.hasMany(Chore);
Chore.belongsTo(ChoreList);
// ChoreList.belongsTo(Family);
Family.hasOne(ChoreList);
Chore.belongsTo(User);
User.hasMany(Chore);
Chore.belongsTo(Family);
Family.hasMany(Chore);

// Transaction.belongsTo(User);
// User.hasMany(Transaction);
Transaction.belongsTo(TransactionHistory);
TransactionHistory.hasMany(Transaction);
TransactionHistory.belongsTo(User);

//export models and db
module.exports = {
  db,
  models: {
    Transaction,
    TransactionHistory,
    ChoreList,
    Chore,
    Family,
    User,
    Allowance,
    WishList,
    WishListItem,
    NotificationList,
    Notification,
  },
};
