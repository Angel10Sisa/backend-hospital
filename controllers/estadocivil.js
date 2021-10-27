const  response  = require ('express');
const { AuditoriaSchema } = require('../models/Auditoria');
const { EstadocivilSchema } = require('../models/Estadocivil');

// Listar Estado Civil
const getEstadosciviles = async (req, res=response) => {
    try {
        const estadociviles = await EstadocivilSchema.findAll();
        if(estadociviles){
            res.json({estadociviles})
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

// Obtener Estado Civil
const getEstadocivil = async (req, res=response) => {
    const { id } = req.params;
    try {
        const estadociviles = await EstadocivilSchema.findByPk(id);
        if(estadociviles){
            res.json({estadociviles});
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

// Crear Estado Civil
const crearEstadocivil = async (req, res=response) => {
    const { estadocivil } = req.body;
    const auditoria = new AuditoriaSchema();
    try {
        let estadociviles = await EstadocivilSchema.findOne({where: {estadocivil:estadocivil}});
        if(estadociviles){
            return res.status(400).json({
                ok: false,
                msg: 'Estado Civil ya Existe'
            });
        }
        estadociviles = new EstadocivilSchema(req.body);
        await estadociviles.save();
        //Ingreso a la Auditoria
        auditoria.name='Ingreso de Estado Civil';
        auditoria.descripcion=`Ingreso de Estado Civil ${estadociviles.estadocivil}`;
        auditoria.idusuario=req.id;
        await auditoria.save();
        res.status(201).json({
            ok: true,
            estadociviles
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

// Editar Estado Civil
const editarEstadocivil = async (req, res=response) => {
    const { id } = req.params;
    const auditoria = new AuditoriaSchema();
    try {
        let estadociviles = await EstadocivilSchema.findByPk(id);
        if(!estadociviles){
            return res.status(404).json({
                msg: 'No existe estado civil'
            });
        }
        await estadociviles.update(req.body);
        //Ingreso a la Auditoria
        auditoria.name='Editar Estado Civil';
        auditoria.descripcion=`Se edito Estado Civil ${estadociviles.estadocivil}`;
        auditoria.idusuario=req.id;
        await auditoria.save();
        res.status(201).json({
            ok: true,
            estadociviles
        });
        
    } catch (error) {
        res.status(500).json({
            msg:'Hable con el administrador'
        })
    }
}

// Eliminar Estado Civil
const eliminarEstadocivil = async (req, res=response) => {
    const { id } = req.params;
    const auditoria = new AuditoriaSchema();
    try {
        const estadociviles = await EstadocivilSchema.findByPk(id);
        if(!estadociviles){
            return res.status(404).json({
                msg: 'No existe estado civil'
            });
        }
        await estadociviles.destroy();
        //Ingreso a la Auditoria
        auditoria.name='Eliminar Estado Civil';
        auditoria.descripcion=`Se elimino Estado Civil ${estadociviles.estadocivil}`;
        auditoria.idusuario=req.id;
        await auditoria.save();
        res.status(201).json({
            ok: true,
            estadociviles
        });
    } catch (error) {
        res.status(500).json({
            msg:'Hable con el administrador'
        })
    }
}

module.exports = {
    getEstadosciviles,
    getEstadocivil,
    crearEstadocivil,
    editarEstadocivil,
    eliminarEstadocivil
}