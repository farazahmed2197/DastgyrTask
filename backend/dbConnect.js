const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('dastgyr', 'root', '12345', {
    host: 'localhost',
    dialect: 'mysql'
  });

module.exports = sequelize;