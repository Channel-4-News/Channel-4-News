const { Router } = require('express');
const router = Router();

const {
  models: { WishListItem },
} = require('../db/models/associations');

//Get all Wish List items by id
router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const allWishListItems = await WishListItem.findAll({
      where: { userId: id },
      order: [['itemName', 'ASC']],
    });
    res.send(allWishListItems);
  } catch (err) {
    next(err);
  }
});

//Find Url Data for wish list
const puppeteer = require('puppeteer');
const metascraper = require('metascraper')([
  require('metascraper-image')(),
  require('metascraper-title')(),
  require('metascraper-description')(),
  require('@samirrayani/metascraper-shopping')(),
]);
const got = require('got');

router.post('/', async (req, res, next) => {
  try {
    const newItem = await WishListItem.create(req.body);
    res.status(201).send(newItem);
  } catch (err) {
    next(err);
  }
});

//get form data for url
router.post('/form', async (req, res, next) => {
  try {
    const myUrl = req.body.url;
    const myCategory = req.body.category;
    const userId = req.body.userId;
    let result;
    if (myUrl.indexOf('amazon') !== -1) {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.goto(myUrl);
      await page.waitFor(1000);
      result = await page.evaluate(() => {
        const title = document.querySelector('#productTitle').innerText || '';
        const imgUrl =
          document.querySelector('#imgTagWrapperId > img').src || '';
        const priceStr =
          document.querySelector('#priceblock_ourprice')?.innerText ||
          document.querySelector('#priceblock_dealprice')?.innerText ||
          '';
        const priceInt = parseFloat(priceStr.replace('$', '')) || '';
        const descriptionPieces =
          document.querySelectorAll('#feature-bullets > ul > li > span') || '';
        let description = '';
        descriptionPieces.forEach((bullet, id) =>
          id > 0 ? (description += bullet.innerText || '') : ''
        );
        return {
          itemName: title,
          imgUrl,
          cost: priceInt,
          description,
        };
      });
      browser.close();
    } else {
      const { body: html, url } = await got(myUrl);
      const metadata = await metascraper({ html, url });
      result = {
        itemName: metadata.title,
        imgUrl: metadata.image,
        cost: metadata.price,
        description: metadata.description,
      };
    }
    const newItem = {
      ...result,
      category: myCategory,
      linkUrl: myUrl,
      userId,
    };
    res.status(201).send(newItem);
  } catch (err) {
    next(err);
  }
});

//Delete an Item
router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleteItem = await WishListItem.findByPk(id);
    await deleteItem.destroy();
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
});

//Update an Item
router.put('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const updateItem = await WishListItem.findByPk(id);
    const { itemName, description, imgUrl, cost, category, purchased } =
      req.body;
    await updateItem.update({
      itemName,
      description,
      imgUrl,
      cost,
      category,
      purchased,
    });
    res.status(200).send(updateItem);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
