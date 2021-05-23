const db = require('../db');
const User = require('./User');
const Family = require('./Family');
const Allowance = require('./Allowance');
const { Chore, ChoreList } = require('./Chore');
const { Transaction, TransactionHistory } = require('./Transaction');
const { WishListItems, WishList } = require('./WishListItems');

//associations
User.belongsTo(Family);
Family.hasMany(User);

User.hasOne(WishList);
WishList.belongsTo(User);
WishListItems.belongsTo(WishList);
WishList.hasMany(WishListItems);

Allowance.belongsTo(User);
User.hasOne(Allowance);

ChoreList.hasMany(Chore);
Chore.belongsTo(ChoreList);
ChoreList.belongsTo(Family);
Family.hasOne(ChoreList);
Chore.belongsTo(User);
User.hasMany(Chore);

// Transaction.belongsTo(User);
// User.hasMany(Transaction);
Transaction.belongsTo(TransactionHistory);
TransactionHistory.hasMany(Transaction);
TransactionHistory.belongsTo(User);

//export models
module.exports = {
  models: {
    Transaction,
    TransactionHistory,
    ChoreList,
    Chore,
    Family,
    User,
    Allowance,
    WishList,
    WishListItems,
  },
};
