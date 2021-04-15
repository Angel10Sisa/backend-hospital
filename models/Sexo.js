const { DataTypes } = require ('sequelize');
const { db } = require ('../database/config');

const SexoSchema = db.define('Sexo',{
    sexo: {
        type: DataTypes.STRING,
        required: true
    }},
    {
        freezeTableName: true
    })

    module.exports = {
        SexoSchema
    }