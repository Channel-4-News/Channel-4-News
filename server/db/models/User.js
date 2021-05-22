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
});
