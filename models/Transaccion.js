const { DataTypes} = require('sequelize');
const { db } = require('../database/config');
const { ConceptoSchema } = require ('../models/Concepto');
const { BodegaSchema } = require ('../models/Bodega');

const TransaccionSchema = db.define('Transaccion',{
    fecha: {
        type: DataTypes.DATE,
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
    bodegasalida: {
        type: DataTypes.INTEGER,
        required: true,
        references:{
            model: BodegaSchema,
            key:'id'
        }
    },
    bodegaentrada: {
        type: DataTypes.INTEGER,
        required: true,
        references:{
            model: BodegaSchema,
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

    TransaccionSchema.hasMany(ConceptoSchema,{foreignKey:'id', sourceKey:'concepto'});
    ConceptoSchema.belongsTo(TransaccionSchema,{foreignKey:'concepto', sourceKey:'id'});

    module.exports={
        TransaccionSchema
    }