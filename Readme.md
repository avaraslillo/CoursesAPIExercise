# Courses API

This project is a simple API developed with Express.js and SQLite for managing a list of courses. The API allows users to perform CRUD operations (Create, Read, Update, Delete) on courses, including adding new courses, retrieving all courses, updating course information, and deleting courses.

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
    git clone https://github.com/yourusername/courses-api.git
    ```

2. Navigate to the project directory:

    ```bash
    cd courses-api
    ```

3. Install the dependencies:

    ```bash
    npm install
    ```

4. Set up the SQLite database:

    ```bash
    npm run setup-db
    ```

5. Start the server:

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

After installing the dependencies and setting up the database, you can start the API server using the command:

```bash
npm start