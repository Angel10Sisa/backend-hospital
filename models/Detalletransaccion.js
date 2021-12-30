const { DataTypes} = require('sequelize');
const { db } = require('../database/config');
const { ProductoSchema } = require('../models/Producto');
const { TransaccionSchema } = require('../models/Transaccion');

const DetalletransaccionSchema = db.define('Detalletransaccion',{
    transaccion: {
        type: DataTypes.INTEGER,
        required: true,
        references:{
            model: TransaccionSchema,
            key:'id'
        }
    },
    producto: {
        type: DataTypes.INTEGER,
        required: true,
        references:{
            model: ProductoSchema,
            key:'id'
        }
    },
    cantidad: {
        type: DataTypes.INTEGER,
        required: true
    },
    nombreproducto: {
        type: DataTypes.TEXT,
        required: true
    }},
    {
    freezeTableName: true
    })

   
    module.exports={
        DetalletransaccionSchema
    }