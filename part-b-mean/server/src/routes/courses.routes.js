const express = require('express');
const router = express.Router();
const { getCourse } = require('../controllers/courses.controller');

router.get('/:id', validateCourseQuery, getCourses);
router.get('/', validateCourseQuery, getCourseById);

module.exports = router;