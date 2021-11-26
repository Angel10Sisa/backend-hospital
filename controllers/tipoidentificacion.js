const  response  = require ('express');
const { AuditoriaSchema } = require('../models/Auditoria');
const { TipoidentificacionSchema } = require('../models/TipoIdentificacion');
const Sequelize = require ('sequelize');
const Op=Sequelize.Op;

//Contar Tipo Identificacion  
const getTipoidentificacionesContar = async(req, res=response) =>{
    const tipoidentificaciones = await TipoidentificacionSchema.count();
    if(tipoidentificaciones){
        res.json({tipoidentificaciones});
    }else{
        res.status(201).json({
            ok: false,
            msg: 'No existen Datos que mostrar'
        })
    }
}

//Listar Tipo Identificacion Busqueda
const getTipoidentificacionesB = async(req, res=response) =>{
    const { tipo } = req.params;
    const tipoidentificaciones = await TipoidentificacionSchema.findAll({where:{tipo:{[Op.like]:'%'+tipo+'%'}}});
    if(tipoidentificaciones){
        res.json({tipoidentificaciones});

    }else{
        res.status(201).json({
            ok: false,
            msg: 'No existen Datos que mostrar'
        })
    }
}

//Listar Tipo Identificacion
const getTipoidentificaciones = async (req, res= response) => {
    const tipoidentificaciones = await TipoidentificacionSchema.findAll();
    if(tipoidentificaciones){
        res.json({tipoidentificaciones});
    }else{
        res.status(201).json({
            ok: false,
            msg: 'No existen Datos que mostrar'
        })
    }
}

//Obtener Tipo Identificacion
const getTipoidentificacion = async (req, res= response) => {
    const { id } = req.params;
    const tipoidentificaciones = await TipoidentificacionSchema.findByPk(id);
    if(tipoidentificaciones){
        res.json({tipoidentificaciones});
    }else{
        res.status(201).json({
            ok: false,
            msg: 'No existen Datos que mostrar'
        })
    }
}

//Crear Tipo Identificacion
const crearTipoidentificacion = async (req, res= response) => {
    const { tipo } = req.body;
    const auditoria = new AuditoriaSchema();
    try {
        let tipoidentificaciones = await TipoidentificacionSchema.findOne({where: {tipo:tipo}});
        if(tipoidentificaciones){
            return res.status(400).json({
                ok: false,
                msg: 'Tipo identificación ya Existe'
            });
        }
        tipoidentificaciones = new TipoidentificacionSchema(req.body);
        await tipoidentificaciones.save();
        //Ingreso a la Auditoria
        auditoria.name='Ingreso de Tipo Identificacion';
        auditoria.descripcion=`Ingreso de Tipo Identificacion ${tipoidentificaciones.tipo}`;
        auditoria.idusuario=req.id;
        await auditoria.save();
        res.status(201).json({
            ok: true,
            tipoidentificaciones
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

//Editar Tipo Identificacion
const editarTipoidentificacion = async (req, res= response) => {
    const { id } = req.params;
    const auditoria = new AuditoriaSchema();
    try {
        let tipoidentificaciones = await TipoidentificacionSchema.findByPk(id);
        if(!tipoidentificaciones){
            return res.status(404).json({
                msg: 'No existe Tipo Identificación'
            });
        }
        await tipoidentificaciones.update(req.body);
        //Ingreso a la Auditoria
        auditoria.name='Editar Tipo de Identificación';
        auditoria.descripcion=`Se edito Tipo Identificacion ${tipoidentificaciones.tipo}`;
        auditoria.idusuario=req.id;
        await auditoria.save();

        res.status(201).json({
            ok: true,
            tipoidentificaciones
        });
    } catch (error) {
        res.status(500).json({
            msg:'Hable con el administrador'
        })
    }
}

//Eliminar Tipo Identificacion
const eliminarTipoidentificacion = async (req, res= response) => {
    const { id } = req.params;
    const auditoria = new AuditoriaSchema();
    try {
        let tipoidentificaciones = await TipoidentificacionSchema.findOne({where:{id:id}});
        if(!tipoidentificaciones){
            return res.status(404).json({
                msg: 'No existe Tipo Identificación'
            });
        }
        await tipoidentificaciones.destroy();
        //Ingreso a la Auditoria
        auditoria.name='Eliminar Tipo Identificacion ';
        auditoria.descripcion=`Se elimino Tipo de Identificacion ${tipoidentificaciones.tipo}`;
        auditoria.idusuario=req.id;
        await auditoria.save();
        res.status(201).json({
            ok: true,
            tipoidentificaciones
        });
    } catch (error) {
        
    }
}

module.exports = {
    getTipoidentificacionesContar,
    getTipoidentificacionesB,
    getTipoidentificaciones,
    getTipoidentificacion,
    crearTipoidentificacion,
    editarTipoidentificacion,
    eliminarTipoidentificacion
}