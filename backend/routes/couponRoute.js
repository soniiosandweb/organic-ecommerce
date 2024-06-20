const express = require('express');
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');
const { getAllCoupons, addCoupon, updateCoupon, deleteCoupon, getCouponDetails } = require('../controllers/couponController');

const router = express.Router();

router.route('/coupons').get(getAllCoupons);

router.route('/admin/coupon/add').post(isAuthenticatedUser, authorizeRoles("admin"), addCoupon);

router.route("/coupon/:id").get(getCouponDetails)

router.route('/admin/coupon/:id')
    .put(isAuthenticatedUser, authorizeRoles("admin"), updateCoupon)
    .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteCoupon);

module.exports = router;