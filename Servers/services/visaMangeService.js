const Document = require('../models/Document');
const File = require('../models/File');

const visas = {1:'receipt',2:'ead',3:'i983',4:'i20'}; // mapping type number with visa

exports.createFile = async (data, contentType) => {
    const file = new File({
        data: data,
        contentType: contentType
    });
    await file.save();
    return file._id;
}

exports.addDocument = async (employeeId, documentType, fileId) => {
    Document.findOneAndUpdate(
        {employee: employeeId},
        {$set: {[`${visas[documentType]}.link`]: fileId, status:0}}, //status，0：待审批，1:通过，2:拒绝
        {new: true}
    ).populate('employee')
     .exec((err, updatedDoc) => {
        if(err) {
            throw err;
        }
        console.log(updatedDoc);
     })
}