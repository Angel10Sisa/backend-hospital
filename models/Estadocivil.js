const { DataTypes } = require ('sequelize');
const { db } = require ('../database/config');

const EstadocivilSchema = db.define('Estadocivil',{
    estadocivil: {
        type: DataTypes.STRING,
        require: true
    }},
    {
        freezeTableName: true
    })

    module.exports = {
        EstadocivilSchema
    }