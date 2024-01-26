const express = require('express');
const multer = require('multer');
const {auth} = require('../middleware/auth');
const router = express.Router();
const { GetEmployeeProfiles, GetWorkDataByUser } = require('../methods/employeeMethods');
const {createDoc, getDoc, getAllDocs, getDocByUser, updateDoc} = require('../methods/documentMethods');
const { RegistrationLink, ApplicationForms, GetAllPerson, GetAllProfilesForHr, GetAllRegistration, StoreApplications, UpdateApplications, SendNotification} = require('../methods/employeeMethods');

const storage = multer.memoryStorage();
const upload = multer({storage: storage});


router.get('/employees',auth, GetEmployeeProfiles);
router.post('/uploadFile', auth, upload.single('file'), createDoc);
router.get('/doc', auth, getDoc);
router.get('/doc/:id', getDocByUser)
router.get('/docs', getAllDocs);
router.post('/generate-token', auth, RegistrationLink);
router.get('/applications/:userId', auth, ApplicationForms);
router.get('/applications/', auth, GetAllPerson);
router.put('/updateFile', auth, updateDoc);
router.get('/allvisastatus', auth, GetAllProfilesForHr);
router.get('/registration',auth, GetAllRegistration);
router.post('/registration',auth, StoreApplications);
router.get('/workdata/:id',auth, GetWorkDataByUser);
router.post('/UpdateApplications',auth, UpdateApplications);
router.post('/sendnotification', auth, SendNotification);
module.exports = router;