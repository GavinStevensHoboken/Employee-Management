const Document = require('../models/Document');
const File = require('../models/File');
const User = require('../models/User');
const _ = require('lodash');

const visas = {1:'receipt',2:'ead',3:'i983',4:'i20'}; // mapping type number with visa
// const approalStatus = {0:'new',1:'approved',2:'submitted',3:'rejected'};
// nextStep: 0:没下一步了,1:receipt,2:ead,3:i983,4:i20,5:wait for approve

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
        const newDoc = new Document({employee: employeeId, [`${visas[1]}.link`]: fileId, [`${visas[1]}.status`]: 2, status:0, nextStep: 5}); //staus 0:最后一步未通过，1: 全部通过
        await newDoc.save();
    } else{
        Document.findOneAndUpdate(
            {employee: employeeId},
            {$set: {[`${visas[documentType]}.link`]: fileId, [`${visas[documentType]}.status`]:2, nextStep: 5}}, //${visas[documentType]}.status: {0:'new',1:'approved',2:'submitted',3:'rejected'};

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
//试验点
exports.updateDocumentByEmployee = async (employeeId, docType, status, feedback) => { //传进来的status1为同意，2为拒绝
    const document = await Document.findOne({employee:employeeId});
    let result;
    if(docType === 4 && status === 1){
        Document.findOneAndUpdate(
            {employee: employeeId},
            {$set: {[`${visas[docType]}.status`]:1},status:1, nextStep: 0}, //${visas[documentType]}.status: {0:'new',1:'approved',2:'submitted',3:'rejected'};
            {new: true}
        ).populate('employee')
         .exec()
         .then((updatedDoc) => {
            console.log(updatedDoc);
            return 'approved';
         })
         .catch((err) => {
            throw err;
         });

         result = User.findOneAndUpdate(
            {_id: employeeId},
            {$set: {feedback: feedback}}, 
            {new: true}
        ).exec()
         .then((updatedDoc) => {
            console.log(updatedDoc);
            return 'rejected';
         })
         .catch((err) => {
            throw err;
         });
    return result;
    }
    if(docType !== 4 && status === 1){
        Document.findOneAndUpdate(
            {employee: employeeId},
            {$set: {[`${visas[docType]}.status`]:1, nextStep:docType+1}}, //${visas[documentType]}.status: {0:'new',1:'approved',2:'submitted',3:'rejected'};
            {new: true}
        ).populate('employee')
         .exec()
         .then((updatedDoc) => {
            console.log(updatedDoc);
            return 'approved';
         })
         .catch((err) => {
            throw err;
         });

         result = User.findOneAndUpdate(
            {_id: employeeId},
            {$set: {feedback: feedback}}, 
            {new: true}
        ).exec()
         .then((updatedDoc) => {
            console.log(updatedDoc);
            return 'rejected';
         })
         .catch((err) => {
            throw err;
         });
         
         return result;
    }
    if(status === 2) {
        Document.findOneAndUpdate(
            {employee: employeeId},
            {$set: {[`${visas[docType]}.status`]:3}, feedback: feedback}, //${visas[documentType]}.status: {0:'new',1:'approved',2:'submitted',3:'rejected'};
            {new: true}
        ).populate('employee')
         .exec()
         .then((updatedDoc) => {
            console.log(updatedDoc);
            return 'rejected';
         })
         .catch((err) => {
            throw err;
         });
         result = User.findOneAndUpdate(
            {_id: employeeId},
            {$set: {feedback: feedback}}, 
            {new: true}
        ).exec()
         .then((updatedDoc) => {
            console.log(updatedDoc);
            return 'rejected';
         })
         .catch((err) => {
            throw err;
         });
        return result;
    }
}