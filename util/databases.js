const Sequelize = require('sequelize');

const sequelize = new Sequelize('bookingappoitment', 'root', '876722', {
  dialect: 'mysql',  
  host: 'localhost'  
});

module.exports = sequelize;
