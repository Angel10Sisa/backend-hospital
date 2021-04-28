const { DataTypes} = require('sequelize');
const { db } = require('../database/config');
const { BodegaSchema } = require('./Bodega');
const { ConceptoSchema } = require('./Concepto');
const { DescuentoSchema } = require('./Descuento');
const { IvaSchema } = require('./Iva');
const { ProveedorSchema } = require('./Proveedor');

const CompraSchema = db.define('Compra',{
    fecha: {
        type: DataTypes.DATE,
        required: true
    },
    documento: {
        type: DataTypes.STRING,
        required: true
    },
    concepto: {
        type: DataTypes.INTEGER,
        required: true,
        references:{
            model: ConceptoSchema,
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
    totalsiniva: {
        type: DataTypes.DOUBLE,
        required: true
    },
    iva: {
        type: DataTypes.INTEGER,
        required: true,
        references:{
            model: IvaSchema,
            key:'id'
        }
    },
    valoriva: {
        type: DataTypes.DOUBLE,
        required: true
    },
    descuento: {
        type: DataTypes.INTEGER,
        required: true,
        references:{
            model: DescuentoSchema,
            key:'id'
        }
    },
    valordescuento: {
        type: DataTypes.DOUBLE,
        required: true
    },
    total: {
        type: DataTypes.DOUBLE,
        required: true
    },
    proveedor: {
        type: DataTypes.INTEGER,
        required: true,
        references:{
            model: ProveedorSchema,
            key:'id'
        }
    },
    estado: {
        type: DataTypes.BOOLEAN,
        required: true
    }},
    {
    freezeTableName: true
    })

    CompraSchema.hasMany(ConceptoSchema,{foreignKey:'id', sourceKey:'concepto'});
    ConceptoSchema.belongsTo(CompraSchema,{foreignKey:'concepto', sourceKey:'id'});

    CompraSchema.hasMany(IvaSchema,{foreignKey:'id', sourceKey:'iva'});
    IvaSchema.belongsTo(CompraSchema,{foreignKey:'iva', sourceKey:'id'});

    CompraSchema.hasMany(DescuentoSchema,{foreignKey:'id', sourceKey:'descuento'});
    DescuentoSchema.belongsTo(CompraSchema,{foreignKey:'descuento', sourceKey:'id'});
   
    module.exports={
        CompraSchema
    }