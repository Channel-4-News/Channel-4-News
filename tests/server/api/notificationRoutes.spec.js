/* eslint no-undef: 'off' */

const supertest = require('supertest');
const { app } = require('../../../server/app');
const {
  db,
  models: { User, Notification },
} = require('../../../server/db/models/associations');

const request = supertest(app);

let token;

describe('GET /', () => {
  const notifications = [
    {
      amount: 29.99,
      category: 'Electronics',
      isCash: false,
      toId: 1,
    },
    {
      amount: 5.0,
      category: 'Food',
      isCash: false,
      toId: 1,
    },
  ];

  const newUser = {
    username: 'michelleO1',
    email: 'mobama@gmail.com',
    password: 'password123',
    status: 'Parent',
  };
  beforeAll(async (done) => {
    await db.sync({ force: true });
    await User.create(newUser);
    request
      .post('/api/auth/user')
      .send({ username: newUser.username, password: newUser.password })
      .end((err, response) => {
        token = response.body.token;
        done();
      });
    await Notification.bulkCreate(notifications);
  });

  afterAll(async () => {
    await db.close();
  });

  test('GET /api/notification with token', async (done) => {
    const response = await request
      .get('/api/notification')
      .set('Authorization', token);
    expect(response.body.length).toBe(2);
    done();
  });
  test('POST /api/notification/create adds a notification with token', async (done) => {
    const newNotification = {
      amount: 5.0,
      category: 'Food',
      isCash: false,
      toId: 1,
    };
    let response = (
      await request
        .post('/api/notification/create')
        .set('Authorization', token)
        .send(newNotification)
    ).body;
    expect(response.category).toBe(newNotification.category);
    done();
  });
  test('DELETE notification /api/notification/:id', async (done) => {
    const response = await request.delete('/api/notification/1');
    expect(response.status).toBe(204);
    done();
  });
});
