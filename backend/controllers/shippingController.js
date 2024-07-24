const asyncErrorHandler = require('../middlewares/asyncErrorHandler');
const Shipping = require('../models/shippingModel');
const ErrorHandler = require('../utils/errorHandler');


// Get Address Details
exports.getAddressDetails = asyncErrorHandler(async (req, res, next) => {

    const shipping = await Shipping.find({user: req.params.id});

    if (!shipping) {
        return next(new ErrorHandler("Shipping Address Not Found", 404));
    }

    res.status(200).json({
        success: true,
        shipping,
    });
});


// Create Shipping Address
exports.createShippingAddress = asyncErrorHandler(async (req, res, next) => {

    req.body.user = req.user.id;

    const shipping = await Shipping.create(req.body);

    res.status(201).json({
        success: true,
        shipping
    });
});

// Update Shipping Address
exports.updateShipping = asyncErrorHandler(async (req, res, next) => {

    let shipping = await Shipping.findById(req.params.id);

    if (!shipping) {
        return next(new ErrorHandler("Shipping Address Not Found", 404));
    }


    req.body.user = req.user.id;

    shipping = await Shipping.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });


    res.status(201).json({
        success: true,
        shipping
    });
});