const  response  = require ('express');
const { AuditoriaSchema } = require('../models/Auditoria');
const { CiudadSchema } = require('../models/Ciudad');
const { DireccionSchema } = require('../models/Direccion');
const Sequelize = require ('sequelize');
const Op=Sequelize.Op;

//Contar Direcciones
const getDireccionContar = async(req, res=response) =>{
    const direcciones = await DireccionSchema.count();
    if(direcciones){
        res.json({direcciones});
    }else{
        res.status(201).json({
            ok: false,
            msg: 'No existen Datos que mostrar'
        })
    }
}

//Listar Direcciones Busqueda
const getDireccionB = async(req, res=response) =>{
    const { direccion } = req.params;
    const direcciones = await DireccionSchema.findAll({where:{[Op.or]:[{direccion:{[Op.like]:'%'+direccion+'%'}}]}});
    if(direcciones){
        res.json({direcciones});

    }else{
        res.status(201).json({
            ok: false,
            msg: 'No existen Datos que mostrar'
        })
    }
}

//Listar Direcciones
const getDirecciones = async (req, res=response) => {
    const direcciones = await DireccionSchema.findAll({include:[{model: CiudadSchema, as:'Ciudads'}]});
    if(direcciones){
        res.json({direcciones});
    }else{
        res.status(201).json({
            ok: false,
            msg: 'No existen Datos que mostrar'
        })
    }
}

//Obtener Direccion
const getDireccion = async (req, res=response) => {
    const {id} = req.params;
    const direcciones = await DireccionSchema.findByPk(id);
    if(direcciones){
        res.json({direcciones});
    }else{
        res.status(201).json({
            ok: false,
            msg: 'No existen Datos que mostrar'
        })
    }
}

//Crear Direccion
const crearDireccion = async (req, res=response) => {
    const { direccion } = req.body;
    const auditoria = new AuditoriaSchema();
    try {
        let direcciones = await DireccionSchema.findOne({where: {direccion:direccion}});
        if(direcciones){
            return res.status(400).json({
                ok: false,
                msg: 'Dirección ya Existe'
            });
        }
        direcciones = new DireccionSchema(req.body);
        await direcciones.save();
        //Ingreso a la Auditoria
        auditoria.name='Ingreso de Direccion';
        auditoria.descripcion=`Ingreso de direccion ${direcciones.direccion}`;
        auditoria.idusuario=req.id;
        await auditoria.save();
        res.status(201).json({
            ok: true,
            direcciones
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

//Editar Direccion
const editarDireccion = async (req, res=response) => {
    const { id } = req.params;
    const auditoria = new AuditoriaSchema();
    try {
        let direcciones = await DireccionSchema.findOne({where: {id:id}});
        if(!direcciones){
            return res.status(404).json({
                msg: 'No existe direccion'
            });
        }
        await direcciones.update(req.body);
        //Ingreso a la Auditoria
        auditoria.name='Editar Direccion';
        auditoria.descripcion=`Se edito Direccion ${direcciones.direccion}`;
        auditoria.idusuario=req.id;
        await auditoria.save();
        res.status(201).json({
            ok: true,
            direcciones
        });
    } catch (error) {
        res.status(500).json({
            msg:'Hable con el administrador'
        })
    }
}

//Eliminar Direccion
const eliminarDireccion = async (req, res=response) => {
    const { id } = req.params;
    const auditoria = new AuditoriaSchema();
    const direcciones = await DireccionSchema.findOne({where: {id:id}});
    if(!direcciones){
        return res.status(404).json({
            msg: 'No existe direccion'
        });
    }
    await direcciones.destroy();
    //Ingreso a la Auditoria
    auditoria.name='Eliminar Direccion';
    auditoria.descripcion=`Se elimino Direccion ${direcciones.direccion}`;
    auditoria.idusuario=req.id;
    await auditoria.save();
    res.status(201).json({
        ok: true,
        direcciones
    });
}

module.exports = {
    getDireccionContar,
    getDireccionB,
    getDirecciones,
    getDireccion,
    crearDireccion,
    editarDireccion,
    eliminarDireccion
}