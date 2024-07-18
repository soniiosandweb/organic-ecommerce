const asyncErrorHandler = require('../middlewares/asyncErrorHandler');
const Blog = require('../models/blogModel');
const SearchFeatures = require('../utils/searchFeatures');
const ErrorHandler = require('../utils/errorHandler');
const cloudinary = require('cloudinary');

// Get All Blogs
exports.getAllBlogs = asyncErrorHandler(async (req, res, next) => {

    const resultPerPage = 12;
    const blogCount = await Blog.countDocuments();

    const searchFeature = new SearchFeatures(Blog.find(), req.query)
        .search()
        .filter();

    let blogs = await searchFeature.query;
    let filteredBlogsCount = blogs.length;

    searchFeature.pagination(resultPerPage);

    blogs = await searchFeature.query.clone();

    res.status(200).json({
        success: true,
        blogs,
        blogCount,
        resultPerPage,
        filteredBlogsCount,
    });
});


// Get Blog Details
exports.getBlogDetails = asyncErrorHandler(async (req, res, next) => {

    const blog = await Blog.findById(req.params.id).populate('user');

    if (!blog) {
        return next(new ErrorHandler("Blog Not Found", 404));
    }

    res.status(200).json({
        success: true,
        blog,
    });
});

// Get Latest Blogs
exports.getLatestBlogs = asyncErrorHandler(async (req, res, next) => {
    const blogs = await Blog.find().limit(4);

    if (!blogs) {
        return next(new ErrorHandler("Blog Not Found", 404));
    }

    res.status(200).json({
        success: true,
        blogs,
    });
});


// Get All Blogs ---ADMIN
exports.getAdminBlogs = asyncErrorHandler(async (req, res, next) => {
    const blogs = await Blog.find();

    if (!blogs) {
        return next(new ErrorHandler("Blog Not Found", 404));
    }

    res.status(200).json({
        success: true,
        blogs,
    });
});

// Create Blog ---ADMIN
exports.createBlog = asyncErrorHandler(async (req, res, next) => {

    const myCloud = await cloudinary.v2.uploader.upload(req.body.image, {
        folder: "blog",
    });

    req.body.image = {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
    };

    req.body.user = req.user.id;

    const blog = await Blog.create(req.body);

    res.status(201).json({
        success: true,
        blog
    });
});

// Update Blog ---ADMIN
exports.updateBlog = asyncErrorHandler(async (req, res, next) => {

    let blog = await Blog.findById(req.params.id);

    if (!blog) {
        return next(new ErrorHandler("Blog Not Found", 404));
    }

    if(req.body.blogImage !== "") {

        await cloudinary.v2.uploader.destroy(blog.image.public_id);
        const result = await cloudinary.v2.uploader.upload(req.body.blogImage, {
            folder: "blog",
        });

        req.body.image = {
            public_id: result.public_id,
            url: result.secure_url,
        };
    }

    
    if(req.body.tags){
        req.body.tags = req.body.tags;
    } else {
        req.body.tags = [];
    }
    
    req.body.user = req.user.id;

    blog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });


    res.status(201).json({
        success: true,
        blog
    });
});

// Delete Blog ---ADMIN
exports.deleteBlog = asyncErrorHandler(async (req, res, next) => {

    const blog = await Blog.findById(req.params.id);

    if (!blog) {
        return next(new ErrorHandler("Blog Not Found", 404));
    }

    await cloudinary.v2.uploader.destroy(blog.image.public_id);

    await blog.remove();

    res.status(201).json({
        success: true
    });
});