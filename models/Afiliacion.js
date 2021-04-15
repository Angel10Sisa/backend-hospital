const { DataTypes } = require ('sequelize');
const { db } = require ('../database/config');

const AfiliacionSchema = db.define('Afiliacion',{
    afiliacion: {
        type: DataTypes.STRING,
        required: true
    },
    descuento: {
        type: DataTypes.INTEGER,
        required: true
    },
    valor: {
        type: DataTypes.DOUBLE,
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
        AfiliacionSchema
    }