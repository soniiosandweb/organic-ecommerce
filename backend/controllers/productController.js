const asyncErrorHandler = require('../middlewares/asyncErrorHandler');
const Product = require('../models/productModel');
const SearchFeatures = require('../utils/searchFeatures');
const ErrorHandler = require('../utils/errorHandler');
const cloudinary = require('cloudinary');

// Get All Products
exports.getAllProducts = asyncErrorHandler(async (req, res, next) => {

    const resultPerPage = 12;
    const productsCount = await Product.countDocuments();
    // console.log(req.query);

    const searchFeature = new SearchFeatures(Product.find().populate('category'), req.query)
        .search()
        .filter();

    let products = await searchFeature.query;
    let filteredProductsCount = products.length;

    searchFeature.pagination(resultPerPage);

    products = await searchFeature.query.clone();

    res.status(200).json({
        success: true,
        products,
        productsCount,
        resultPerPage,
        filteredProductsCount,
    });
});

// Get All Products ---Product Sliders
exports.getProducts = asyncErrorHandler(async (req, res, next) => {
    const products = await Product.find().populate('category');

    res.status(200).json({
        success: true,
        products,
    });
});

// Get Product Details
exports.getProductDetails = asyncErrorHandler(async (req, res, next) => {

    const product = await Product.findById(req.params.id).populate('category');

    if (!product) {
        return next(new ErrorHandler("Product Not Found", 404));
    }

    res.status(200).json({
        success: true,
        product,
    });
});

// Get All Products ---ADMIN
exports.getAdminProducts = asyncErrorHandler(async (req, res, next) => {
    const products = await Product.find().populate('category');

    if (!products) {
        return next(new ErrorHandler("Product Not Found", 404));
    }

    res.status(200).json({
        success: true,
        products,
    });
});

// Get All Featured products
exports.getFeaturedProducts = asyncErrorHandler(async (req, res, next) => {
    const products = await Product.find({featured : true}).populate('category');

    if (!products) {
        return next(new ErrorHandler("Product Not Found", 404));
    }

    res.status(200).json({
        success: true,
        products,
    });
});

// Create Product ---ADMIN
exports.createProduct = asyncErrorHandler(async (req, res, next) => {

    let images = [];
    if (typeof req.body.images === "string") {
        images.push(req.body.images);
    } else {
        images = req.body.images;
    }

    const imagesLink = [];

    for (let i = 0; i < images.length; i++) {
        const result = await cloudinary.v2.uploader.upload(images[i], {
            folder: "products",
        });

        imagesLink.push({
            public_id: result.public_id,
            url: result.secure_url,
        });
    }

    // if(req.body.logo){
    //     const result = await cloudinary.v2.uploader.upload(req.body.logo, {
    //         folder: "brands",
    //     });
    //     const brandLogo = {
    //         public_id: result.public_id,
    //         url: result.secure_url,
    //     };

    //     req.body.brand = {
    //         name: req.body.brandname,
    //         logo: brandLogo
    //     }
    // } else {
    //     req.body.brand = {
    //         name: req.body.brandname,
    //     }
    // }

    req.body.images = imagesLink;
    req.body.user = req.user.id;

    // if(req.body.specifications){
    //     let specs = [];
    //     req.body.specifications.forEach((s) => {
    //         specs.push(JSON.parse(s))
    //     });
    //     req.body.specifications = specs;
    // }

    const product = await Product.create(req.body);

    res.status(201).json({
        success: true,
        product
    });
});

// Update Product ---ADMIN
exports.updateProduct = asyncErrorHandler(async (req, res, next) => {

    let product = await Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHandler("Product Not Found", 404));
    }

    let productImages = [];
 
    if(req.body.oldImages !== undefined){

        // let images = [];

        if(typeof req.body.oldImages === "string"){
            productImages.push(JSON.parse(req.body.oldImages))
        } else  {
            req.body.oldImages.forEach((s) => {
                productImages.push(JSON.parse(s))
            });
        }

        // req.body.images = images; 
      
    }


    if (req.body.newImages !== undefined) {
        let images = [];
        
        if (typeof req.body.newImages === "string") {
            images.push(req.body.newImages);
        } else {
            images = req.body.newImages;
        }
        for (let i = 0; i < product.images.length; i++) {
            await cloudinary.v2.uploader.destroy(product.images[i].public_id);
        }

        const imagesLink = [];

        for (let i = 0; i < images.length; i++) {

            
            const result = await cloudinary.v2.uploader.upload(images[i], {
                folder: "products",
            });

            productImages.push({
                public_id: result.public_id,
                url: result.secure_url,
            });
        }
        
    }

    req.body.images = productImages;

    // if (req.body.logo.length > 0) {
    //     await cloudinary.v2.uploader.destroy(product.brand.logo.public_id);
    //     const result = await cloudinary.v2.uploader.upload(req.body.logo, {
    //         folder: "brands",
    //     });
    //     const brandLogo = {
    //         public_id: result.public_id,
    //         url: result.secure_url,
    //     };

    //     req.body.brand = {
    //         name: req.body.brandname,
    //         logo: brandLogo
    //     }
    // } 
    
    // if(req.body.specifications){
    //     let specs = [];
    //     req.body.specifications.forEach((s) => {
    //         specs.push(JSON.parse(s))
    //     });
    //     req.body.specifications = specs;
    // }

    if(req.body.highlights){
        req.body.highlights = req.body.highlights;
    } else {
        req.body.highlights = [];
    }
    
    req.body.user = req.user.id;

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });


    res.status(201).json({
        success: true,
        product
    });
});

// Delete Product ---ADMIN
exports.deleteProduct = asyncErrorHandler(async (req, res, next) => {

    const product = await Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHandler("Product Not Found", 404));
    }

    for (let i = 0; i < product.images.length; i++) {
        await cloudinary.v2.uploader.destroy(product.images[i].public_id);
    }

    await product.remove();

    res.status(201).json({
        success: true
    });
});

// Create OR Update Reviews
exports.createProductReview = asyncErrorHandler(async (req, res, next) => {

    const { rating, comment, productId } = req.body;

    const review = {
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        comment,
    }

    const product = await Product.findById(productId);

    if (!product) {
        return next(new ErrorHandler("Product Not Found", 404));
    }

    const isReviewed = product.reviews.find(review => review.user.toString() === req.user._id.toString());

    if (isReviewed) {

        product.reviews.forEach((rev) => { 
            if (rev.user.toString() === req.user._id.toString())
                (rev.rating = rating, rev.comment = comment);
        });
    } else {
        product.reviews.push(review);
        product.numOfReviews = product.reviews.length;
    }

    let avg = 0;

    product.reviews.forEach((rev) => {
        avg += rev.rating;
    });

    product.ratings = avg / product.reviews.length;

    await product.save({ validateBeforeSave: false });

    res.status(200).json({
        success: true
    });
});

// Get All Reviews of Product
exports.getProductReviews = asyncErrorHandler(async (req, res, next) => {

    var datasets = [];

    var newarr = [];

    if(req.query.id){

        const product = await Product.findById(req.query.id);

        if (!product) {
            return next(new ErrorHandler("Product Not Found", 404));
        }

        product.reviews.forEach((rev) => {
            newarr.push({
                '_id' : rev._id,
                'user': rev.name,
                'rating': rev.rating,
                'comment': rev.comment,
                'product': product.name,
                'productId': product._id,
            })
        })


    } else {
        const products = await Product.find({ numOfReviews: { $gt: 0 } });

        if (!products) {
            return next(new ErrorHandler("Product Not Found", 404));
        }

        products.forEach((product) => {

            product.reviews.forEach((rev) => {
                newarr.push({
                    '_id' : rev._id,
                    'user': rev.name,
                    'rating': rev.rating,
                    'comment': rev.comment,
                    'product': product.name,
                    'productId': product._id,
                })
            })
            
        });

    }
    
    res.status(200).json({
        success: true,
        reviews: newarr
    });
});

// Delete Reveiws
exports.deleteReview = asyncErrorHandler(async (req, res, next) => {

    const product = await Product.findById(req.query.productId);

    if (!product) {
        return next(new ErrorHandler("Product Not Found", 404));
    }

    const reviews = product.reviews.filter((rev) => rev._id.toString() !== req.query.id.toString());

    let avg = 0;

    reviews.forEach((rev) => {
        avg += rev.rating;
    });

    let ratings = 0;

    if (reviews.length === 0) {
        ratings = 0;
    } else {
        ratings = avg / reviews.length;
    }

    const numOfReviews = reviews.length;

    await Product.findByIdAndUpdate(req.query.productId, {
        reviews,
        ratings: Number(ratings),
        numOfReviews,
    }, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });

    res.status(200).json({
        success: true,
    });
});

// Get All Reviews of User
exports.getUserReviews = asyncErrorHandler(async (req, res, next) => {

    const products = await Product.find({ numOfReviews: { $gt: 0 } });

    if (!products) {
        return next(new ErrorHandler("Product Not Found", 404));
    }

    var reviews = [];

    products.forEach((product) => {
        const review = product.reviews.filter((rev) => rev.user.toString() === req.query.id.toString());
        
        if(review.length > 0){
           reviews.push({"review" : review, "product" : product}); 
        }
        
    });

    res.status(200).json({
        success: true,
        reviews: reviews,
    });
});