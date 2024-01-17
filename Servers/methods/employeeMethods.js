const Employee = require('../models/employee');
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

module.exports = {
    GetEmployeeProfiles
};