const { db } = require('../db');
const { DataTypes } = require('sequelize');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();

const validator = require('email-validator');

const { NotificationList } = require('./Notification');
const { WishList } = require('./WishListItem');

const User = db.define('user', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true,
      len: [5, 40],
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [5, 50],
      hasNumber(value) {
        const nums = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
        return nums.some((num) => value.includes(num));
      },
    },
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true,
      isEmail: true,
    },
  },
  firstName: {
    type: DataTypes.STRING,
  },
  lastName: {
    type: DataTypes.STRING,
  },
  status: {
    type: DataTypes.ENUM(['Parent', 'Child']),
    defaultValue: 'Child',
  },
  isAdmin: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  balance: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0,
  },
});

//authenticates user
User.authenticate = async (creds) => {
  try {
    let user;
    const { username, password } = creds;

    //check if user logs in with email or username
    if (validator.validate(username)) {
      user = await User.findOne({
        where: {
          email: username,
        },
      });
    } else {
      user = await User.findOne({
        where: {
          username,
        },
      });
    }

    if (user && (await bcrypt.compare(password, user.password))) {
      return jwt.sign({ id: user.id }, process.env.JWT);
    }
  } catch (err) {
    const error = Error('bad credentials');
    error.status = 401;
    throw error;
  }
};

User.byToken = async (token) => {
  try {
    const { id } = await jwt.verify(token, process.env.JWT);
    //get the user id and return user
    const user = await User.findByPk(id);
    if (user) return user;
  } catch (err) {
    const error = Error('bad credentials');
    error.status = 401;
    throw error;
  }
};

//hashes password
User.addHook('beforeSave', async (user) => {
  if (user.changed('password')) {
    user.password = await bcrypt.hash(user.password, 7);
  }
});

//Adds a Notification List to the user
//Adds a Wish List to the user
User.addHook('afterCreate', async () => {
  const notificationList = await NotificationList.create();
  notificationList.userId = notificationList.id;
  await notificationList.save();
  const wishList = await WishList.create();
  wishList.userId = wishList.id;
  await wishList.save();
});

module.exports = User;
