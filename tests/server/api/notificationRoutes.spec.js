/* eslint no-undef: 'off' */

const supertest = require('supertest');
const { app } = require('../../../server/app');
const User = require('../../../server/db/models/User');
const { Notification } = require('../../../server/db/models/Notification');

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
    username: 'michelleO',
    email: 'mobama@gmail.com',
    password: 'password123',
    status: 'Parent',
  };
  beforeAll(async (done) => {
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

  test('GET /api/notification with token', async () => {
    const response = await request
      .get('/api/notification')
      .set('Authorization', token);
    expect(response.body.length).toBe(2);
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
    const response = await request.delete('/api/notification/2');
    expect(response.status).toBe(204);
    done();
  });
});

// test('get notifications with token', () => {
//   console.log(token);
//   return request.get('/api/notification').set('Authorization', `Bearer ${token}`).then((response) => {
//     expect(response.statusCode).toBe(200);
//     expect(response.type).toBe('application/json');
//   });
// });

// const {
//   db,
//   models: { Notification, User },
// } = require('../../../server/db/models/associations');

// let userToken;

// describe('Notification Routes', () => {
//   const notifications = [
//     {
//       amount: 29.99,
//       category: 'Electronics',
//       isCash: false,
//       toId: 1,
//     },
//     {
//       amount: 5.0,
//       category: 'Food',
//       isCash: false,
//       toId: 1,
//     },
//   ];
//   const newUser = {
//     username: 'michelleO',
//     email: 'mobama@gmail.com',
//     password: 'password123',
//     status: 'Parent',
//   };
//   beforeAll(async (done) => {
//     await db.sync({ force: true });
//     // await User.authenticate(create(newUser));
//     // await Notification.bulkCreate(notifications);
//     userToken = await request.post('/api/auth/user').send({
//       username: 'michelleO',
//       email: 'mobama@gmail.com',
//       password: 'password123',
//       status: 'Parent',
//     }).body;
//   });
//   afterAll(async () => {
//     await db.close();
//   });

//   test('GET /api/notification returns all notifications', async (done) => {
//     const response = await request.get('/api/notification');
//     console.log(userToken);
//     expect(response.statusCode).toBe(500);
//   });

// });
