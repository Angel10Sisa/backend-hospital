const { DataTypes} = require('sequelize');
const { db } = require('../database/config');
const {ProvinciaSchema} = require ('../models/Provincia')

const CiudadSchema = db.define('Ciudad',{
    ciudad: {
        type: DataTypes.STRING,
        required: true
    },
    provincia: {
        type: DataTypes.INTEGER,
        required: true,
        references:{
            model: ProvinciaSchema,
            key:'id'
        }
    }},
    {
    freezeTableName: true
    })
    CiudadSchema.hasMany(ProvinciaSchema,{foreignKey:'id', sourceKey:'provincia'});
    ProvinciaSchema.belongsTo(CiudadSchema,{foreignKey:'provincia', sourceKey:'id'});

    module.exports={
        CiudadSchema
    }