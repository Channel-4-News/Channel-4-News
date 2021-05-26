const { Router, json } = require('express');
const router = Router();
const {
  models: { User, Family },
} = require('../db/models/associations');

//auth post for user
router.post('/user', async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const token = await User.authenticate({ username, password });
    res.send({ token });
  } catch (err) {
    next(err);
  }
});

//auth post for family
router.post('/family', async (req, res, next) => {
  try {
    const { name, familySecret } = req.body;
    const token = await Family.authenticate({ name, familySecret });
    res.send({ token });
  } catch (err) {
    next(err);
  }
});

//auth get for user
router.get('/user', async (req, res, next) => {
  try {
    const user = await User.byToken(req.headers.authorization);
    res.send(user);
  } catch (err) {
    next(err);
  }
});

//auth get for family
router.get('/family', async (req, res, next) => {
  try {
    const family = await Family.byToken(req.headers.authorization);
    res.send(family);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
