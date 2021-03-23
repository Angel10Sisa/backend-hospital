const { DataTypes } = require('sequelize');
const { db } = require ('../database/config');

const PaisSchema = db.define('Pais', {
    pais: {
        type: DataTypes.STRING,
        require: true
    }},
    {
    freezeTableName: true
    });

module.exports = {
    PaisSchema
}