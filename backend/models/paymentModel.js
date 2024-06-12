const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    id: {
        type: String,
        required: false
    },
    client_secret: {
        type: String,
        required: false
    },
    status: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true,
        default: 0
    },
    livemode: {
        type: Boolean,
        required: true,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Payment", paymentSchema);