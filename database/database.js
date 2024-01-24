const seq = require('sequelize');

const connection = new seq('pergo', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306
})

module.exports = connection;