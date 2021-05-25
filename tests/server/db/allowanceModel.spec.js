/* eslint no-undef: 'off' */
/* eslint no-console: 'off' */

const {
  models: { Allowance },
} = require('../../../server/db/models/Associations');
const { db, initDB } = require('../../../server/db/db');

let allowance;

beforeAll(async () => {
  await initDB();

  allowance = await Allowance.create({
    amount: 5.0,
    interval: 1000 * 60 * 60 * 24 * 7,
  });
});

afterAll(() => {
  db.close();
});

it('User model exists', (done) => {
  expect(allowance.amount).toEqual('5.00');
  done();
});
