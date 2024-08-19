const request = require('supertest');
const sequelize = require('../config/database');
const Course = require('../models/course');
const app = require('../app'); // assuming the app is in a separate file



describe('createCourse', () => {
    beforeAll(async () => {
        await sequelize.sync({ force: true }); // Synchronizes the database before all test cases

    });

    beforeEach(async () => {
        await Course.destroy({ where: {} }); // Cleans the database after each test
    });

    afterEach(() => {
        jest.restoreAllMocks(); // Restores all mocks to their original values
    });


    it('should create a new course successfully', async () => {
        const req = {
            body: {
                subject: 'Math',
                courseNumber: '101',
                description: 'Introduction to Mathematics'
            }
        };
        const res = await request(app).post('/course').send(req.body);
        expect(res.status).toBe(201);
        expect(res.body).toHaveProperty('id');
        expect(res.body).toHaveProperty('subject', 'Math');
        expect(res.body).toHaveProperty('courseNumber', '101');
        expect(res.body).toHaveProperty('description', 'Introduction to Mathematics');

        const createdCourse = await Course.findByPk(res.body.id);
        expect(createdCourse).not.toBeNull();
        expect(createdCourse.subject).toBe('Math');
        expect(createdCourse.courseNumber).toBe('101');
        expect(createdCourse.description).toBe('Introduction to Mathematics');
    });

    it('should return error for duplicate subject and course number', async () => {
        const req = {
            body: {
                subject: 'Math',
                courseNumber: '101',
                description: 'Introduction to Mathematics'
            }
        };
        await request(app).post('/course').send(req.body); // create a course first
        const res = await request(app).post('/course').send(req.body); // try to create another course with same subject and course number
        expect(res.status).toBe(400);
        expect(res.body).toHaveProperty('message', 'Subject and course number must be unique');
        expect(res.body).toHaveProperty('errors');


    });

    it('should return error for invalid course number', async () => {
        const req = {
            body: {
                subject: 'Math',
                courseNumber: '1234', // invalid course number (not 3-digit)
                description: 'Introduction to Mathematics'
            }
        };
        const res = await request(app).post('/course').send(req.body);
        expect(res.status).toBe(400);
        expect(res.body).toHaveProperty('message', 'Validation error');
        expect(res.body).toHaveProperty('errors');
    });

    it('should return error for validation error (missing required fields)', async () => {
        const req = {
            body: {
                subject: 'Math' // missing courseNumber and description
            }
        };
        const res = await request(app).post('/course').send(req.body);
        expect(res.status).toBe(400);
        expect(res.body).toHaveProperty('message', 'Validation error');
        expect(res.body).toHaveProperty('errors');
    });

    it('should return internal server error for unexpected errors', async () => {
        const req = {
            body: {
                subject: 'Math',
                courseNumber: '101',
                description: 'Introduction to Mathematics'
            }
        };
        jest.spyOn(Course, 'create').mockImplementation(() => {
            throw new Error('Unexpected error');
        });
        const res = await request(app).post('/course').send(req.body);
        expect(res.status).toBe(500);
        expect(res.body).toHaveProperty('message', 'Internal server error');
    });
});

describe('updateCourse', () => {

    beforeAll(async () => {
        await sequelize.sync({ force: true }); // Synchronizes the database before all test cases

    });

    beforeEach(async () => {
        await Course.destroy({ where: {} }); // Cleans the database after each test
    });
    afterEach(() => {
        jest.restoreAllMocks(); //Restores all mocks to their original values
    });

    it('should update a course successfully', async () => {
        const course = await Course.create({
            subject: 'Math',
            courseNumber: '101',
            description: 'Introduction to Mathematics'
        });

        const req = {
            params: {
                id: course.id
            },
            body: {
                subject: 'Math',
                courseNumber: '101',
                description: 'Introduction to Mathematics - Updated'
            }
        };

        const res = await request(app).put(`/course/${req.params.id}`).send(req.body);

        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('subject', 'Math');
        expect(res.body).toHaveProperty('courseNumber', '101');
        expect(res.body).toHaveProperty('description', 'Introduction to Mathematics - Updated');
    });

    it('should return error for course not found', async () => {

        const req = {
            params: {
                id: '100'
            },
            body: {
                subject: 'Math',
                courseNumber: '101',
                description: 'Introduction to Mathematics - Updated'
            }
        };

        const res = await request(app).put(`/course/${req.params.id}`).send(req.body);

        expect(res.status).toBe(404);
        expect(res.body).toHaveProperty('message', 'Course not found');
    });


    it('should return validation error for non-3-digit course number', async () => {
        const course = await Course.create({
            subject: 'Math',
            courseNumber: '101',
            description: 'Introduction to Mathematics'
        });

        const req = {
            params: {
                id: course.id
            },
            body: {
                subject: 'Math',
                courseNumber: '1234',
                description: 'Introduction to Mathematics - Updated'
            }
        };

        const res = await request(app).put(`/course/${req.params.id}`).send(req.body);

        expect(res.status).toBe(400);
        expect(res.body).toHaveProperty('message', 'Validation error');
        expect(res.body).toHaveProperty('errors');
    });

});

