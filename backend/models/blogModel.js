const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter blog name"],
        trim: true
    },
    except: {
        type: String,
        required: [true, "Please enter blog except"],
        trim: true,
    },
    description: {
        type: String,
        required: [true, "Please enter blog description"]
    },
    tags: [
        {
            type: String,
            required: false
        }
    ],
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
    category: {
        type: String,
        required: [true, "Please enter blog category"]
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

module.exports = mongoose.model('Blog', blogSchema);