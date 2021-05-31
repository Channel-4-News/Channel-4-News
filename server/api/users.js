const { Router, json } = require('express');
const Allowance = require('../db/models/Allowance');
const router = Router();
const {
  models: { User },
} = require('../db/models/associations');
const Family = require('../db/models/Family');
const { Transaction } = require('../db/models/Transaction');

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
    const { username, email, password, firstName, lastName, status, isAdmin } =
      req.body;
    const newUser = await User.create({
      username,
      email,
      password,
      firstName,
      lastName,
      status,
      isAdmin,
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

//update user
router.put('/:id', async (req, res, next) => {
  try {
    console.log(req.body);
    const userToUpdate = await User.findByPk(req.params.id);
    const {
      username,
      email,
      password,
      firstName,
      lastName,
      status,
      isAdmin,
      familyId,
    } = req.body;
    await userToUpdate.update({
      username,
      email,
      password,
      firstName,
      lastName,
      status,
      isAdmin,
      familyId,
    });
    res.status(200).send(userToUpdate);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
