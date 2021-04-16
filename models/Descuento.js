const { DataTypes } = require ('sequelize');
const { db } = require ('../database/config');

const DescuentoSchema = db.define('Descuento',{
    nombre: {
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
    }},
    {
        freezeTableName: true
    })

    module.exports = {
        DescuentoSchema
    }