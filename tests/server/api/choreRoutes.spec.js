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
      reward: '$5',
      due: '2021-05-11 10:45:20',
    },
    {
      name: 'walk dog',
      description: 'walk dog when you get home from school',
      reward: '$3',
      due: '2021-07-10 12:00:00',
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
      reward: '$1',
    };
    let response = (await request.post('/api/chores').send(newChore)).body;
    expect(response.reward).toBe(newChore.reward);
    done();
  });

  test('PUT /api/chores/:id updates a chore', async (done) => {
    const response = (await request.put('/api/chores/1').send({ reward: '$4' }))
      .body;
    expect(response.reward).toBe('$4');
    done();
  });

  test('DELETE /api/chores/:id deletes chore', async (done) => {
    const response = await request.delete('/api/chores/1');
    expect(response.status).toEqual(204);
    done();
  });
});
