const CourseController = require('../controllers/course');
const express = require('express');
const router = express.Router();

router.get('/', CourseController.getAllCourses);

router.get('/filter', CourseController.getCoursesByDescription);

router.get('/:id', CourseController.getCourseById);

router.post('/', CourseController.createCourse);

router.put('/:id', CourseController.updateCourse);

router.delete('/:id', CourseController.deleteCourse);

module.exports = router;