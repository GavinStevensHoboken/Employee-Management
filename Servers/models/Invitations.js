const mongoose = require('mongoose');
const {Schema} = mongoose;

const invitationSchema = new Schema({
    candidate:{
        type: Schema.Types.ObjectId,
        ref: 'Employee'
    },
    email:{
        type: String,
        required: true
    },
    name:{
        type: String,
        required: true
    },
    regisLink:{
        type: String,
        required: true
    },
    accepted:{
        type: Boolean,
        required: true
    }
});

const Invitation = mongoose.model('Invitation', invitationSchema);
module.exports = Invitation;