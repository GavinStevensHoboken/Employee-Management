const Employee = require('../models/employee');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const Token = require('../models/Token');
const jwt = require('jsonwebtoken');



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

        const tokenData = {
            email: email,
            token: token,
            createDate: new Date(),
            expiresDate: expiryTime
        };

        await new Token(tokenData).save();
    } catch (error) {
        console.error(error.message);
    }
}

const RegistrationLink = async (req, res) => {
    // const { email, name } = req.body;
    const email = 'huiyutao@umass.edu';
    const name = 'huiyutao';
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

    const registrationLink = `https://yourdomain.com/registration?token=${encodeURIComponent(token)}&email=${encodeURIComponent(email)}`;
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

module.exports = {
    GetEmployeeProfiles,
    RegistrationLink
};