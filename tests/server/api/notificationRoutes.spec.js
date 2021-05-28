/* eslint no-undef: 'off' */

const supertest = require('supertest');
const { app } = require('../../../server/app');

const request = supertest(app);
const {
  db,
  models: { NotificationList, Notification },
} = require('../../../server/db/models/associations');

describe('Notification Routes', () => {
  const notifications = [
    {
      amount: 29.99,
      category: 'Electronics',
      isCash: false,
      notificationListId: 1,
    },
    {
      amount: 5.0,
      category: 'Food',
      isCash: false,
      notificationListId: 1,
    },
  ];
  beforeAll(async () => {
    await db.sync({ force: true });
    await NotificationList.create();
    await Notification.bulkCreate(notifications);
  });
  afterAll(async () => {
    await db.close();
  });

  test('GET /api/notification/:id returns all notifications', async (done) => {
    const response = await request.get('/api/notification/1');
    expect(response.body.length).toBe(2);
    done();
  });

  test('POST /api/notification/:id adds an notification to list', async (done) => {
    const newNotification = {
      amount: 5.0,
      category: 'Food',
      isCash: false,
      notificationListId: 1,
    };
    let response = (
      await request.post('/api/notification/1').send(newNotification)
    ).body;
    expect(response.category).toBe(newNotification.category);
    done();
  });
});
