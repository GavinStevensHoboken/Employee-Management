const {createFile, addDocument, getDocumentByEmployee, getAllDocuments, updateDocumentByEmployee} = require('../services/visaMangeService')

const createDoc = async (req,res) => {
    try{
        if(!req.file) throw "document not uploaded!"
        const userId = req.user.id
        const fileData = req.file.buffer;
        const {documentType} = {documentType:req.type} // type:receipt/ead/i983/i20, get from frontend in body
        const fileId = await createFile(fileData,req.file.mimetype);
        await addDocument(userId, documentType, fileId);
        res.status(201).json({ message: 'upload successfully!' });
    }catch(err){
        console.log(err);
        res.status(500).json({message: 'Upload file failed'});
    }
    
}
const getDoc = async (req,res) => {
    try{
        if(!req.auth) throw "Please login";
        const userId = req.user.id
        const document = await getDocumentByEmployee(userId);
        if(!document) throw "File not found"
        res.json(document);
    }catch(err){
        console.log(err);
        res.status(500).json({message: err});
    }
    
}
const getAllDocs = async (req,res) => {
    try{
        if(!req.auth) throw "Please login";
        const documents = await getAllDocuments();
        if(!documents) throw "Documents not found"
        res.json(documents);
    }catch(err){
        console.log(err);
        res.status(500).json({message: err});
    }
    
}

//试验点
const updateDoc = async(req, res) => {
    try{
        if(!req.auth) throw "Please login";
        const {employeeId, docType, status, feedback} = req.body;
        const msg = await updateDocumentByEmployee(employeeId, docType, status, feedback);
        res.status(201).json({message: msg});
    }catch(err){
        console.log(err);
        res.status(500).json({message: err});
    }
}

module.exports = {
    createDoc,
    getDoc,
    getAllDocs,
    updateDoc
};