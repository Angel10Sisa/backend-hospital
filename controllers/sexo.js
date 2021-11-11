const  response  = require ('express');
const { AuditoriaSchema } = require('../models/Auditoria');
const { SexoSchema } = require('../models/Sexo');

// Listar Sexo
const getSexos = async (req, res= response) => {
    try {
        const sexos = await SexoSchema.findAll();
        if(sexos){
            res.json({sexos})
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

// Obtener Sexo
const getSexo = async (req, res= response) => {
    const { id } = req.params;
    try {
        const sexos = await SexoSchema.findByPk(id);
        if(sexos){
            res.json({sexos});
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

// Crear Sexo
const crearSexo = async (req, res= response) => {
    const { sexo } = req.body;
    const auditoria = new AuditoriaSchema();
    try {
        let sexos = await SexoSchema.findOne({where: {sexo:sexo}});
        if(sexos){
            return res.status(400).json({
                ok: false,
                msg: 'Sexo ya Existe'
            });
        }
        sexos = new SexoSchema(req.body);
        await sexos.save();
        //Ingreso a la Auditoria
        auditoria.name='Ingreso de Sexo';
        auditoria.descripcion=`Ingreso de Sexo ${sexos.sexo}`;
        auditoria.idusuario=req.id;
        await auditoria.save();
        res.status(201).json({
            ok: true,
            sexos
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

// Editar Sexo
const editarSexo = async (req, res= response) => {
    const { id } = req.params;
    const auditoria = new AuditoriaSchema();
    try {
        let sexos = await SexoSchema.findByPk(id);
        if(!sexos){
            return res.status(404).json({
                msg: 'No existe Sexo'
            });
        }
        await sexos.update(req.body);
        //Ingreso a la Auditoria
        auditoria.name='Editar Sexo';
        auditoria.descripcion=`Se edito Sexo ${sexos.sexo}`;
        auditoria.idusuario=req.id;
        await auditoria.save();
        res.status(201).json({
            ok: true,
            sexos
        });

    } catch (error) {
        res.status(500).json({
            msg:'Hable con el administrador'
        })
    }
}

// Eliminar Sexo
const eliminarSexo = async (req, res= response) => {
    const { id } = req.params;
    const auditoria = new AuditoriaSchema();
    try {
        const sexos = await SexoSchema.findByPk(id);
        if(!sexos){
            return res.status(404).json({
                msg: 'No existe sexo'
            });
        }
        await sexos.destroy();
        //Ingreso a la Auditoria
        auditoria.name='Eliminar Sexo';
        auditoria.descripcion=`Se elimino Sexo ${sexos.sexo}`;
        auditoria.idusuario=req.id;
        await auditoria.save();
        res.status(201).json({
            ok: true,
            sexos
        });
    } catch (error) {
        res.status(500).json({
            msg:'Hable con el administrador'
        })
    }
}

module.exports = {
    getSexos,
    getSexo,
    crearSexo,
    editarSexo,
    eliminarSexo
}