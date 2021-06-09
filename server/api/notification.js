const { Router } = require('express');
const router = Router();

const {
  models: { Notification, NotificationList },
} = require('../db/models/associations');
const User = require('../db/models/User');

// Get all notifications in notification list
router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const notificationList = await NotificationList.findByPk(id, {
      include: {
        model: Notification,
      },
    });
    res.send(notificationList.notifications);
  } catch (err) {
    next(err);
  }
});

router.get('/', async (req, res, next) => {
  try {
    const user = await User.byToken(req.headers.authorization);
    res.send(await user.getNotifications());
  } catch (err) {
    next(err);
  }
});

//Add a notification to notafication list
router.post('/:id', async (req, res, next) => {
  try {
    const { amount, category, isCash } = req.body;
    const { id } = req.params;
    const newNotification = await Notification.create({
      amount,
      category,
      isCash,
      notificationListId: id,
    });
    res.status(201).send(newNotification);
  } catch (err) {
    next(err);
  }
});
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
