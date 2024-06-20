const Coupons = require('../models/couponModel');
const asyncErrorHandler = require('../middlewares/asyncErrorHandler');
const ErrorHandler = require('../utils/errorHandler');

// ADMIN DASHBOARD

// Add Coupon
exports.addCoupon = asyncErrorHandler(async (req, res, next) => {

    const { name, discount, percentage } = req.body;

    const coupons = await Coupons.create({
        name, 
        discount,
        percentage,
    });

    res.status(201).json({
        success: true,
        coupons
    });
});

// Update Coupon code
exports.updateCoupon = asyncErrorHandler(async (req, res, next) => {

    let coupons = await Coupons.findById(req.params.id);

    coupons= await Coupons.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: true,
    });

    res.status(200).json({
        success: true,
        coupons
    });
});

// Get All Coupons 
exports.getAllCoupons = asyncErrorHandler(async (req, res, next) => {

    const coupons = await Coupons.find();

    res.status(200).json({
        success: true,
        coupons,
    });
});


// Get Coupon Details
exports.getCouponDetails = asyncErrorHandler(async (req, res, next) => {

    const coupons = await Coupons.findById(req.params.id);

    if(!coupons) {
        return next(new ErrorHandler(`Coupon doesn't exist with id: ${req.params.id}`, 404));
    }

    res.status(200).json({
        success: true,
        coupons,
    });
});


// Delete Coupon
exports.deleteCoupon = asyncErrorHandler(async (req, res, next) => {

    const coupons = await Coupons.findById(req.params.id);

    if(!coupons) {
        return next(new ErrorHandler(`Coupon doesn't exist with id: ${req.params.id}`, 404));
    }

    await coupons.remove();

    res.status(200).json({
        success: true
    });
});
