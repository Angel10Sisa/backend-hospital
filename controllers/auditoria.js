const  response  = require ('express');
const { AuditoriaSchema } = require('../models/Auditoria');


//Listar Auditoria
const getAuditoria = async(req, res=response) =>{
    const auditoria = await AuditoriaSchema.findAll();
    if(auditoria){
        res.json({auditoria});
    }else{
        res.status(201).json({
            ok: false,
            msg: 'No existen Datos que mostrar'
        })
    }
}


module.exports = {
    getAuditoria
}