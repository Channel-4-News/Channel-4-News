const { db } = require('../db');
const { DataTypes } = require('sequelize');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();

const Family = db.define('family', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
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

//authenticates family
Family.authenticate = async (creds) => {
  try {
    const { name, familySecret } = creds;
    const family = await Family.findOne({
      where: {
        name,
      },
    });
    if (family && (await bcrypt.compare(familySecret, family.familySecret))) {
      return jwt.sign({ id: family.id }, process.env.JWT);
    }
  } catch (err) {
    const error = Error('bad credentials');
    error.status = 401;
    throw error;
  }
};

Family.byToken = async (token) => {
  try {
    const { id } = await jwt.verify(token, process.env.JWT);

    //get the family id and return family
    const family = await Family.findByPk(id);
    if (family) return family;
  } catch (err) {
    const error = Error('bad credentials');
    error.status = 401;
    throw error;
  }
};

//hashes secret
Family.addHook('beforeSave', async (family) => {
  if (family.changed('familySecret')) {
    family.familySecret = await bcrypt.hash(family.familySecret, 7);
  }
});

module.exports = Family;
