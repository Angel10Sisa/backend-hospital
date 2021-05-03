const { DataTypes} = require('sequelize');
const { db } = require('../database/config');
const { BodegaSchema } = require('../models/Bodega');
const { ProductoSchema } = require('../models/Producto');
const { VentaSchema } = require('../models/Venta');

const DetalleventaSchema = db.define('Detalleventa',{
    venta: {
        type: DataTypes.INTEGER,
        required: true,
        references:{
            model: VentaSchema,
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
    bodega: {
        type: DataTypes.INTEGER,
        required: true,
        references:{
            model: BodegaSchema,
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
    }},
    {
    freezeTableName: true
    })

   
    module.exports={
        DetalleventaSchema
    }