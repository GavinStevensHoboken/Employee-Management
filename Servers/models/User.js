const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    type: {
        type: String,
        required: true
    },
    applyStatus: {
        type: Boolean,
        default: false,
        required: true
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
