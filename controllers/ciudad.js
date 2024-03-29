const  response  = require ('express');
const { AuditoriaSchema } = require('../models/Auditoria');
const { CiudadSchema } = require('../models/Ciudad');
const { ProvinciaSchema } = require('../models/Provincia');
const Sequelize = require ('sequelize');
const Op=Sequelize.Op;

//Contar Provincias
const getCiudadContar = async(req, res=response) =>{
    const ciudades = await CiudadSchema.count();
    if(ciudades){
        res.json({ciudades});
    }else{
        res.status(201).json({
            ok: false,
            msg: 'No existen Datos que mostrar'
        })
    }
}

//Listar Bodegas Busqueda
const getCiudadB = async(req, res=response) =>{
    const { ciudad } = req.params;
    const ciudades = await CiudadSchema.findAll({where:{[Op.or]:[{ciudad:{[Op.like]:'%'+ciudad+'%'}}]}});
    if(ciudades){
        res.json({ciudades});

    }else{
        res.status(201).json({
            ok: false,
            msg: 'No existen Datos que mostrar'
        })
    }
}

//Listar Ciudad Busqueda Provincia
const getCiudadProvincia = async(req, res=response) =>{
    const { provincia } = req.params;
    const ciudades = await CiudadSchema.findAll({where:{provincia:provincia}});
    if(ciudades){
        res.json({ciudades});

    }else{
        res.status(201).json({
            ok: false,
            msg: 'No existen Datos que mostrar'
        })
    }
}


//Listar Ciudades
const getCiudades = async(req, res=response) => {
    const ciudades= await CiudadSchema.findAll({order:['id']});
    if(ciudades){
        res.json({ciudades});
    }else{
        res.status(201).json({
            ok: false,
            msg: 'No existen Datos que mostrar'
        })
    }
}

//Obtener Ciudad
const getCiudad = async(req, res=response) => {
    const {id} = req.params;
    const ciudades = await CiudadSchema.findByPk(id);
    if(ciudades){
        res.json({ciudades});
    }else{
        res.status(201).json({
            ok: false,
            msg: 'No existen Datos que mostrar'
        })
    }
}

//Crear Ciudad
const crearCiudad = async(req, res=response) => {
    const { ciudad } = req.body;
    const auditoria = new AuditoriaSchema();
    try {
        let ciudades = await CiudadSchema.findOne({where: {ciudad:ciudad}});
        if(ciudades){
            return res.status(400).json({
                ok: false,
                msg: 'Ciudad ya Existe'
            });
        }
        ciudades = new CiudadSchema(req.body);
        await ciudades.save();
        //Ingreso a la Auditoria
        auditoria.name='Ingreso de ciudad';
        auditoria.descripcion=`Ingreso de la ciudad ${ciudades.ciudad}`;
        auditoria.idusuario=req.id;
        await auditoria.save();
        res.status(201).json({
            ok: true,
            ciudades
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

//Editar Ciudad
const editarCiudad = async(req, res=response) => {
    const {id} = req.params;
    const auditoria= new AuditoriaSchema();
    try {
        let ciudades = await CiudadSchema.findOne({where: {id:id}});
        if(!ciudades){
            return res.status(404).json({
                msg: 'No existe ciudad'
            });
        }
        await ciudades.update(req.body);
        //Ingreso a la Auditoria
        auditoria.name='Editar Ciudad';
        auditoria.descripcion=`Se edito Ciudad ${ciudades.ciudad}`;
        auditoria.idusuario=req.id;
        await auditoria.save();

        res.status(201).json({
            ok: true,
            ciudades
        });
    } catch (error) {
        res.status(500).json({
            msg:'Hable con el administrador'
        })
        
    }
}

//Eliminar Ciudad
const eliminarCiudad = async(req, res=response) => {
    const {id} = req.params;
    const auditoria = new AuditoriaSchema();
    const ciudades = await CiudadSchema.findOne({where: {id:id}});
    if(!ciudades){
        return res.status(404).json({
            msg: 'No existe pais'
        });
    }
    await ciudades.destroy();
    //Ingreso a la Auditoria
    auditoria.name='Eliminar Ciudad';
    auditoria.descripcion=`Se elimino ciudad ${ciudades.ciudad}`;
    auditoria.idusuario=req.id;
    await auditoria.save();

    res.status(201).json({
        ok: true,
        ciudades
    });
}

module.exports = {
    getCiudadContar,
    getCiudadB,
    getCiudades,
    getCiudad,
    crearCiudad,
    editarCiudad,
    eliminarCiudad,
    getCiudadProvincia
}