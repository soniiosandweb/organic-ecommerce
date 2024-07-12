const Categories = require('../models/categoriesModel');
const asyncErrorHandler = require('../middlewares/asyncErrorHandler');
const ErrorHandler = require('../utils/errorHandler');
const cloudinary = require('cloudinary');
const Product = require('../models/productModel');

// ADMIN DASHBOARD

// Add Category
exports.addCategory = asyncErrorHandler(async (req, res, next) => {

    const myCloud = await cloudinary.v2.uploader.upload(req.body.category, {
        folder: "category",
    });
    
    const catCloud = await cloudinary.v2.uploader.upload(req.body.icon, {
        folder: "category",
    });

    const { name } = req.body;

    const categories = await Categories.create({
        name, 
        image: {
            public_id: myCloud.public_id,
            url: myCloud.secure_url,
        },
        icon: {
            public_id: catCloud.public_id,
            url: catCloud.secure_url,
        },
    });

    res.status(201).json({
        success: true,
        categories
    });
});

// Update User Category
exports.updateCategory = asyncErrorHandler(async (req, res, next) => {

    let categories = await Categories.findById(req.params.id);

    if (!categories) {
        return next(new ErrorHandler("Category Not Found", 404));
    }

    if(req.body.category !== "") {

        await cloudinary.v2.uploader.destroy(categories.image.public_id);
        const result = await cloudinary.v2.uploader.upload(req.body.category, {
            folder: "category",
        });

        req.body.image = {
            public_id: result.public_id,
            url: result.secure_url,
        };
    }

    if(req.body.iconImg !== "") {

        await cloudinary.v2.uploader.destroy(categories.image.public_id);
        const resultIcon = await cloudinary.v2.uploader.upload(req.body.iconImg, {
            folder: "category",
        });

        req.body.icon = {
            public_id: resultIcon.public_id,
            url: resultIcon.secure_url,
        };
    }

    categories= await Categories.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: true,
    });

    res.status(200).json({
        success: true,
        categories
    });
});

// Get All Categories 
exports.getAllCategories = asyncErrorHandler(async (req, res, next) => {

    const categories = await Categories.find();

    res.status(200).json({
        success: true,
        categories,
    });
});

// Get Limited Categories 
exports.getCategories = asyncErrorHandler(async (req, res, next) => {

    const categories = await Categories.find().limit(6);

    res.status(200).json({
        success: true,
        categories,
    });
});

// Get Single Category Details
exports.getSingleCategory = asyncErrorHandler(async (req, res, next) => {

    const category = await Categories.findById(req.params.id);

    if(!category) {
        return next(new ErrorHandler(`Category doesn't exist with id: ${req.params.id}`, 404));
    }

    res.status(200).json({
        success: true,
        category,
    });
});


// Delete Category
exports.deleteCategory = asyncErrorHandler(async (req, res, next) => {

    const category = await Categories.findById(req.params.id);

    if(!category) {
        return next(new ErrorHandler(`Category doesn't exist with id: ${req.params.id}`, 404));
    }

    const product = await Product.find({category : req.params.id});

    if(product == ""){
        await category.remove();

        res.status(200).json({
            success: true
        });
    } else {
        return next(new ErrorHandler(`Category asigned to product. Remove this category from product first.`, 404));
    }

    
});
