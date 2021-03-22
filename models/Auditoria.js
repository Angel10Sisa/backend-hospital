const { DataTypes} = require('sequelize');
const { db } = require('../database/config');
const { UsuarioSchema } = require('./Usuario');


const AuditoriaSchema = db.define('Auditoria', {
   name: {
        type: DataTypes.STRING,
        required: true
    },
    descripcion: {
        type: DataTypes.STRING,
        required: true
    },
    idusuario: {
        type: DataTypes.INTEGER,
        required: true,
        references:{
            model: UsuarioSchema,
            key:'id'
        }
     }},
    {
    freezeTableName: true
    });



module.exports = {
    AuditoriaSchema
}