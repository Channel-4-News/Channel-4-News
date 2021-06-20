const { DataTypes } = require('sequelize');

const { db } = require('../db');

const WishList = db.define('wishList');

const WishListItem = db.define('wishListItems', {
  itemName: {
    type: DataTypes.STRING(1000),
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  imgUrl: {
    type: DataTypes.TEXT,
    allowNull: false,
    defaultValue:
      'https://cdn2.iconfinder.com/data/icons/eins-e-commerce-filled/64/wishlist_favourite_love_shopping_item-512.png',
  },
  cost: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    defaultValue: 0,
  },
  linkUrl: {
    type: DataTypes.TEXT,
    allowNull: false,
    defaultValue: '#',
  },
  category: {
    type: DataTypes.ENUM([
      'Electronics',
      'Clothing',
      'Entertainment',
      'Toys',
      'Food',
      'Miscellaneous',
    ]),
    defaultValue: 'Miscellaneous',
  },
  purchased: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

WishListItem.addHook('beforeCreate', async (wishListItem) => {
  if (wishListItem.imgUrl === '') {
    wishListItem.imgUrl =
      'https://cdn2.iconfinder.com/data/icons/eins-e-commerce-filled/64/wishlist_favourite_love_shopping_item-512.png';
  }
  if (wishListItem.purchased === null || wishListItem.purchased === undefined) {
    wishListItem.purchased = false;
  }
});

module.exports = { WishListItem, WishList };
