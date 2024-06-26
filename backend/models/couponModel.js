const mongoose = require('mongoose');

const couponSchema = new mongoose.Schema({
    
    discount: {
        type: Number,
        required: [true, "Please enter discount"]
    },
    percentage: {
        type: Boolean,
        required: true,
        default: false
    },
    name: {
        type: String,
        required: [true, "Please enter category name"],
        unique: true,
    },
    usersId: [{
        name: {
            type: String,
            required: false
        },
        id: {
            type: mongoose.Schema.ObjectId,
            ref: "User",
            required: false
        },
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Coupons', couponSchema);