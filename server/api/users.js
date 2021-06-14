const { Router } = require('express');
const Allowance = require('../db/models/Allowance');
const router = Router();
const {
  models: { User },
} = require('../db/models/associations');
const Family = require('../db/models/Family');
const { Transaction } = require('../db/models/Transaction');
const { route } = require('./families');

//get all users
router.get('/', async (req, res, next) => {
  try {
    res.send(await User.findAll());
  } catch (err) {
    next.err;
  }
});

//get single user by id
router.get('/:id', async (req, res, next) => {
  try {
    res.send(
      await User.findByPk(req.params.id, {
        include: [
          { model: Transaction },
          { model: Allowance },
          { model: Family, include: [User] },
        ],
      })
    );
  } catch (err) {
    next(err);
  }
});

//create new user
router.post('/', async (req, res, next) => {
  try {
    const {
      username,
      email,
      password,
      firstName,
      lastName,
      status,
      isAdmin,
      stripeAccount,
    } = req.body;
    const newUser = await User.create({
      username,
      email,
      password,
      firstName,
      lastName,
      status,
      isAdmin,
      stripeAccount,
    });
    res.status(201).send(newUser);
  } catch (err) {
    next(err);
  }
});

//delete user
router.delete('/:id', async (req, res, next) => {
  try {
    const userToDelete = await User.findByPk(req.params.id);
    await userToDelete.destroy();
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
});

// //upload image file
// router.put('/image/:id', async (req, res, next) => {
//   console.log(req.file);
//   try {
//     res.send({ file: req.file });
//   } catch (err) {
//     next(err);
//   }
// });

//update user
router.put('/:id', async (req, res, next) => {
  try {
    const userToUpdate = await User.findByPk(req.params.id);
    const {
      username,
      email,
      password,
      firstName,
      lastName,
      imgUrl,
      status,
      isAdmin,
      familyId,
      stripeAccount,
      cardHolderId,
      virtualCard,
      cardColor,
      cardImage,
    } = req.body;

    await userToUpdate.update({
      username,
      email,
      password,
      firstName,
      lastName,
      imgUrl,
      status,
      isAdmin,
      familyId,
      stripeAccount,
      cardHolderId,
      virtualCard,
      cardColor,
      cardImage,
    });
    res.status(200).send(userToUpdate);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
