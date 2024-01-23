const express = require('express');
const multer = require('multer');
const {auth} = require('../middleware/auth');
const router = express.Router();
const { GetEmployeeProfiles } = require('../methods/employeeMethods');
const {createDoc, getDoc, getAllDocs, updateDoc} = require('../methods/documentMethods');

const storage = multer.memoryStorage();
const upload = multer({storage: storage});


router.get('/employees', GetEmployeeProfiles);
router.post('/uploadFile', auth, upload.single('file'), createDoc);
router.get('/doc', auth, getDoc);
router.get('/docs',auth, getAllDocs);
router.put('/updateFile', updateDoc);
module.exports = router;