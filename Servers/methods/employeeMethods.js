const Employee = require('../models/employee');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const Application = require('../models/Token');
const PersonalInformation = require('../models/personalInformationSchema');
const WorkInformation = require('../models/workInformationSchema');
const EmergencyContact = require('../models/emergencyContactSchema');
const ReferenceInfo = require('../models/referenceSchema');
const User = require('../models/User');
const {getAllProfiles} = require('../services/profileService');

const jwt = require('jsonwebtoken');
const { lte } = require('lodash');



const GetEmployeeProfiles = async (req, res) => {
    try {
        const employees = await Employee.find();
        res.json(employees);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({message: 'Server Side Error'})
    }
};


function generateToken() {
    return crypto.randomBytes(20).toString('hex');
}

async function storeToken(email, token) {
    try {
        const expiryTime = new Date();
        expiryTime.setHours(expiryTime.getHours() + 3);

        const updateData = {
            token: token,
            createDate: new Date(),
            tokenExpires: expiryTime
        };

        await Application.findOneAndUpdate({ email: email }, updateData);
    } catch (error) {
        console.error(error.message);
    }
}
const StoreApplications = async (req, res) => {
    try {
        const { email, name } = req.body;
        const applicationData = {
            name: name,
            email: email,
        };
        await new Application(applicationData).save();
        res.json('Stored successfully')
    } catch (error) {
        console.error(error.message);
    }
}


const RegistrationLink = async (req, res) => {
    const { email, name } = req.body;
    const token = await generateToken();

    storeToken(email, token);

    let transporter = nodemailer.createTransport({
        service: 'gmail', 
        secure: false,
        auth: {
            user: 'thytaohuiyu@gmail.com',
            pass: 'itsw jlsi wtww ftak'
        }
    });

    const registrationLink = `http://localhost:3000/register`;
    let mailOptions = {
        from: 'thytaohuiyu@gmail.com',
        to: email,
        subject: 'Registration Token',
        text: `Hello ${name},\n\nYour registration Link is: ${registrationLink}\n\nThis token is valid for 3 hours.`
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).send('Token sent to email.');
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).send('Error sending token.');
    }
}

const ApplicationForms = async (req, res) => {
    
    try {
        const userId = req.params.userId;
        const personalData = await PersonalInformation.findOne({ userId: userId });
        const workData = await WorkInformation.findOne({ userId: userId });
        const referenceData = await ReferenceInfo.findOne({ userId: userId });
        const emergencyContactData = await EmergencyContact.findOne({ userId: userId});

        res.json({
            personal: personalData,
            work: workData,
            reference: referenceData,
            emergencyContact: emergencyContactData,
        });
    } catch (error) {
        res.status(500).send('Error retrieving application data');
    }
}

const GetAllProfilesForHr = async (req, res) => {
    //获取所有员工资料：visaStatus页面用
    try{
        const employees = await getAllProfiles();
        res.status(201).json(employees);
    }catch (error){
        res.status(500).send('Fail to fetch employees list');
    }
}

const GetAllPerson = async (req, res) => {
    try {
        const filter = req.query.filter;
        if(filter){
            const users = await User.find({ applyStatus: filter });
            const userIds = users.map(user => user._id);
            const personalData = await PersonalInformation.find({
                userId: { $in: userIds }
            });
            res.json(personalData);
        }else{
            const personalData = await PersonalInformation.find();
            res.json(personalData);
        }
        

    } catch (error) {
        res.status(500).send('Error retrieving personal data');
    }
}

const GetAllRegistration = async (req, res) => {
    try {
        const applicationData = await Application.find();
        res.json(applicationData);
    } catch (error) {
        res.status(500).send('Error retrieving personal data');
    }
}

module.exports = {
    GetEmployeeProfiles,
    RegistrationLink,
    ApplicationForms,
    GetAllProfilesForHr,
    GetAllPerson,
    GetAllRegistration,
    StoreApplications
};