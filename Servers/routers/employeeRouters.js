const express = require('express');
const multer = require('multer');
const {auth} = require('../middleware/auth');
const router = express.Router();
const { GetEmployeeProfiles } = require('../methods/employeeMethods');
const {createDoc, getDoc, getAllDocs, getDocByUser, updateDoc} = require('../methods/documentMethods');
const { RegistrationLink, ApplicationForms, GetAllPerson, GetAllRegistration, StoreApplications} = require('../methods/employeeMethods');

const storage = multer.memoryStorage();
const upload = multer({storage: storage});


router.get('/employees', GetEmployeeProfiles);
router.post('/uploadFile', auth, upload.single('file'), createDoc);
router.get('/doc', auth, getDoc);
router.get('/doc/:id', getDocByUser)
router.get('/docs',auth, getAllDocs);
router.post('/generate-token', RegistrationLink);
router.get('/applications/:userId', ApplicationForms);
router.get('/applications/', GetAllPerson);
router.put('/updateFile', updateDoc);
router.get('/registration', GetAllRegistration);
router.post('/registration', StoreApplications);
router.post('/UpdateApplications',auth, StoreApplications);
module.exports = router;