/* eslint no-undef: 'off' */
/* eslint no-console: 'off' */

const {
  models: { Chore },
} = require('../../../server/db/models/associations');
const { db, initDB } = require('../../../server/db/db');

let chore;

beforeAll(async () => {
  await initDB();

  chore = await Chore.create({
    name: 'Sweeping',
    description: 'Get the living room and make sure to sweep under the couch',
    isComplete: false,
    amount: 2.0,
    due: '1991-01-22',
    isRecurring: false,
  });
});

afterAll(() => {
  db.close();
});

it('Chore model exists', (done) => {
  expect(chore.due).toEqual('1991-01-22');
  done();
});
