const { DataTypes} = require('sequelize');
const { db } = require('../database/config');
const { ProductoSchema } = require('../models/Producto');

const InsumoSchema = db.define('Insumo',{
    producto: {
        type: DataTypes.INTEGER,
        required: true,
        references:{
            model: ProductoSchema,
            key:'id'
        }
    },
    productoinsumo: {
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
    }},
    {
    freezeTableName: true
    })

   
    module.exports={
        InsumoSchema
    }