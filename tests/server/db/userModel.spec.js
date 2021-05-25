/* eslint no-undef: 'off' */
/* eslint no-console: 'off' */

const {
  models: { User },
} = require('../../../server/db/models/Associations');
const { db, initDB } = require('../../../server/db/db');

let user;

beforeAll(async () => {
  await initDB();

  user = await User.create({
    username: 'JDoe02',
    password: 'bcrypt02',
    email: 'blabla@yahoo.com',
    firstName: 'John',
    lastName: 'Doe',
    status: 'Parent',
    isAdmin: false,
  });
});

afterAll(() => {
  db.close();
});

it('User model exists', (done) => {
  expect(user.email).toEqual('blabla@yahoo.com');
  done();
});

it('User email is valid email', async (done) => {
  try {
    const newUser = await User.create({
      username: 'JDoe02',
      password: 'bcrypt02',
      email: 'blablayahoo.com',
      firstName: 'John',
      lastName: 'Doe',
      status: 'Parent',
      isAdmin: false,
    });

    newUser.validate();
  } catch (error) {
    expect(error.message).toBe(
      'Validation error: Validation isEmail on email failed'
    );
  }
  done();
});
