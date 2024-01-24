const mongoose = require('mongoose');
const {Schema} = mongoose;

const documentSchema = new Schema({
    employee: {
        type: Schema.Types.ObjectId,
        ref: 'Employee'},
    receipt: {
        link: {
            type:Schema.Types.ObjectId,
            ref: 'File'},
        status: Number
    },
    ead: {
        link: {
            type:Schema.Types.ObjectId,
            ref: 'File'},
        status: Number,
    },
    i983: {
        link: {
            type:Schema.Types.ObjectId,
            ref: 'File'},
        status: Number
    },
    i20: {
        link: {
            type:Schema.Types.ObjectId,
            ref: 'File'},
        status: Number
    },
    status: Number,
    feedback: String,
    nextStep: Number           // 0:没下一步了,1:receipt,2:ead,3:i983,4:i20,5:wait for approve
});

const Document = mongoose.model('Document', documentSchema);
module.exports = Document;