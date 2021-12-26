const { DataTypes} = require('sequelize');
const { db } = require('../database/config');
const { BodegaSchema } = require('../models/Bodega');
const { ProductoSchema } = require('../models/Producto');

const ProductobodegaSchema = db.define('Productobodega',{
    bodega: {
        type: DataTypes.INTEGER,
        required: true,
        references:{
            model: BodegaSchema,
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
    codigoproducto: {
        type: DataTypes.STRING,
        required: true
    },
    nombreproducto: {
        type: DataTypes.STRING,
        required: true
    },
    propiedadproducto: {
        type: DataTypes.STRING,
        required: true
    },
    stockminimo: {
        type: DataTypes.INTEGER,
        required: true
    },
    stock: {
        type: DataTypes.INTEGER,
        required: true
    },
    preciocompra: {
        type: DataTypes.DOUBLE,
        required: true
    },
    precioventa: {
        type: DataTypes.DOUBLE,
        required: true
    },
    valortotal: {
        type: DataTypes.DOUBLE,
        required: true
    },
    fechacaducidad: {
        type: DataTypes.DATE,
        required: true
    }},
    {
    freezeTableName: true
    })
   
    module.exports={
        ProductobodegaSchema
    }