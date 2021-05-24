/* eslint no-undef: 'off' */

const supertest = require('supertest');
const { app } = require('../../../server/app');

const request = supertest(app);
const {
  db,
  models: { Family },
} = require('../../../server/db/models/associations');

describe('Family Routes', () => {
  const families = [
    {
      name: 'Smiths',
      familySecret: 'password123',
    },
    {
      name: 'Browns',
      familySecret: 'password123',
    },
    {
      name: 'Goldbergs',
      familySecret: 'password123',
    },
    {
      name: 'Johansons',
      familySecret: 'password123',
    },
  ];
  beforeAll(async () => {
    await db.sync({ force: true });
    await Family.bulkCreate(families);
  });
  afterAll(async () => {
    await db.close();
  });

  test('GET /api/families returns all families', async (done) => {
    const response = await request.get('/api/families');
    expect(response.body.length).toBe(4);
    done();
  });

  test('POST /api/families creates family', async (done) => {
    const newFamily = {
      name: 'Rodriguez',
      familySecret: 'password123',
    };
    let response = (await request.post('/api/families').send(newFamily)).body;
    expect(response.name).toBe(newFamily.name);
    done();
  });

  test('PUT /api/families/:id updates a family', async (done) => {
    const response = (
      await request.put('/api/families/1').send({ name: 'The Smiths' })
    ).body;
    expect(response.name).toBe('The Smiths');
    done();
  });

  test('DELETE /api/families/:id deletes family', async (done) => {
    const response = await request.delete('/api/families/1');
    expect(response.status).toEqual(204);
    done();
  });
});
