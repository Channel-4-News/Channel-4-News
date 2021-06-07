/* eslint no-undef: 'off' */
/* eslint no-console: 'off' */

const {
  models: { Notification },
} = require('../../../server/db/models/associations');
const { db, initDB } = require('../../../server/db/db');

let notification;

beforeAll(async () => {
  await initDB();

  notification = await Notification.create({
    amount: 29.99,
    category: 'Entertainment',
    isCash: false,
  });
});

afterAll(() => {
  db.close();
});

it('Notification model exists', (done) => {
  expect(notification.amount).toEqual('29.99');
  done();
});
