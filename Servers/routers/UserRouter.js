const express = require('express');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const router = express.Router();
const jwt = require('jsonwebtoken');
const multer = require('multer');
const Receipt = require('../models/optReceipt');
const upload = multer({ dest: 'uploads/' });
const PersonalInformation = require('../models/personalInformationSchema.js');
const WorkInformation = require('../models/workInformationSchema.js');
const ReferenceInfo = require('../models/referenceSchema.js');
const EmergencyContact = require('../models/emergencyContactSchema');
router.post('/register', async (req, res) => {
    try {
        const { username, password, email, type } = req.body;
        let user = await User.findOne({ email });
        if (user) {
            return res.status(409).json({ message: 'User already exists, please choose another email address.' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        user = new User({
            username,
            password: hashedPassword,
            email,
            type
        });

        await user.save();

        res.status(201).json({ message: 'Registration successful.' });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Server error.' });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        let user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials.' });
        }

        const payload = {
            user: {
                id: user._id,
                email: user.email
            }
        };
        const token = await jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: '30d'
        });

        res.status(200).json({ message: 'Login successful.', token: token });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Server error.' });
    }
});
router.post('/upload', upload.single('file'), async (req, res) => {
    try {
        const file = new Receipt({
            filename: req.file.originalname,
            contentType: req.file.mimetype,
            path: req.file.path
        });

        await file.save();
        res.status(201).send({ message: 'File uploaded successfully', file });
    } catch (error) {
        res.status(500).send({ message: 'Error uploading file', error });
    }
});

router.post('/saveData', async (req, res) => {
    try {
        const { personalInformation, workInformation, references} = req.body;

        const personalInfoDocument = new PersonalInformation(personalInformation);
        await personalInfoDocument.save()
            .then(doc => console.log('personalInfoDocument saved'))
            .catch(err => console.error('Error saving personalInfoDocument:', err));

        const workInfoDocument = new WorkInformation(workInformation);
        await workInfoDocument.save().then(doc => console.log('workInfoDocument saved'))
            .catch(err => console.error('Error saving workInfoDocument:', err));

        const referenceDocument = new ReferenceInfo(references.referenceWithUserId);
        await referenceDocument.save().then(doc => console.log('referenceDocuments saved'))
            .catch(err => console.error('Error saving referenceDocuments:', err));

        const savePromises = references.emergencyContactsWithUserId.map(contactData => {
            const emergencyContact = new EmergencyContact(contactData);
            return emergencyContact.save();
        });

        Promise.all(savePromises)
            .then(docs => {
                console.log('All emergency contacts saved');
            })
            .catch(err => {
                console.error('Error saving emergency contacts:', err);
            });

        res.status(200).json({ message: 'Data saved successfully' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Error saving data', error });
    }

});

module.exports = router;
