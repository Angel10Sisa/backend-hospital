const { DataTypes } = require ('sequelize');
const { db } = require ('../database/config');

const ConceptoSchema = db.define('Concepto',{
    concepto: {
        type: DataTypes.STRING,
        required: true
    }},
    {
        freezeTableName: true
    })

    module.exports = {
        ConceptoSchema
    }