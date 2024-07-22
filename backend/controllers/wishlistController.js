const asyncErrorHandler = require('../middlewares/asyncErrorHandler');
const Wishlist = require('../models/wishlistModel');
const ErrorHandler = require('../utils/errorHandler');

// Get Wishlist Item
exports.getWishlists = asyncErrorHandler(async (req, res, next) => {
    const wishlist = await Wishlist.find({user: req.params.id}).populate('user').populate('product');

    if (!wishlist) {
        return next(new ErrorHandler("Wishlist Item Not Found", 404));
    }

    res.status(200).json({
        success: true,
        wishlist,
    });
});


// Create Wishlist Item
exports.createWishlist = asyncErrorHandler(async (req, res, next) => {

    const wishlist = await Wishlist.create(req.body);

    res.status(201).json({
        success: true,
        wishlist
    });
});

// Delete Wishlist Item
exports.deleteWishlist = asyncErrorHandler(async (req, res, next) => {

    const wishlist = await Wishlist.findById(req.params.id);

    if (!wishlist) {
        return next(new ErrorHandler("Wishlist Item Not Found", 404));
    }

    await wishlist.remove();

    res.status(201).json({
        success: true
    });
});