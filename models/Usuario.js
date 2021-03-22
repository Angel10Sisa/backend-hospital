const { DataTypes} = require('sequelize');
const { db } = require('../database/config');
const { RolSchema } = require('./Rol');


const UsuarioSchema = db.define('Usuario', {
   name: {
        type: DataTypes.STRING,
        required: true
    },
    email: {
        type: DataTypes.STRING,
        required: true,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        required: true
    },
    img: {
        type: DataTypes.STRING
    },
    rol: {
        type: DataTypes.STRING,
        required: true,
        references:{
            model: RolSchema,
            key:'rol'
        }
     },
    estado: {
        type: DataTypes.BOOLEAN,
        required: true
    },
    google: {
        type: DataTypes.BOOLEAN,
        required: false
    }},
    {
    freezeTableName: true
    });

    UsuarioSchema.hasMany(RolSchema,{foreignKey:'rol', sourceKey:'rol'});
    RolSchema.belongsTo(UsuarioSchema,{foreignKey:'rol', sourceKey:'rol'});


module.exports = {
    UsuarioSchema
}