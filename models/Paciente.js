const { DataTypes} = require('sequelize');
const { db } = require('../database/config');
const { TipoidentificacionSchema } = require ('../models/Tipoidentificacion');
const { EstadocivilSchema } = require ('../models/Estadocivil');
const { SexoSchema } = require ('../models/Sexo');
const { AfiliacionSchema } = require ('../models/Afiliacion');
const { TipopacienteSchema } = require ('../models/Tipopaciente');
const { DireccionSchema } = require('./Direccion');

const PacienteSchema = db.define('Paciente',{
    identificacion: {
        type: DataTypes.STRING,
        required: true
    },
    tipoidentificacion: {
        type: DataTypes.INTEGER,
        required: true,
        references:{
            model: TipoidentificacionSchema,
            key:'id'
        }
    },
    nacionalidad: {
        type: DataTypes.STRING,
        required: true
    },
    apellido: {
        type: DataTypes.STRING,
        required: true
    },
    nombre: {
        type: DataTypes.STRING,
        required: true
    },
    estadocivil: {
        type: DataTypes.INTEGER,
        required: true,
        references:{
            model: EstadocivilSchema,
            key:'id'
        }
    },
    sexo: {
        type: DataTypes.INTEGER,
        required: true,
        references:{
            model: SexoSchema,
            key:'id'
        }
    },
    afiliacion: {
        type: DataTypes.INTEGER,
        required: true,
        references:{
            model: AfiliacionSchema,
            key:'id'
        }
    },
    tipopaciente: {
        type: DataTypes.INTEGER,
        required: true,
        references:{
            model: TipopacienteSchema,
            key:'id'
        }
    },
    telefono: {
        type: DataTypes.STRING,
        required: true
    },
    celular: {
        type: DataTypes.STRING,
        required: true
    },
    email: {
        type: DataTypes.STRING,
        required: true
    },
    direccion: {
        type: DataTypes.INTEGER,
        required: true,
        references:{
            model: DireccionSchema,
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
    PacienteSchema.hasMany(TipoidentificacionSchema,{foreignKey:'id', sourceKey:'tipoidentificacion'});
    TipoidentificacionSchema.belongsTo(PacienteSchema,{foreignKey:'tipoidentificacion', sourceKey:'id'});

    PacienteSchema.hasMany(EstadocivilSchema,{foreignKey:'id', sourceKey:'estadocivil'});
    EstadocivilSchema.belongsTo(PacienteSchema,{foreignKey:'estadocivil', sourceKey:'id'});

    PacienteSchema.hasMany(SexoSchema,{foreignKey:'id', sourceKey:'sexo'});
    SexoSchema.belongsTo(PacienteSchema,{foreignKey:'sexo', sourceKey:'id'});

    PacienteSchema.hasMany(AfiliacionSchema,{foreignKey:'id', sourceKey:'afiliacion'});
    AfiliacionSchema.belongsTo(PacienteSchema,{foreignKey:'afiliacion', sourceKey:'id'});

    PacienteSchema.hasMany(TipopacienteSchema,{foreignKey:'id', sourceKey:'tipopaciente'});
    TipopacienteSchema.belongsTo(PacienteSchema,{foreignKey:'tipopaciente', sourceKey:'id'});

    PacienteSchema.hasMany(DireccionSchema,{foreignKey:'id', sourceKey:'direccion'});
    DireccionSchema.belongsTo(PacienteSchema,{foreignKey:'direccion', sourceKey:'id'});

    module.exports={
        PacienteSchema
    }