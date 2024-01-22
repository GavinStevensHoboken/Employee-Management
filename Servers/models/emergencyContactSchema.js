const mongoose = require('mongoose');

const emergencyContactSchema = new mongoose.Schema({
    userId: { type: String, default: '' },
    firstName: { type: String, default: '' },
    lastName: { type: String, default: '' },
    middleName: { type: String, default: '' },
    phone: { type: String, default: '' },
    email: { type: String, default: '' },
    relationship: { type: String, default: '' }
}, {
    timestamps: true // 自动添加createdAt和updatedAt字段
});

const EmergencyContact = mongoose.model('EmergencyContact', emergencyContactSchema);

module.exports = EmergencyContact;
