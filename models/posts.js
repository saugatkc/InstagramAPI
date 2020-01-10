const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    pic: {
        type: String,
        required: true
    },

    description: {
        type: String
    }
}, {timestamps: true});

module.exports = mongoose.model('posts', postSchema);