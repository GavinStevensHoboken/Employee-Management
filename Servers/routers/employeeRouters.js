const express = require('express');
const router = express.Router();
const { GetEmployeeProfiles } = require('../methods/employeeMethods')

router.get('/employees', GetEmployeeProfiles);

module.exports = router;