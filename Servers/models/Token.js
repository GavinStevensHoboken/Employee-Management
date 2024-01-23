const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    name: String,
    token: String,
    createDate: Date,
    tokenExpires: Date,
    status: {
        type: String,
        enum: ['not submitted', 'submitted'],
        default: 'not submitted',
    },
});

const Application = mongoose.model('Application', applicationSchema);

module.exports = Application;