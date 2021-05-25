const { db } = require('../db');
const { DataTypes } = require('sequelize');

const Family = db.define('family', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  familySecret: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [5, 70],
    },
  },
});

module.exports = Family;
