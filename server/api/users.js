const { Router, json } = require('express');
const router = Router();
const {
  models: { User, WishList },
} = require('../db/models/associations');

router.use(json());

router.get('/', async (req, res, next) => {
  try {
    res.send(await User.findAll());
  } catch (err) {
    next.err;
  }
});

//create new user with wishlist
router.post('/', async (req, res, next) => {
  try {
    const { userName, email, password, firstName, lastName, status, isAdmin } =
      req.body;
    User.WishList = User.hasOne(WishList);
    const newUser = await User.create(
      {
        userName,
        email,
        password,
        firstName,
        lastName,
        status,
        isAdmin,
        wishlist: [],
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
    const userToDelete = User.findByPk();
    (await userToDelete).destroy();
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
});

//update user
router.put('/:id', async (req, res, next) => {
  try {
    const userToUpdate = await User.findByPk(req.params.id);
    const { userName, email, password, firstName, lastName, status, isAdmin } =
      req.body;
    await userToUpdate.update({
      userName,
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
