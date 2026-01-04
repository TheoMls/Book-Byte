const User = require('../models/User')
const asyncHandler = require('express-async-handler');

// Register a new user
const register = asyncHandler(async (req, res, next) => {
    const { fname, lname, email, password, dateOfBirth, skillLevel, categoriesInterested } = req.body;

    const user = await User.create({
        fname,
        lname,
        email,
        password,
        dateOfBirth,
        skillLevel,
        categoriesInterested
    });
    res.status(201).json({
        success: true,
        data: {
            id: user._id,
            fname: user.fname,
            lname: user.lname,
            email: user.email,
        }
    });
});

// Login user
const login = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password');

    if (!user || !(await user.matchPassword(password))) {
        const error = new Error('Invalid credentials');
        error.statusCode = 401;
        return next(error);
    }

    res.status(200).json({
        success: true,
        data: { id: user._id, fname: user.fname, email: user.email }
    });
});

module.exports = { register, login };