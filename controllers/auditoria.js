const  response  = require ('express');
const { AuditoriaSchema } = require('../models/Auditoria');
const Sequelize = require ('sequelize');
const Op=Sequelize.Op;
var moment = require('moment');

//Contar Auditoria
const getAuditoriaContar = async(req, res=response) =>{
    const auditorias = await AuditoriaSchema.count();
    if(auditorias){
        res.json({auditorias});
    }else{
        res.status(201).json({
            ok: false,
            msg: 'No existen Datos que mostrar'
        })
    }
}

//Listar Auditoria Pro Fechas
const getAuditoriaF = async(req, res=response) =>{
    try {
    const { fecha1, fecha2 } = req.body;
    fechaa = moment(fecha1).format('YYYY-MM-DD');
    fechae = moment(fecha2).format('YYYY-MM-DD');
        const auditorias = await AuditoriaSchema.findAll({where:{createdAt: {
            [Op.between]: [fechaa,fechae]
          }}});
        if(auditorias){
            res.json({auditorias});
        }else{
            res.status(201).json({
                ok: false,
                msg: 'No existen Datos que mostrar'
            })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        }); 
    }
}

//Listar Auditoria Busqueda
const getAuditoriaB = async(req, res=response) =>{
    try {
        const { auditoria } = req.params;
        if(auditoria > 0){
            const auditorias = await AuditoriaSchema.findAll({where:{[Op.or]:[{idusuario:{[Op.eq]:parseInt(auditoria)}}]}});
            if(auditorias){
                res.json({auditorias});
    
            }else{
                res.status(201).json({
                    ok: false,
                    msg: 'No existen Datos que mostrar'
                })
            }
        }else{
            const auditorias = await AuditoriaSchema.findAll({where:{[Op.or]:[{name:{[Op.like]:'%'+auditoria+'%'}},{descripcion:{[Op.like]:'%'+auditoria+'%'}}]}});
            if(auditorias){
                res.json({auditorias});
    
            }else{
                res.status(201).json({
                    ok: false,
                    msg: 'No existen Datos que mostrar'
                })
            }
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        }); 
    }
}

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
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });        
    }
}

//Listar Auditoria
const getAuditoria = async(req, res=response) =>{
    const auditoria = await AuditoriaSchema.findAll({order:['id']});
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
    getAuditoriaContar,
    getAuditoriaB,
    getAuditoriaF,
    crearAuditoria,
    getAuditoria
}