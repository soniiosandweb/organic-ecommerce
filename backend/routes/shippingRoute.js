const express = require('express');
const { isAuthenticatedUser } = require('../middlewares/auth');
const { getAddressDetails, createShippingAddress, updateShipping, deleteShipping } = require('../controllers/shippingController');

const router = express.Router();

router.route('/shipping/:id').get(getAddressDetails);

router.route('/address/add').post(isAuthenticatedUser, createShippingAddress);

router.route('/address/:id')
    .put(isAuthenticatedUser, updateShipping)
    .delete(isAuthenticatedUser, deleteShipping);

module.exports = router;