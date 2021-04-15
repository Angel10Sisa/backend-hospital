const { DataTypes} = require('sequelize');
const { db } = require('../database/config');
const {PaisSchema} = require ('../models/Pais')

const ProvinciaSchema = db.define('Provincia',{
    provincia: {
        type: DataTypes.STRING,
        required: true
    },
    pais: {
        type: DataTypes.INTEGER,
        required: true,
        references:{
            model: PaisSchema,
            key:'id'
        }
    }},
    {
    freezeTableName: true
    })
    ProvinciaSchema.hasMany(PaisSchema,{foreignKey:'id', sourceKey:'pais'});
    PaisSchema.belongsTo(ProvinciaSchema,{foreignKey:'pais', sourceKey:'id'});

    module.exports={
        ProvinciaSchema
    }