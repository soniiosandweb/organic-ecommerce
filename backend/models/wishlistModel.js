const mongoose = require('mongoose');

const wishlistSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.ObjectId,
        ref: "Product",
        required: true
    },
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

module.exports = mongoose.model('Wishlist', wishlistSchema);