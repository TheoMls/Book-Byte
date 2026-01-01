const Course = require('../models/Course')

async function getCourses(req, res) {
    try {
        const filters = req.courseFilters || {};
        const courses = await Course.find(filters)
            .populate('category', 'name');
        res.status(200).json({
            success: true,
            data: courses
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
}

// Get course by ID occures when we see course details page
async function getCourseById(req, res) {
    try {
        const course = await Course.findById(req.params.id)
            .populate('category', 'name')
            .populate({
                path: 'books',
                select: 'title description coverImage'
            });
        if (!course) {
            return res.status(404).json({
                success: false,
                message: 'Course not found'
            });
        }
        res.status(200).json({
            success: true,
            data: course
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
}

module.exports = {
    getCourses,
    getCourseById
}