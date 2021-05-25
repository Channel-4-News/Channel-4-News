/* eslint no-undef: 'off' */
/* eslint no-console: 'off' */

const {
  models: { WishListItem },
} = require('../../../server/db/models/Associations');
const { db, initDB } = require('../../../server/db/db');

let wishListItem;

beforeAll(async () => {
  await initDB();

  wishListItem = await WishListItem.create({
    itemName: 'Nintendo Switch',
    description: 'Best Console Ever',
    imgUrl:
      'https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6364/6364253_sa.jpg;maxHeight=640;maxWidth=550',
    cost: 299.99,
    linkUrl:
      'https://www.bestbuy.com/site/nintendo-switch-32gb-console-gray-joy-con/6364253.p?skuId=6364253',
    category: 'Electronics',
  });
});

afterAll(() => {
  db.close();
});

it('WishListItem model exists', (done) => {
  expect(wishListItem.category).toEqual('Electronics');
  done();
});
