const Course = require('../models/Course')

async function getCourse(req, res) {
    try {
        const course = await Course.findById(req.params.id).populate('books')

        if (!course) {
            return res.status(404).json({ success: false, message: 'Course not found' })
        }

        res.status(200).json({
            success: true,
            data: course
        })
    } catch (err) {
        console.log(err.message)
        res.status(400).json({ success: false, error: "Server error" })
    }
}

module.exports = { getCourse }