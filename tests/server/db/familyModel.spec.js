/* eslint no-undef: 'off' */
/* eslint no-console: 'off' */

const {
  models: { Family },
} = require('../../../server/db/models/Associations');
const { db, initDB } = require('../../../server/db/db');

let family;

beforeAll(async () => {
  await initDB();

  family = await Family.create({
    name: 'Litovskaya',
    familySecret: 'Coke>Pepsi',
  });
});

afterAll(() => {
  db.close();
});

it('Family model exists', (done) => {
  expect(family.familySecret).toEqual('Coke>Pepsi');
  done();
});
