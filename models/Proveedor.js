const { DataTypes} = require('sequelize');
const { db } = require('../database/config');
const { DireccionSchema } = require('./Direccion');

const ProveedorSchema = db.define('Proveedor',{
    nombre: {
        type: DataTypes.STRING,
        require: true
    },
    contacto: {
        type: DataTypes.STRING,
        require: true
    },
    telefono: {
        type: DataTypes.STRING,
        require: true
    }, 
    celular: {
        type: DataTypes.STRING,
        require: true
    },
    email: {
        type: DataTypes.STRING,
        require: true
    },
    estado: {
        type: DataTypes.BOOLEAN,
        required: true
    },
    direccion: {
        type: DataTypes.INTEGER,
        require: true,
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