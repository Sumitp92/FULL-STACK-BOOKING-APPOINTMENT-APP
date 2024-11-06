const Sequelize = require('sequelize');
const sequelize = require('../util/databases'); 

const BookingRec = sequelize.define('users', { 
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    phone: {
        type: Sequelize.STRING, 
        allowNull: false,
        unique: true, 
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
    },
}, {
    timestamps: true, 
});

module.exports = BookingRec;
