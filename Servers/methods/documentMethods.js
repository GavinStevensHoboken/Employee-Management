const {createFile, addDocument} = require('../services/visaMangeService')

const createDoc = async (req,res) => {
    try{
        if(!req.file) throw "document not uploaded!"
        const {userId, documentType} = req.body; // type:receipt/ead/i983/i20
        const fileId = await createFile(req.file.buffer,req.file.mimetype);
        await addDocument(userId, documentType, fileId);
    }catch(err){
        console.log(err);
        res.status(500).json({message: 'Upload file failed'});
    }
    
}

module.exports = {
    createDoc};