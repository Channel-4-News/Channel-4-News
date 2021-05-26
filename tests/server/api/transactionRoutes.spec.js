/* eslint no-undef: 'off' */

const supertest = require('supertest');
const { app } = require('../../../server/app');

const request = supertest(app);
const {
  db,
  models: { Transaction, TransactionHistory },
} = require('../../../server/db/models/associations');

describe('Transaction Routes', () => {
  const transactions = [
    {
      amount: 29.99,
      category: 'Electronics',
      transactionHistoryId: 1,
    },
    {
      amount: 5.0,
      category: 'Food',
      transactionHistoryId: 1,
    },
  ];
  beforeAll(async () => {
    await db.sync({ force: true });
    await TransactionHistory.create();
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
      amount: 5.0,
      category: 'Food',
      transactionHistoryId: 1,
    };
    let response = (await request.post('/api/transaction/1').send(newItem))
      .body;
    expect(response.category).toBe(newItem.category);
    done();
  });
});
