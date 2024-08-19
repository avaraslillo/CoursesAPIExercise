# Courses API

This project is a simple API developed with Express.js and SQLite for managing a list of courses. The API allows users to perform CRUD operations (Create, Read, Update, Delete) on courses, including adding new courses, retrieving all courses, retrieving courses by id and description, updating course information, and deleting courses.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Database Schema](#database-schema)
- [Error Handling](#error-handling)
- [License](#license)

## Installation

To get started with this project, follow these steps:

1. Clone the repository:

    ```bash
    git clone https://github.com/avaraslillo/CoursesAPIExercise
    ```

2. Navigate to the project directory:

    ```bash
    cd CoursesAPIExercise
    ```

3. Install the dependencies:

    ```bash
    npm install
    ```

4. Setup a file for an SQLite database    

5. Start the server. The SQLite database will synchronize automatically with the Sequelize ORM:

    ```bash
    npm start
    ```

The API will be running on `http://localhost:3000`.

## Usage

### Prerequisites

- [Node.js](https://nodejs.org/) (v14.x or higher)
- [npm](https://www.npmjs.com/) (v6.x or higher)
- [SQLite3](https://www.sqlite.org/index.html)

### Running the API

After installing the dependencies, you can start the API server using the command:

```bash
npm start
```

You can interact with the API using tools like Postman or curl.

## API Endpoints

### getAllCourses

This endpoint retrieves all available courses. It can be accessed with the following URL (using GET method): http://localhost:3000/course

### getCoursesByDescription

This endpoint retrieves all available courses whose descriptions matches at least partially with the term sent. It can be accessed with the following URL (using GET method): http://localhost:3000/course/filter?description={$term}, with $term being a personalized parameter defined by the user.

### getCoursesByID

This endpoint retrieves a single course that matches with the ID sent as a parameter. It can be accessed with the following URL (using GET method): http://localhost:3000/course/{$id}, with $id being defined by the user.

### createCourse

This endpoint creates a new course with the following parameters (all of them mandatory): subject, courseNumber, and description. Both subject and courseNumber must be unique, and courseNumber must be a 3-digit number with leading zeros. It can be accessed with the following URL (using POST method): http://localhost:3000/course

### updateCourse

This endpoint updates an existing course with the following parameters (all of them mandatory): subject, courseNumber, and description. Both subject and courseNumber must be unique, and courseNumber must be a 3-digit number with leading zeros. It can be accessed with the following URL (using PUT method): http://localhost:3000/course/{$id}, with $id being the ID of the course that must be updated.

### deleteCourse

This endpoint deletes an already existing course. It can be accessed with the following URL (using DELETE method): http://localhost:3000/course/{$id}, with $id being the ID of the course that must be deleted.

## Error handling

The API includes basic error handling:

- 404 Not Found: If a requested course is not found.
- 400 Bad Request: If required fields are missing or invalid in the request body.
- 500 Internal Server Error: For unexpected errors on the serve

## Unit testing

This API includes unit testing for creation and updating of courses. These tests can be executed using the command:

```bash
npx jest
```