const mongoose = require('mongoose');

const workInformationSchema = new mongoose.Schema({
    userId: { type: String, default: '' },
    residencyType: { type: String, default: '' },
    ssn: { type: String, default: '' },
    startDate: { type: Date, default: Date.now },
    endDate: { type: Date, default: Date.now },
    residencyStatus: { type: String, default: '' },
    workAuthorization: { type: String, default: '' },
    visaTitle: { type: String, default: '' },
    fileName: { type: String, default: '' },
    optReceipt: { type: String, default: null }
}, {
    timestamps: true
});

const WorkInformation = mongoose.model('WorkInformation', workInformationSchema);

module.exports = WorkInformation;
