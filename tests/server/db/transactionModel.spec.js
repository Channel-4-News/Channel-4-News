/* eslint no-undef: 'off' */
/* eslint no-console: 'off' */

const {
  models: { Transaction },
} = require('../../../server/db/models/Associations');
const { db, initDB } = require('../../../server/db/db');

let transaction;

beforeAll(async () => {
  await initDB();

  transaction = await Transaction.create({
    amount: 29.99,
    category: 'Entertainment',
  });
});

afterAll(() => {
  db.close();
});

it('Transaction model exists', (done) => {
  expect(transaction.amount).toEqual('29.99');
  done();
});
