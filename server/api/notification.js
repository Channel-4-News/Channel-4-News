const { Router } = require('express');
const router = Router();

const {
  models: { Notification, NotificationList },
} = require('../db/models/associations');
const User = require('../db/models/User');

//Get all notifications based on user token

router.get('/', async (req, res, next) => {
  try {
    const user = await User.byToken(req.headers.authorization);
    res.send(await user.getNotifications());
  } catch (err) {
    next(err);
  }
});

//Add a notification to Specific user
router.post('/create', async (req, res, next) => {
  try {
    const user = await User.byToken(req.headers.authorization);
    const notification = await Notification.create({
      fromId: user.id,
      ...req.body,
    });

    res.status(201).send(
      await Notification.findByPk(notification.id, {
        include: [
          { model: User, as: 'to' },
          { model: User, as: 'from' },
        ],
      })
    );
  } catch (err) {
    next(err);
  }
});

module.exports = router;
