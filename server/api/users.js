const { Router, json } = require('express');
const router = Router();
const {
  models: { User, WishList },
} = require('../db/models/associations');

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
    res.send(await User.findByPk(req.params.id));
  } catch (err) {
    next(err);
  }
});

//create new user with wishlist
router.post('/', async (req, res, next) => {
  try {
    const { username, email, password, firstName, lastName, status, isAdmin } =
      req.body;
    User.WishList = User.hasOne(WishList);
    const newUser = await User.create(
      {
        username,
        email,
        password,
        firstName,
        lastName,
        status,
        isAdmin,
        wishList: {},
      },
      {
        include: [
          {
            association: User.WishList,
          },
        ],
      }
    );
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
    const userToUpdate = await User.findByPk(req.params.id);
    const { username, email, password, firstName, lastName, status, isAdmin } =
      req.body;
    await userToUpdate.update({
      username,
      email,
      password,
      firstName,
      lastName,
      status,
      isAdmin,
    });
    res.status(200).send(userToUpdate);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
