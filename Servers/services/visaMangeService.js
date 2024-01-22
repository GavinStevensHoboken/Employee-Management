const Document = require('../models/Document');
const File = require('../models/File');
const _ = require('lodash');

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
        const newDoc = new Document({employee: employeeId, [`${visas[1]}.link`]: fileId, [`${visas[1]}.status`]: 2, status:0}); //staus 0:最后一步未通过，1: 全部通过
        await newDoc.save();
    } else{
        Document.findOneAndUpdate(
            {employee: employeeId},
            {$set: {[`${visas[documentType]}.link`]: fileId, [`${visas[documentType]}.status`]:2}}, //${visas[documentType]}.status: {0:'new',1:'approved',2:'submitted',3:'rejected'};

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
    const document = await Document.findOne({employee:employeeId})
        .populate('receipt.link')
        .populate('ead.link')
        .populate('i983.link')
        .populate('i20.link');
    if(!document) return {status:0};
    const filesObject = {};
    Object.keys(document.schema.paths).forEach((field) => {
        if(document.schema.paths[field].options.ref === 'File'){
            const statusField = field.split('.')[0]+'.status';
            const fieldValue = _.get(document, field);
            const statusValue = _.get(document, statusField);
            if(fieldValue){
                filesObject[field] = fieldValue;
                filesObject[statusField] = statusValue;
            } 
        }
    })
    filesObject['status'] = _.get(document, 'status');
    return filesObject;
}

exports.getAllDocuments = async () => {
    const document = await Document.find()
        .populate('receipt.link')
        .populate('ead.link')
        .populate('i983.link')
        .populate('i20.link');
    if(!document) throw 'Document not found';
    
    return document;
}