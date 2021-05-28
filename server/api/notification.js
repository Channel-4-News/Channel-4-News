const { Router, json } = require('express');
const router = Router();

const {
  models: { Notification, NotificationList },
} = require('../db/models/associations');

router.use(json());

//Get all notifications in notification list
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

module.exports = router;
