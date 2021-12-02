const response = require ('express');
const { AuditoriaSchema } = require('../models/Auditoria');
const { ConceptoSchema } = require('../models/Concepto');
const Sequelize = require ('sequelize');
const Op=Sequelize.Op;

//Contar Concepto
const getConceptoContar = async(req, res=response) =>{
    const conceptos = await ConceptoSchema.count();
    if(conceptos){
        res.json({conceptos});
    }else{
        res.status(201).json({
            ok: false,
            msg: 'No existen Datos que mostrar'
        })
    }
}

//Listar Concepto Busqueda
const getConceptoB = async(req, res=response) =>{
    const { concepto } = req.params;
    const conceptos = await ConceptoSchema.findAll({where:{concepto:{[Op.like]:'%'+concepto+'%'}}});
    if(conceptos){
        res.json({conceptos});

    }else{
        res.status(201).json({
            ok: false,
            msg: 'No existen Datos que mostrar'
        })
    }
}

//Listar Concepto
const getConceptos = async(req, res=response)=>{
    try {
        const conceptos = await ConceptoSchema.findAll({order:['id']});
        if(conceptos){
            res.json({conceptos})
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

//Obtener Concepto
const getConcepto = async(req, res=response)=>{
    const { id } = req.params;
    try {
        const conceptos = await ConceptoSchema.findByPk(id);
        if(conceptos){
            res.json({conceptos});
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

//Crear Concepto
const crearConcepto = async(req, res=response)=>{
    const { concepto } = req.body;
    const auditoria = new AuditoriaSchema();
    try {
        let conceptos = await ConceptoSchema.findOne({where: {concepto:concepto}});
        if(conceptos){
            return res.status(400).json({
                ok: false,
                msg: 'Concepto ya Existe'
            });
        }
        conceptos = new ConceptoSchema(req.body);
        await conceptos.save();
        //Ingreso a la Auditoria
        auditoria.name='Ingreso de Concepto';
        auditoria.descripcion=`Ingreso de Concepto ${conceptos.concepto}`;
        auditoria.idusuario=req.id;
        await auditoria.save();
        res.status(201).json({
            ok: true,
            conceptos
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

//Editar Concepto
const editarConcepto = async(req, res=response)=>{
    const { id } = req.params;
    const auditoria = new AuditoriaSchema();
    try {
        let conceptos = await ConceptoSchema.findByPk(id);
        if(!conceptos){
            return res.status(404).json({
                msg: 'No existe Conceptos'
            });
        }
        await conceptos.update(req.body);
        //Ingreso a la Auditoria
        auditoria.name='Editar Conceptos';
        auditoria.descripcion=`Se edito Conceptos ${conceptos.concepto}`;
        auditoria.idusuario=req.id;
        await auditoria.save();
        res.status(201).json({
            ok: true,
            conceptos
        });

    } catch (error) {
        res.status(500).json({
            msg:'Hable con el administrador'
        })
    }
}

//Eliminar Concepto
const eliminarConcepto = async(req, res=response)=>{
    const { id } = req.params;
    const auditoria = new AuditoriaSchema();
    try {
        const conceptos = await ConceptoSchema.findByPk(id);
        if(!conceptos){
            return res.status(404).json({
                msg: 'No existe Concepto'
            });
        }
        await conceptos.destroy();
        //Ingreso a la Auditoria
        auditoria.name='Eliminar Concepto';
        auditoria.descripcion=`Se elimino Concepto ${conceptos.concepto}`;
        auditoria.idusuario=req.id;
        await auditoria.save();
        res.status(201).json({
            ok: true,
            conceptos
        });
    } catch (error) {
        res.status(500).json({
            msg:'Hable con el administrador'
        })
    }
}

module.exports = {
    getConceptoContar,
    getConceptoB,
    getConceptos,
    getConcepto,
    crearConcepto,
    editarConcepto,
    eliminarConcepto
}