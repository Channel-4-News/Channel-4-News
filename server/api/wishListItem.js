const { Router, json } = require('express');
const router = Router();

const {
  models: { WishListItem },
} = require('../db/models/associations');

router.use(json());

//Get all Wish List items by id
router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const allWishListItems = await WishListItem.findAll({
      where: { userId: id },
    });
    res.send(allWishListItems);
  } catch (err) {
    next(err);
  }
});

// Single Item
// router.get('/:id', async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const singleItem = await WishListItem.findByPk(id);
//     res.send(singleItem);
//   } catch (err) {
//     next(err);
//   }
// });

//Add Item To WishList
router.post('/', async (req, res, next) => {
  try {
    const { itemName, description, imgUrl, cost, linkUrl, category } = req.body;
    const newItem = await WishListItem.create({
      itemName,
      description,
      imgUrl,
      cost,
      linkUrl,
      category,
    });
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
