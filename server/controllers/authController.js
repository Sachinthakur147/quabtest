const User = require('../models/User');
const { generateToken } = require('../config/jwt');

exports.register = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const user = await User.create({ username, email, password });
        res.status(201).json({ message: 'User registered', token: generateToken(user.id, user.role) });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        res.json({ token: generateToken(user.id, user.role) });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
