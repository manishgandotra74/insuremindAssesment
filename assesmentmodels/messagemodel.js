const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    day: { type: String, required: true },
    time: { type: String, required: true },
    message: { type: String, required: true }
});

module.exports = mongoose.model('Message', postSchema);