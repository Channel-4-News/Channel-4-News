/* eslint no-undef: 'off' */

const supertest = require('supertest');
const { app } = require('../../server/app');

const request = supertest(app);
const {
  db,
  models: { WishListItem },
} = require('../../server/db/models/associations');

describe('WishListItem Routes', () => {
  const wishListItems = [
    {
      itemName: 'test',
      description: 'Its a test',
      imgUrl: 'sick-pic.jpg',
      cost: 4.0,
      linkUrl: 'test-link',
      category: 'Miscellaneous',
    },
    {
      itemName: 'Tv',
      description: 'HD TV',
      imgUrl: 'tv-pic.jpg',
      cost: 100.0,
      linkUrl: 'tv-link',
      category: 'Electronics',
    },
  ];
  beforeAll(async () => {
    await db.sync({ force: true });
    await WishListItem.bulkCreate(wishListItems);
  });
  afterAll(async () => {
    await db.close();
  });

  test('GET /api/wishListItem returns all items', async (done) => {
    const response = await request.get('/api/wishListItem');
    expect(response.body.length).toBe(2);
    done();
  });

  test('POST /api/wishListItem creates new item', async (done) => {
    const newItem = {
      itemName: 'new Item',
      description: 'new item wow',
      imgUrl: 'new-item.jpg',
      cost: 200.0,
      linkUrl: 'new-item-link',
      category: 'Toys',
    };
    let response = (await request.post('/api/wishListItem').send(newItem)).body;
    expect(response.itemName).toBe(newItem.itemName);
    done();
  });

  test('PUT /api/wishListItem/:id updates an item', async (done) => {
    const response = (
      await request
        .put('/api/wishListItem/1')
        .send({ itemName: 'actually-this' })
    ).body;
    expect(response.itemName).toBe('actually-this');
    done();
  });

  test('DELETE /api/wishListItem/:id deletes an item', async (done) => {
    const response = await request.delete('/api/wishListItem/1');
    expect(response.status).toEqual(204);
    done();
  });
});
