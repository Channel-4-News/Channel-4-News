/* eslint no-undef: 'off' */

const supertest = require('supertest');
const { app } = require('../../../server/app');

const request = supertest(app);
const {
  db,
  models: { Notification },
} = require('../../../server/db/models/associations');
const User = require('../../../server/db/models/User');

describe('Notification Routes', () => {
  const notifications = [
    {
      amount: 29.99,
      category: 'Electronics',
      isCash: false,
    },
    {
      amount: 5.0,
      category: 'Food',
      isCash: false,
    },
  ];
  const newUser = {
    username: 'michelleO',
    email: 'mobama@gmail.com',
    password: 'password123',
  };
  beforeAll(async () => {
    await db.sync({ force: true });
    await Notification.bulkCreate(notifications);
    let userToken = (await request.post('/api/users').send(newUser)).body;
    console.log(userToken);
  });
  afterAll(async () => {
    await db.close();
  });

  test('GET /api/notification returns all notifications', async (done) => {
    const response = await request.get('/api/notification', {
      headers: {
        authorization: window.localStorage.getItem('userToken'),
      },
    });
    // expect(response.body.length).toBe(0);
    done();
  });

  xtest('POST /api/notification/:id adds an notification to list', async (done) => {
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
