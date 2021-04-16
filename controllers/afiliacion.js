const  response  = require("express");
const { AuditoriaSchema } = require("../models/Auditoria");
const { AfiliacionSchema } = require("../models/Afiliacion");

//Listar Afiliacion
const getAfiliaciones = async(req, res=response) => {
    try {
        const afiliaciones = await AfiliacionSchema.findAll();
        if(afiliaciones){
            res.json({afiliaciones})
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

//Obtener Afiliacion
const getAfiliacion = async(req, res=response) => {
    const { id } = req.params;
    try {
        const afiliaciones = await AfiliacionSchema.findByPk(id);
        if(afiliaciones){
            res.json({afiliaciones});
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

//Ingresar Afiliacion
const crearAfiliacion = async(req, res=response) => {
    const { afiliacion } = req.body;
    const auditoria = new AuditoriaSchema();
    try {
        let afiliaciones = await AfiliacionSchema.findOne({where: {afiliacion:afiliacion}});
        if(afiliaciones){
            return res.status(400).json({
                ok: false,
                msg: 'Afiliación ya Existe'
            });
        }
        afiliaciones = new AfiliacionSchema(req.body);
        await afiliaciones.save();
        //Ingreso a la Auditoria
        auditoria.name='Ingreso de Afiliacion';
        auditoria.descripcion=`Ingreso de Afiliacion ${afiliaciones.afiliacion}`;
        auditoria.idusuario=req.id;
        await auditoria.save();
        res.status(201).json({
            ok: true,
            afiliaciones
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

//Editar Afiliacion
const editarAfiliacion = async(req, res=response) => {
    const { id } = req.params;
    const auditoria = new AuditoriaSchema();
    try {
        let afiliaciones = await AfiliacionSchema.findByPk(id);
        if(!afiliaciones){
            return res.status(404).json({
                msg: 'No existe Afiliación'
            });
        }
        await afiliaciones.update(req.body);
        //Ingreso a la Auditoria
        auditoria.name='Editar Afiliacion';
        auditoria.descripcion=`Se edito Afiliación ${afiliaciones.afiliacion}`;
        auditoria.idusuario=req.id;
        await auditoria.save();
        res.json({afiliaciones})

    } catch (error) {
        res.status(500).json({
            msg:'Hable con el administrador'
        })
    }
}

//Eliminar Afiliacion
const eliminarAfiliacion = async(req, res=response) => {
    const { id } = req.params;
    const auditoria = new AuditoriaSchema();
    try {
        const afiliaciones = await AfiliacionSchema.findByPk(id);
        if(!afiliaciones){
            return res.status(404).json({
                msg: 'No existe Afiliación'
            });
        }
        await afiliaciones.update({estado: false});
        //Ingreso a la Auditoria
        auditoria.name='Eliminar Afiliación';
        auditoria.descripcion=`Se cambio el estado de la Afiliacion ${afiliaciones.afiliacion}`;
        auditoria.idusuario=req.id;
        await auditoria.save();
        res.status(201).json({
            ok: true,
            afiliaciones
        });
    } catch (error) {
        res.status(500).json({
            msg:'Hable con el administrador'
        })
    }
}

module.exports = {
    getAfiliaciones,
    getAfiliacion,
    crearAfiliacion,
    editarAfiliacion,
    eliminarAfiliacion
}