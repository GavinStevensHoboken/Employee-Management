const express = require('express');
const multer = require('multer');
const {auth} = require('../middleware/auth');
const router = express.Router();
const { GetEmployeeProfiles } = require('../methods/employeeMethods');
const {createDoc, getDoc, getAllDocs} = require('../methods/documentMethods');

const storage = multer.memoryStorage();
const upload = multer({storage: storage});


router.get('/employees', GetEmployeeProfiles);
router.post('/uploadFile', auth, upload.single('file'), createDoc);
router.get('/doc', auth, getDoc);
router.get('/docs',auth, getAllDocs);
module.exports = router;