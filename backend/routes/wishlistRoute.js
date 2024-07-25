const express = require('express');
const { isAuthenticatedUser } = require('../middlewares/auth');
const { getWishlists, createWishlist, deleteWishlist } = require('../controllers/wishlistController');

const router = express.Router();

router.route('/wishlist/:id').get(isAuthenticatedUser, getWishlists);

router.route('/wishlist/new').post(isAuthenticatedUser, createWishlist);

router.route('/wishlist/delete/:id').delete(isAuthenticatedUser, deleteWishlist);

module.exports = router;