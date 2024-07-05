const Faq = require('../models/faqModel');
const asyncErrorHandler = require('../middlewares/asyncErrorHandler');
const ErrorHandler = require('../utils/errorHandler');

// Add FAQ
exports.addFaq = asyncErrorHandler(async (req, res, next) => {

    const faq = await Faq.create(req.body);

    res.status(201).json({
        success: true,
        faq
    });
});

// Update Coupon code
exports.updateFaq = asyncErrorHandler(async (req, res, next) => {

    let faq = await Faq.findById(req.params.id);
    
    if (!faq) {
        return next(new ErrorHandler("FAQ Not Found", 404));
    }

    faq= await Faq.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: true,
    });

    res.status(200).json({
        success: true,
        faq
    });
});

// Get All FAQs 
exports.getAllFaqs = asyncErrorHandler(async (req, res, next) => {

    const faq = await Faq.find();

    res.status(200).json({
        success: true,
        faq,
    });
});

// Get FAQ Details
exports.getFaqDetails = asyncErrorHandler(async (req, res, next) => {

    const faq = await Faq.findById(req.params.id);

    if(!faq) {
        return next(new ErrorHandler(`FAQ doesn't exist with id: ${req.params.id}`, 404));
    }

    res.status(200).json({
        success: true,
        faq,
    });
});

// Delete FAQ
exports.deleteFaq = asyncErrorHandler(async (req, res, next) => {

    const faq = await Faq.findById(req.params.id);

    if(!faq) {
        return next(new ErrorHandler(`FAQ doesn't exist with id: ${req.params.id}`, 404));
    }

    await faq.remove();

    res.status(200).json({
        success: true
    });
});
