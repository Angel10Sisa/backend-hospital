const { DataTypes } = require ('sequelize');
const { db } = require ('../database/config');

const TipoproductoSchema = db.define('Tipoproducto',{
    tipoproducto: {
        type: DataTypes.STRING,
        required: true
    }},
    {
        freezeTableName: true
    })

    module.exports = {
        TipoproductoSchema
    }