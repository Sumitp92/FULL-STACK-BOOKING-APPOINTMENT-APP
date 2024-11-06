const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../util/databases'); // Ensure the path to your database connection is correct

const BookingRec = sequelize.define('users', { // Define the model for bookings
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    phone: {
        type: DataTypes.STRING, // Changed to string to avoid number precision issues
        allowNull: false,
        unique: true, // If phone should be unique, keep this line; otherwise, remove it
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    timestamps: true, // Add timestamp fields like 'createdAt', 'updatedAt'
});

module.exports = BookingRec;
