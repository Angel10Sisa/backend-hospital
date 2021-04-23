const  response  = require ('express');
const { AuditoriaSchema } = require('../models/Auditoria');
const { ProveedorSchema } = require('../models/Proveedor');

// Listar Proveedor
const getProveedores = async (req, res=response) => {
    const proveedores = await ProveedorSchema.findAll();
    if(proveedores){
        res.json({proveedores});
    }else{
        res.status(201).json({
            ok: false,
            msg: 'No existen Datos que mostrar'
        })
    }
}

//Listar Paciente True
const getProveedorT = async (req, res=response) => {
    try {
        const proveedores = await ProveedorSchema.findAll({where:{estado:true}});
        if(proveedores){
            res.json({proveedores})
        }else{
            res.status(201).json({
                ok: false,
                msg: 'No existen Datos que mostrar'
            })
        }
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

//Listar Paciente False
const getProveedorF = async (req, res=response) => {
    try {
        const proveedores = await ProveedorSchema.findAll({where:{estado:false}});
        if(proveedores){
            res.json({proveedores})
        }else{
            res.status(201).json({
                ok: false,
                msg: 'No existen Datos que mostrar'
            })
        }
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

// Obtener Proveedor
const getProveedor = async (req, res=response) => {
    const {id} = req.params;
    const proveedor = await ProveedorSchema.findByPk(id);
    if(proveedor){
        res.json({proveedor});
    }else{
        res.status(201).json({
            ok: false,
            msg: 'No existen Datos que mostrar'
        })
    }
}

// Crear Proveedor
const crearProveedor = async (req, res=response) => {
    const { nombre } = req.body;
    const auditoria = new AuditoriaSchema();
    try {
        let proveedores = await ProveedorSchema.findOne({where: {nombre:nombre}});
        if(proveedores){
            return res.status(400).json({
                ok:false,
                msg: 'Proveedor ya Existe'
            });
        }
        proveedores = new ProveedorSchema(req.body);
        await proveedores.save();
        //Ingreso de Auditoria
        auditoria.name='Ingreso de Proveedor';
        auditoria.descripcion=`Ingreso de proveedor ${proveedores.nombre}`;
        auditoria.idusuario=req.id;
        await auditoria.save();
        res.status(201).json({
            ok: true,
            proveedores
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

// Editar Proveedor
const editarProveedor = async (req, res=response) => {
    const { id } = req.params;
    const auditoria = new AuditoriaSchema();
    try {
        let proveedores = await ProveedorSchema.findOne({where:{id:id}});
        if(!proveedores){
            return res.status(404).json({
                msg: 'No existe proveedor'
            });
        }
        await proveedores.update(req.body);
        //Ingreso a la Auditoria
        auditoria.name='Editar Proveedor';
        auditoria.descripcion=`Se edito Proveedor ${proveedores.nombre}`;
        auditoria.idusuario=req.id;
        await auditoria.save();

        res.json({proveedores})
    } catch (error) {
        res.status(500).json({
            msg:'Hable con el administrador'
        })
    }
}

// Eliminar Proveedor
const eliminarProveedor = async (req, res=response) => {
    const { id } = req.params;
    const auditoria = new AuditoriaSchema();
    const proveedores = await ProveedorSchema.findByPk(id);
    if(!proveedores){
        return res.status(404).json({
            msg: 'No existe proveedor'
        });
    }
        await proveedores.update({estado: false}); //Edita el estado de true a false
        //Ingreso a la Auditoria
        auditoria.name='Eliminar Proveedor';
        auditoria.descripcion='Se cambio el estado del proveedor';
        auditoria.idusuario=req.id;
        await auditoria.save();
        res.status(201).json({
            ok: true,
            proveedores
        });
}

module.exports = {
    getProveedores,
    getProveedorT,
    getProveedorF,
    getProveedor,
    crearProveedor,
    editarProveedor,
    eliminarProveedor
}