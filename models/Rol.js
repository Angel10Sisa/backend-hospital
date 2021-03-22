const { DataTypes } = require('sequelize');
const { db } = require('../database/config');

const RolSchema = db.define('Rol', {
    rol: {
        type: DataTypes.STRING,
        required: true
    },
    descripcion: {
        type: DataTypes.STRING,
        required: true
    }},
    {
    freezeTableName: true
    });



module.exports = {
    RolSchema
}