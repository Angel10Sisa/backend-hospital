const { DataTypes} = require('sequelize');
const { db } = require('../database/config');
const { TipoproductoSchema } = require('../models/Tipoproducto');

const ProductoSchema = db.define('Producto',{
    nombre: {
        type: DataTypes.STRING,
        required: true
    },
    tipoproducto: {
        type: DataTypes.INTEGER,
        required: true,
        references:{
            model: TipoproductoSchema,
            key:'id'
        }
    },
    propiedad: {
        type: DataTypes.STRING,
        required: true
    },
    codigo: {
        type: DataTypes.STRING,
        required: true
    },
    fechavencimiento: {
        type: DataTypes.DATE,
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
    stockmaximo: {
        type: DataTypes.INTEGER,
        required: true
    },
    stockminimo: {
        type: DataTypes.INTEGER,
        required: true
    },
    preciototalcompra: {
        type: DataTypes.DOUBLE,
        required: true
    },
    preciototalventa: {
        type: DataTypes.DOUBLE,
        required: true
    },
    identificador: {
        type: DataTypes.STRING,
        required: true
    },
    descripcion: {
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

    ProductoSchema.hasMany(TipoproductoSchema,{foreignKey:'id', sourceKey:'tipoproducto'});
    TipoproductoSchema.belongsTo(ProductoSchema,{foreignKey:'tipoproducto', sourceKey:'id'});

    module.exports={
        ProductoSchema
    }