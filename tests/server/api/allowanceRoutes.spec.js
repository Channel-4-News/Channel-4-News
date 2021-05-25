/* eslint no-undef: 'off' */

const supertest = require('supertest');
const { app } = require('../../../server/app');

const request = supertest(app);
const {
  db,
  models: { Allowance },
} = require('../../../server/db/models/associations');

describe('Allowance Routes', () => {
  const allowances = [
    {
      amount: 5.0,
      interval: 3,
    },
    {
      amount: 20.0,
      interval: 1,
    },
    {
      amount: 8.0,
      interval: 7,
    },
  ];
  beforeAll(async () => {
    await db.sync({ force: true });
    await Allowance.bulkCreate(allowances);
  });
  afterAll(async () => {
    await db.close();
  });

  test('GET /api/allowance returns all allowances', async (done) => {
    const response = await request.get('/api/allowance');
    expect(response.body.length).toBe(3);
    done();
  });

  test('POST /api/allowance creates allowance', async (done) => {
    const newAllowance = {
      amount: 10.0,
      interval: 14,
    };
    let response = (await request.post('/api/allowance').send(newAllowance))
      .body;
    expect(response.amount * 1).toBe(newAllowance.amount);
    done();
  });

  test('PUT /api/allowance/:id updates allowance', async (done) => {
    const response = (
      await request.put('/api/allowance/1').send({ interval: 5 })
    ).body;
    expect(response.interval).toBe(5);
    done();
  });

  test('DELETE /api/allowance/:id deletes allowance', async (done) => {
    const response = await request.delete('/api/allowance/1');
    expect(response.status).toEqual(204);
    done();
  });
});
