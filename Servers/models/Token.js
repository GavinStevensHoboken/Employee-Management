const mongoose = require('mongoose');
const {Schema} = mongoose;

const token = new Schema({
    email: { type: String,},
    token: { type: String,},
    createDate: { type: Date,},
    expiresDate: { type: Date,}
});

const Token = mongoose.model('Token', token);
module.exports = Token;