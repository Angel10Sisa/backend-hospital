const { Sequelize } = require('sequelize');

const db = new Sequelize (process.env.ODB_DATABASE, process.env.ODB_USER, process.env.ODB_PASSWORD, {
    host: process.env.ODB_HOST,
    dialect: process.env.ODB_DIALECT
});

module.exports = {
    db
}