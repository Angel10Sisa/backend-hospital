const { DataTypes} = require('sequelize');
const { db } = require('../database/config');
const { ProductoSchema } = require('../models/Producto');
const { ProveedorSchema } = require('../models/Proveedor');


const ProductoproveedorSchema = db.define('Productoproveedor',{
    producto: {
        type: DataTypes.INTEGER,
        required: true,
        references:{
            model: ProductoSchema,
            key:'id'
        }
    },
    proveedor: {
        type: DataTypes.INTEGER,
        required: true,
        references:{
            model: ProveedorSchema,
            key:'id'
        }
    }},
    {
    freezeTableName: true
    })

   
    module.exports={
        ProductoproveedorSchema
    }