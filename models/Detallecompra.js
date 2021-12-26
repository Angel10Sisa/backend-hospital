const { DataTypes} = require('sequelize');
const { db } = require('../database/config');
const { CompraSchema } = require('../models/Compra');
const { ProductoSchema } = require('../models/Producto');


const DetallecompraSchema = db.define('Detallecompra',{
    compra: {
        type: DataTypes.INTEGER,
        required: true,
        references:{
            model: CompraSchema,
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
    preciounitario: {
        type: DataTypes.DOUBLE,
        required: true
    },
    total: {
        type: DataTypes.DOUBLE,
        required: true
    },
    nombreproducto: {
        type: DataTypes.STRING,
        required: true
    }},
    {
    freezeTableName: true
    })

   
    module.exports={
        DetallecompraSchema
    }