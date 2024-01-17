const express = require('express');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const router = express.Router();

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

module.exports = router;
