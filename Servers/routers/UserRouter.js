const express = require('express');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const router = express.Router();
const jwt = require('jsonwebtoken');

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

module.exports = router;
