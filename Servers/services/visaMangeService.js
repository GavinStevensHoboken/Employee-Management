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
    const document = await Document.findOne({employee:employeeId});
    if(!document){
        const newDoc = new Document({employee: employeeId, [`${visas[documentType]}.link`]: fileId, [`${visas[documentType]}.status`]: 0, status:0});
        await newDoc.save();
    } else{
        Document.findOneAndUpdate(
            {employee: employeeId},
            {$set: {[`${visas[documentType]}.link`]: fileId, [`${visas[documentType]}.status`]:0}}, //status，0：待审批，1:通过，2:拒绝
            {new: true}
        ).populate('employee')
         .exec()
         .then((updatedDoc) => {
            console.log(updatedDoc);
         })
         .catch((err) => {
            throw err;
         });
    }
    
}

exports.getDocumentByEmployee = async (employeeId) => {
    const document = await Document.findOne({employee:employeeId});
    return document;
}

exports.getAllDocuments = async () => {
    const document = await Document.find();
    return document;
}