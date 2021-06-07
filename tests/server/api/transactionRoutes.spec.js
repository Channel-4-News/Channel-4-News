/* eslint no-undef: 'off' */

const supertest = require('supertest');
const { app } = require('../../../server/app');

const request = supertest(app);
const {
  db,
  models: { Transaction, User },
} = require('../../../server/db/models/associations');

describe('Transaction Routes', () => {
  const transactions = [
    {
      cost: 29.99,
      category: 'Electronics',
      userId: 1,
    },
    {
      cost: 5.0,
      category: 'Food',
      userId: 1,
    },
  ];
  beforeAll(async () => {
    await db.sync({ force: true });
    await User.create({
      username: 'littlejoe',
      email: 'joe@test.com',
      password: 'password123',
      firstName: 'Joe',
      lastName: 'Kid',
    });
    await Transaction.bulkCreate(transactions);
  });
  afterAll(async () => {
    await db.close();
  });

  test('GET /api/transaction/:id returns all items', async (done) => {
    const response = await request.get('/api/transaction/1');
    expect(response.body.length).toBe(2);
    done();
  });

  test('POST /api/transaction/:id adds an item to history', async (done) => {
    const newItem = {
      cost: 5.0,
      category: 'Food',
      userId: 1,
    };
    let response = (await request.post('/api/transaction/1').send(newItem))
      .body;
    expect(response.category).toBe(newItem.category);
    done();
  });
});
