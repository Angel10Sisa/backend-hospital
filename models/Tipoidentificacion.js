const { DataTypes } = require ('sequelize');
const { db } = require ('../database/config');

const TipoidentificacionSchema = db.define('Tipoidentificacion',{
    tipo:{
        type: DataTypes.STRING,
        required: true
    }},
    {
        freezeTableName: true
    })

    module.exports = {
        TipoidentificacionSchema
    }