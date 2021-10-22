const  response  = require ('express');
const { AuditoriaSchema } = require('../models/Auditoria');

//Ingresar Auditoria
const crearAuditoria = async(req, res=response) =>{
    try {
        const auditoria = new AuditoriaSchema(req.body);
        await auditoria.save();

        res.status(201).json({
            ok: true,
            auditoria
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });        
    }
}

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
    crearAuditoria,
    getAuditoria
}