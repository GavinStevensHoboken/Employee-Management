const mongoose = require('mongoose');

const personalInformationSchema = new mongoose.Schema({
    userId: { type: String, default: '' },
    title: { type: String, default: '' },
    firstName: { type: String, default: '' },
    middleName: { type: String, default: '' },
    lastName: { type: String, default: '' },
    avatar: { type: String, default: '' },
    preferName: { type: String, default: '' },
    dateOfBirth: { type: Date },
    streetAddress: { type: String, default: '' },
    streetAddress2: { type: String, default: '' },
    city: { type: String, default: '' },
    state: { type: String, default: '' },
    postalCode: { type: String, default: '' },
    country: { type: String, default: '' },
    gender: { type: String, default: '' },
    email: { type: String, default: '' },
    homePhone: { type: String, default: '' },
    cellPhone: { type: String, default: '' },
}, {
    timestamps: true
});

const PersonalInformation = mongoose.model('PersonalInformation', personalInformationSchema);

module.exports = PersonalInformation;
