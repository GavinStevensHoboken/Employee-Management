const mongoose = require('mongoose');

const receiptfileSchema = new mongoose.Schema({
    filename: String,
    contentType: String,
    path: String,
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Receipt', receiptfileSchema);
