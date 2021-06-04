const { Router } = require('express');
const router = Router();

router.use('/users', require('./users'));
router.use('/families', require('./families'));
router.use('/chores', require('./chores'));
router.use('/allowance', require('./allowance'));
router.use('/auth', require('./auth'));
router.use('/wishlistItem', require('./wishListItem'));
router.use('/transaction', require('./transaction'));
router.use('/notification', require('./notification'));
router.use('/cards', require('./cards'));

module.exports = router;
