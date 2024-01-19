const express = require('express');
const multer = require('multer');
const router = express.Router();
const { GetEmployeeProfiles } = require('../methods/employeeMethods');
const {createDoc} = require('../methods/documentMethods');
const upload = multer({dest: 'uploads/'});

router.get('/employees', GetEmployeeProfiles);
router.post('/uploadFile', upload.single('file'), createDoc);
module.exports = router;