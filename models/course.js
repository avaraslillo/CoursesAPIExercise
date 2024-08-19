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
        allowNull: false
    },
    courseNumber:{
        type: DataTypes.STRING,
        size: 3,
        allowNull: false,
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
  },{indexes: [
    {
      unique: true,
      fields: ['subject', 'courseNumber']
    }
  ]});



module.exports = Course