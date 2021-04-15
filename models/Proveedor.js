const { DataTypes} = require('sequelize');
const { db } = require('../database/config');
const { DireccionSchema } = require('./Direccion');

const ProveedorSchema = db.define('Proveedor',{
    nombre: {
        type: DataTypes.STRING,
        required: true
    },
    contacto: {
        type: DataTypes.STRING,
        required: true
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
    estado: {
        type: DataTypes.BOOLEAN,
        required: true
    },
    direccion: {
        type: DataTypes.INTEGER,
        required: true,
        references:{
            model: DireccionSchema,
            key:'id'
        }
    }},
    {
    freezeTableName: true
    })
    ProveedorSchema.hasMany(DireccionSchema,{foreignKey:'id', sourceKey:'direccion'});
    DireccionSchema.belongsTo(ProveedorSchema,{foreignKey:'direccion', sourceKey:'id'});

    module.exports={
        ProveedorSchema
    }