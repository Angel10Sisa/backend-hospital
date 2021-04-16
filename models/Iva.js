const { DataTypes } = require ('sequelize');
const { db } = require ('../database/config');

const IvaSchema = db.define('Iva',{
    iva: {
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
        IvaSchema
    }