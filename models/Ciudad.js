const { DataTypes} = require('sequelize');
const { db } = require('../database/config');
const {ProvinciaSchema} = require ('../models/Provincia')

const CiudadSchema = db.define('Ciudad',{
    ciudad: {
        type: DataTypes.STRING,
        require: true
    },
    provincia: {
        type: DataTypes.INTEGER,
        require: true,
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