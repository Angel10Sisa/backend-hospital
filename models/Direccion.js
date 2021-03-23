const { DataTypes} = require('sequelize');
const { db } = require('../database/config');
const {ProvinciaSchema} = require ('../models/Provincia');
const { CiudadSchema } = require('./Ciudad');
const { PaisSchema } = require('./Pais');

const DireccionSchema = db.define('Direccion',{
    pais: {
        type: DataTypes.INTEGER,
        require: true,
        references:{
            model: PaisSchema,
            key:'id'
        }
    },
    provincia: {
        type: DataTypes.INTEGER,
        require: true,
        references:{
            model: ProvinciaSchema,
            key:'id'
        }
    },
    ciudad: {
        type: DataTypes.INTEGER,
        require: true,
        references:{
            model: CiudadSchema,
            key:'id'
        }
    },
    direccion: {
        type: DataTypes.STRING,
        require: true
    },
    referencia: {
        type: DataTypes.STRING,
        require: true
    }},
    {
    freezeTableName: true
    })
    DireccionSchema.hasMany(PaisSchema,{foreignKey:'id', sourceKey:'pais'});
    PaisSchema.belongsTo(DireccionSchema,{foreignKey:'pais', sourceKey:'id'});

    DireccionSchema.hasMany(ProvinciaSchema,{foreignKey:'id', sourceKey:'provincia'});
    ProvinciaSchema.belongsTo(DireccionSchema,{foreignKey:'provincia', sourceKey:'id'});

    DireccionSchema.hasMany(CiudadSchema,{foreignKey:'id', sourceKey:'ciudad'});
    CiudadSchema.belongsTo(DireccionSchema,{foreignKey:'ciudad', sourceKey:'id'});

    module.exports={
        DireccionSchema
    }