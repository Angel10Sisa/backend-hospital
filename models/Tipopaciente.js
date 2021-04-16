const { DataTypes } = require ('sequelize');
const { db } = require ('../database/config');

const TipopacienteSchema = db.define('Tipopaciente',{
    tipopaciente: {
        type: DataTypes.STRING,
        required: true
    }},
    {
        freezeTableName: true
    })

    module.exports = {
        TipopacienteSchema
    }