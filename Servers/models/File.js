const mongoose = require('mongoose');
const {Schema} = mongoose;

const fileSchema = new Schema({
    data: Buffer,
    contentType: String
})

const File = mongoose.model('File', fileSchema);
module.exports = File;