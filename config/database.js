const { Sequelize } = require('sequelize');
const dotenv = require('dotenv').config();

//The database must be configured in a file defined in the .env file

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: dotenv.parsed.DB_PATH
  });


module.exports = sequelize;