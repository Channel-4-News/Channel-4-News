const db = require('../db');
const { DataTypes } = require('sequelize');

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
});
