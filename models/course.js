const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

//The model for the course table has a unique constraint in order to avoid duplicate subjects and courses numbers

Course = sequelize.define('Course', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    subject:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    courseNumber:{
        type: DataTypes.STRING(3),
        allowNull: false,
        unique: true,
        //This is the validation function to only allow 3 digit numbers with leading zeros
        validate: {
            isThreeDigitNumber(value) {
                if(!(/^\d{3}$/.test(value))) {
                    throw new Error('Course number must be a 3-digit number with leading zeros')
                }
            }
        }
    },
    description:{
        type: DataTypes.STRING,
        allowNull: true
    }
  });



module.exports = Course