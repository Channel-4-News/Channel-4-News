const { db } = require('../db');
const { DataTypes } = require('sequelize');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();

const validator = require('email-validator');
const socketUtils = require('../../../socketUtils');

const { NotificationList } = require('./Notification');
const { WishList } = require('./WishListItem');
const Allowance = require('./Allowance');
const { Chore } = require('./Chore');

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
    validate: {
      notEmpty: true,
    },
  },
  lastName: {
    type: DataTypes.STRING,
    validate: {
      notEmpty: true,
    },
  },
  status: {
    type: DataTypes.ENUM(['Parent', 'Child', 'Anonymous']),
    defaultValue: 'Anonymous',
  },
  isAdmin: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  balance: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0,
  },
  imgUrl: {
    type: DataTypes.TEXT,
    allowNull: false,
    defaultValue: 'public/images/avatars/blueAvatar.png',
    validate: {
      notEmpty: true,
    },
  },
  stripeAccount: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  cardHolderId: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  virtualCard: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  cardColor: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  cardImage: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  googleId: {
    type: DataTypes.STRING,
  },
  allowance: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  daysToAllowance: {
    type: DataTypes.INTEGER,
  },
  allowanceInterval: {
    type: DataTypes.STRING,
  },
  hasBankAccount: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
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
//Adds an Allowance to the user
// User.addHook('afterCreate', async (user) => {
//   const notificationList = await NotificationList.create();
//   notificationList.userId = notificationList.id;
//   await notificationList.save();
//   const wishList = await WishList.create();
//   wishList.userId = wishList.id;
//   await wishList.save();
//   const allowance = await Allowance.create();
//   allowance.userId = user.id;
//   await allowance.save();
// });

User.prototype.getNotifications = function () {
  return db.models.notification.findAll({
    where: {
      [db.Sequelize.Op.or]: [{ toId: this.id }],
    },
    include: [Chore, { model: User, as: 'from' }, { model: User, as: 'to' }],
    order: [['createdAt', 'DESC']],
  });
};

// User.addHook('afterUpdate', async (notification) => {
//   const socket = socketUtils
//     .getSockets()
//     .find((socket) => notification.id === socket.userId);
//   if (socket) {
//     notification = await User.findByPk(notification.id);
//     socket.send(JSON.stringify({ type: 'UPDATE_ALLOWANCE', notification }));
//   }
//   const parentsocket = socketUtils
//     .getSockets()
//     .find((socket) => socket.userId === 8);
//   if (parentsocket) {
//     notification = await User.findByPk(notification.id);
//     parentsocket.send(
//       JSON.stringify({ type: 'UPDATE_ALLOWANCE', notification })
//     );
//   }
// });

User.addHook('afterUpdate', async (notification) => {
  const socket = socketUtils.getSockets().filter((socket) => {
    if (notification.id === socket.userId) return socket;
    if (socket.userId === 8) return socket;
  });
  if (socket) {
    notification = await User.findByPk(notification.id);
    socket.forEach((socket) => {
      socket.send(JSON.stringify({ type: 'UPDATE_ALLOWANCE', notification }));
    });
  }
});

module.exports = User;
