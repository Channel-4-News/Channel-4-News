const { Router } = require('express');
const router = Router();

router.use('/users', require('./users'));
router.use('/wishListItem', require('./wishListItem'));
// router.use('/families', require('./families'));
// router.use('/chores', require('./chores'));
// router.use('/allowance', require('./allowance'));
// router.use('/wishlists', require('./wishlists'));
// router.use('/transactions', require('./transactions'));

module.exports = router;
