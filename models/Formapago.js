const { DataTypes } = require ('sequelize');
const { db } = require ('../database/config');

const FormapagoSchema = db.define('Formapago',{
    formapago: {
        type: DataTypes.STRING,
        required: true
    }},
    {
        freezeTableName: true
    })

    module.exports = {
        FormapagoSchema
    }