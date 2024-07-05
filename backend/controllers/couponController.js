const Coupons = require('../models/couponModel');
const asyncErrorHandler = require('../middlewares/asyncErrorHandler');
const ErrorHandler = require('../utils/errorHandler');

// ADMIN DASHBOARD

// Add Coupon
exports.addCoupon = asyncErrorHandler(async (req, res, next) => {

    if(req.body.usersId){
        let specs = [];
        req.body.usersId.forEach((s) => {
            specs.push(JSON.parse(s))
        });
        req.body.usersId = specs;
    }

    const coupons = await Coupons.create(req.body);

    res.status(201).json({
        success: true,
        coupons
    });
});

// Update Coupon code
exports.updateCoupon = asyncErrorHandler(async (req, res, next) => {

    let coupons = await Coupons.findById(req.params.id);

    if (!coupons) {
        return next(new ErrorHandler("Coupon Not Found", 404));
    }

    if(req.body.usersId){
        let specs = [];
        req.body.usersId.forEach((s) => {
            specs.push(JSON.parse(s))
        });
        req.body.usersId = specs;
    } else {
        req.body.usersId = [];
    }

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
exports.getAllCouponsAdmin = asyncErrorHandler(async (req, res, next) => {

    const coupons = await Coupons.find();

    res.status(200).json({
        success: true,
        coupons,
    });
});


// Get All Coupons 
exports.getAllCoupons = asyncErrorHandler(async (req, res, next) => {

    const coupons = await Coupons.find({ 
        usersId: { 
           $elemMatch: { _id: req.params.id } 
        }
    });

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
