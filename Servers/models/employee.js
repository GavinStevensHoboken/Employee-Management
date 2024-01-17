const mongoose = require('mongoose');
const {Schema} = mongoose;

const employee = new Schema({
    name: {
        firstName: String,
        lastName: String,
        middleName: String,
        preferredName: String
    },
    profilePicture: String, 
    email: String,
    ssn: String, 
    dateOfBirth: Date,
    gender: String,
    address: {
        building: String,
        street: String,
        city: String,
        state: String,
        zip: String
    },
    contactInfo: {
        cellPhone: String,
        workPhone: String
    },
    employment: {
        visaTitle: String,
        startDate: Date,
        endDate: Date
    },
});

const Employee = mongoose.model('Employee', employee);
module.exports = Employee;