const { Router, json } = require('express');
const router = Router();
const {
  models: { User },
} = require('../db/models/associations');

router.post('/', async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const token = await User.authenticate({ username, password });
    res.send({ token });
  } catch (err) {
    next(err);
  }
});

router.get('/', async (req, res, next) => {
  try {
    const user = await User.byToken(req.headers.authorization);
    res.send(user);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
