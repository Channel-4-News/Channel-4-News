/* eslint no-undef: 'off' */

const supertest = require('supertest');
const { app } = require('../../../server/app');

const request = supertest(app);
const {
  db,
  models: { User },
} = require('../../../server/db/models/associations');

describe('User Routes', () => {
  const users = [
    {
      username: 'billyW',
      password: 'password123',
      email: 'billyw@gmail.com',
    },
    {
      username: 'susancaddy',
      password: 'password123',
      email: 'susiecad@gmail.com',
    },
    {
      username: 'bugsbunny',
      password: 'password123',
      email: 'carrotsw@gmail.com',
    },
  ];
  beforeAll(async () => {
    await db.sync({ force: true });
    await User.bulkCreate(users);
  });
  afterAll(async () => {
    await db.close();
  });

  test('GET /api/users returns all users', async (done) => {
    const response = await request.get('/api/users');
    expect(response.body.length).toBe(3);
    done();
  });

  test('POST /api/users creates new user and wishlist', async (done) => {
    const newUser = {
      username: 'michelleO',
      email: 'mobama@gmail.com',
      password: 'password123',
    };
    let response = (await request.post('/api/users').send(newUser)).body;
    expect(response.username).toBe(newUser.username);
    done();
  });

  test('PUT /api/users/:id updates a user', async (done) => {
    const response = (
      await request
        .put('/api/users/1')
        .send({ email: 'actuallythis@gmail.com' })
    ).body;
    expect(response.email).toBe('actuallythis@gmail.com');
    done();
  });

  test('DELETE /api/users/:id deletes user', async (done) => {
    const response = await request.delete('/api/users/1');
    expect(response.status).toEqual(204);
    done();
  });
});
