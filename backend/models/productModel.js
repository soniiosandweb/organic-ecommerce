const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter product name"],
        trim: true
    },
    description: {
        type: String,
        required: [true, "Please enter product description"]
    },
    highlights: [
        {
            type: String,
            required: false
        }
    ],
    specifications: [
        {
            title: {
                type: String,
                required: false
            },
            description: {
                type: String,
                required: false
            }
        }
    ],
    price: {
        type: Number,
        required: [true, "Please enter product selling price"]
    },
    cuttedPrice: {
        type: Number,
        required: [false, "Please enter product price"]
    },
    images: [
        {
            public_id: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            }
        }
    ],
    brand: {
        name: {
            type: String,
            required: false
        },
        logo: {
            public_id: {
                type: String,
                required: false,
            },
            url: {
                type: String,
                required: false,
            }
        }
    },
    category: {
        type: mongoose.Schema.ObjectId,
        ref: "Categories",
        required: [true, "Please enter product category"]
    },
    featured: {
        type: Boolean,
        required: false,
        default: false
    },
    stock: {
        type: Number,
        required: [true, "Please enter product stock"],
        maxlength: [4, "Stock cannot exceed limit"],
        default: 1
    },
    warranty: {
        type: Number,
        default: 1
    },
    ratings: {
        type: Number,
        default: 0
    },
    numOfReviews: {
        type: Number,
        default: 0
    },
    reviews: [
        {
            user: {
                type: mongoose.Schema.ObjectId,
                ref: "User",
                required: true
            },
            name: {
                type: String,
                required: true
            },
            rating: {
                type: Number,
                required: true
            },
            comment: {
                type: String,
                required: true
            }
        }
    ],

    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Product', productSchema);