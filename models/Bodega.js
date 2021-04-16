const { DataTypes } = require ('sequelize');
const { db } = require ('../database/config');

const BodegaSchema = db.define('Bodega',{
    nombre: {
        type: DataTypes.STRING,
        required: true
    },
    sede: {
        type: DataTypes.STRING,
        required: true
    },
    estado: {
        type: DataTypes.BOOLEAN,
        required: true
    }},
    {
        freezeTableName: true
    })

    module.exports = {
        BodegaSchema
    }