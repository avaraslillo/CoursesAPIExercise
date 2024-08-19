const Course = require('../models/course');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

//This function returns all the courses
const getAllCourses = async (req, res) => {
    try {
        const courses = await Course.findAll();
        if(courses.length === 0){
            return res.status(404).json({
                message: 'No courses found'
            });
        }
        return res.json(courses);
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Internal server error'});
    }
}

//This function returns all the courses that match the description
const getCoursesByDescription = async (req, res) => {
    const query = req.query;

    if(!query){
        return res.status(400).json({
            message: 'Course description is required'
        });
    }
    
    try {

        const description = query.description;
        
        const courses = await Course.findAll({
            where: {description: {[Op.like]: `%${description}%`}}
        });
        if(courses.length === 0){
            return res.status(404).json({
                message: 'No courses found'
            });
        }
        return res.json(courses);
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Internal server error'});
    }
}

//This function returns a course by the corresponding id (primary key)
const getCourseById = async (req, res) => {
    try {
        const course = await Course.findByPk(req.params.id);
        if (course) {
            return res.json(course);
        } else {
            return res.status(404).json({
                message: 'Course not found'
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Internal server error'});
    }
}


/*This function creates a new course, and throws errors if the subject and course number are not unique,
or if the course number is not a 3-digit number*/
const createCourse = async (req, res) => {
    try {
        const course = await Course.create(req.body);
        return res.status(201).json(course);
    } catch (error) {
        console.log(error);
        if(error.name === 'SequelizeUniqueConstraintError'){
            return res.status(400).json({
                message: 'Subject and course number must be unique',
                errors: error.errors.map(e => e.message)
            });
        }
        else if(error.name === 'SequelizeValidationError'){
            return res.status(400).json({
                message: 'Validation error',
                errors: error.errors.map(e => e.message)
            });
        }
        else{
            return res.status(500).json({
                message: 'Internal server error'});
        }

    }
}

/*This function updates a course, and throws errors if the subject and course number are not unique,
or if the course number is not a 3-digit number*/
const updateCourse = async (req, res) => {
    try {
        const course = await Course.findByPk(req.params.id);
        if (course) {
            await course.update(req.body);
            return res.json(course);
        } else {
            return res.status(404).json({
                message: 'Course not found'
            });
        }
    } catch (error) {
        console.log(error);
        if(error.name === 'SequelizeUniqueConstraintError'){
            return res.status(400).json({
                message: 'Subject and course number must be unique',
                errors: error.errors.map(e => e.message)
            });
        }
        else if(error.name === 'SequelizeValidationError'){
            return res.status(400).json({
                message: 'Validation error',
                errors: error.errors.map(e => e.message)
            });
        }
        else{
            return res.status(500).json({
                message: 'Internal server error'});
        }
    }
}

/*This function deletes a course*/
const deleteCourse = async (req, res) => {
    try {
        const course = await Course.findByPk(req.params.id);
        if (course) {
            await course.destroy();
            return res.status(200).json({
                message: 'Course deleted'});
        } else {
            return res.status(404).json({
                message: 'Course not found'
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Internal server error'});
    }
}



module.exports = {
    getAllCourses,
    getCourseById,
    getCoursesByDescription,
    createCourse,
    updateCourse,
    deleteCourse
}