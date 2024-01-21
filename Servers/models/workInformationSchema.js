const mongoose = require('mongoose');

const workInformationSchema = new mongoose.Schema({
    residencyType: { type: String, default: '' },
    ssn: { type: String, default: '' },
    startDate: { type: Date, default: Date.now }, // 或根据您的需求调整日期类型
    endDate: { type: Date, default: Date.now }, // 同上
    residencyStatus: { type: String, default: '' },
    workAuthorization: { type: String, default: '' },
    visaTitle: { type: String, default: '' },
    fileName: { type: String, default: '' },
    optReceipt: { type: String, default: null } // 如果这是文件路径
}, {
    timestamps: true // 自动添加createdAt和updatedAt字段
});

const WorkInformation = mongoose.model('WorkInformation', workInformationSchema);

module.exports = WorkInformation;
