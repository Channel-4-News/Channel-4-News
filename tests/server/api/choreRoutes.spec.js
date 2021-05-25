/* eslint no-undef: 'off' */

const supertest = require('supertest');
const { app } = require('../../../server/app');

const request = supertest(app);
const {
  db,
  models: { Chore },
} = require('../../../server/db/models/associations');

describe('Chore Routes', () => {
  const chores = [
    {
      name: 'fold laundry',
      description: 'fold laundry after dry cycle finishes',
      amount: 5.0,
      due: '2021-05-11',
    },
    {
      name: 'walk dog',
      description: 'walk dog when you get home from school',
      amount: 3.0,
      due: '2021-07-10',
    },
  ];
  beforeAll(async () => {
    await db.sync({ force: true });
    await Chore.bulkCreate(chores);
  });
  afterAll(async () => {
    await db.close();
  });

  test('GET /api/chores returns all chores', async (done) => {
    const response = await request.get('/api/chores');
    expect(response.body.length).toBe(2);
    done();
  });

  test('POST /api/chores creates chore', async (done) => {
    const newChore = {
      name: 'make bed',
      description: 'make bed before you leave to school',
      amount: 1.0,
    };
    let response = (await request.post('/api/chores').send(newChore)).body;
    expect(response.amount * 1).toBe(newChore.amount);
    done();
  });

  test('PUT /api/chores/:id updates a chore', async (done) => {
    const response = (await request.put('/api/chores/1').send({ amount: 4.0 }))
      .body;
    expect(response.amount).toBe(4.0);
    done();
  });

  test('DELETE /api/chores/:id deletes chore', async (done) => {
    const response = await request.delete('/api/chores/1');
    expect(response.status).toEqual(204);
    done();
  });
});
