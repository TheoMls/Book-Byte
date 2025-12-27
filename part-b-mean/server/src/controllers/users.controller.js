const User = require('../models/User')

async function registerUser(req, res) {
    try {
        const { fname, lname, email, password, dateOfBirth, skillLevel, categoriesInterested } = req.body

        // Calculate Age
        const age = Date.now() - new Date(dobInput).getTime()

        // (365.25 days (.25 due to 1/4 leap years) * 24 hours * 60 min * 60 sec * 1000 ms)
        const msInYear = 365.25 * 24 * 60 * 60 * 1000

        if (age < 16 * msInYear || age > 120 * msInYear) {
            return res.status(400).json({
                success: false,
                message: `Registration failed. Age must be between 16 and 120 years old. (Current age: ${Math.round(age / msInYear)})`
            })
        }
        // Create user if validation passes
        const user = await User.create({
            fname,
            lname,
            email,
            password,
            dateOfBirth,
            skillLevel,
            categoriesInterested
        })

        res.status(201).json({
            success: true,
            data: user
        })

    } catch (err) {
        console.log(err.message)
        res.status(400).json({ success: false, error: "Server error" })
    }
}

module.exports = { registerUser }