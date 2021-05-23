const { DataTypes } = require('sequelize');
const db = require('../db');

const WishListItems = db.define('wishListItems', {
  itemName: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  imgUrl: {
    type: DataTypes.TEXT,
    allowNull: false,
    defaultValue: 'default-img.jpg',
    validate: {
      notEmpty: true,
    },
  },
  cost: {
    type: DataTypes.FLOAT,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  linkUrl: {
    type: DataTypes.TEXT,
    allowNull: false,
    defaultValue: '#',
    validate: {
      notEmpty: true,
    },
  },
  categories: {
    type: DataTypes.ENUM([
      'Electronics, Clothing, Entertainment, Toys, Food, Miscellaneous',
    ]),
    defaultValue: 'Miscellaneous',
  },
});

module.exports = WishListItems;
