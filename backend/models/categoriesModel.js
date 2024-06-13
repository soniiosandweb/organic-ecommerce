const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    
    image: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    },
    name: {
        type: String,
        required: [true, "Please enter category name"]
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Categories', categorySchema);