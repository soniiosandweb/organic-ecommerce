const mongoose = require('mongoose');

const faqSchema = new mongoose.Schema({
    title: {
        type : String,
        required: [true, "Please enter FAQ title" ]
    },
    description: {
        type: String,
        required: [true, "Please enter description"]
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('FAQ', faqSchema);