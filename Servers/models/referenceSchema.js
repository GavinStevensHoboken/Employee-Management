const mongoose = require('mongoose');

const referenceSchema = new mongoose.Schema({
    userId: { type: String, default: '' },
    firstName: { type: String, default: '' },
    lastName: { type: String, default: '' },
    middleName: { type: String, default: '' },
    phone: { type: String, default: '' },
    email: { type: String, default: '' },
    relationship: { type: String, default: '' }
}, {
    timestamps: true
});

const ReferenceInfo = mongoose.model('ReferenceInfo', referenceSchema);

module.exports = ReferenceInfo;
