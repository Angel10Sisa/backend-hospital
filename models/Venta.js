const { DataTypes} = require('sequelize');
const { db } = require('../database/config');
const { ConceptoSchema } = require('./Concepto');
const { PacienteSchema } = require('./Paciente');
const { IvaSchema } = require('./Iva');
const { DescuentoSchema } = require('./Descuento');
const { FormapagoSchema } = require('./Formapago');

const VentaSchema = db.define('Venta',{
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
    paciente: {
        type: DataTypes.INTEGER,
        required: true,
        references:{
            model: PacienteSchema,
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
    formapago: {
        type: DataTypes.INTEGER,
        required: true,
        references:{
            model: FormapagoSchema,
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

    VentaSchema.hasMany(ConceptoSchema,{foreignKey:'id', sourceKey:'concepto'});
    ConceptoSchema.belongsTo(VentaSchema,{foreignKey:'concepto', sourceKey:'id'});


    VentaSchema.hasMany(IvaSchema,{foreignKey:'id', sourceKey:'iva'});
    IvaSchema.belongsTo(VentaSchema,{foreignKey:'iva', sourceKey:'id'});

    VentaSchema.hasMany(DescuentoSchema,{foreignKey:'id', sourceKey:'descuento'});
    DescuentoSchema.belongsTo(VentaSchema,{foreignKey:'descuento', sourceKey:'id'});

    VentaSchema.hasMany(FormapagoSchema,{foreignKey:'id', sourceKey:'formapago'});
    FormapagoSchema.belongsTo(VentaSchema,{foreignKey:'formapago', sourceKey:'id'});

    module.exports={
        VentaSchema
    }