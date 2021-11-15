const response = require ('express');
const { AuditoriaSchema } = require('../models/Auditoria');
const { BodegaSchema } = require('../models/Bodega');

//Listar Bodega
const getBodegas = async ( req, res= response)=>{
    try {
        const bodegas = await BodegaSchema.findAll();
        if(bodegas){
            res.json({bodegas})
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

//Listar todas las Bodegas True
const getBodegasT = async ( req, res=response) =>{
    try {
        const bodegas = await BodegaSchema.findAll({where:{estado:true}});
        if(bodegas){
            res.json({bodegas})
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

//Listar todas las Bodegas False
const getBodegasF = async ( req, res=response) =>{
    try {
        const bodegas = await BodegaSchema.findAll({where:{estado:false}});
        if(bodegas){
            res.json({bodegas})
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

//Obtener Bodega
const getBodega = async ( req, res= response)=>{
    const { id } = req.params;
    try {
        const bodegas = await BodegaSchema.findByPk(id);
        if(bodegas){
            res.json({bodegas});
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

//Crear Bodega
const crearBodega = async ( req, res= response)=>{
    const { nombre } = req.body;
    const auditoria = new AuditoriaSchema();
    try {
        let bodegas = await BodegaSchema.findOne({where: {nombre:nombre}});
        if(bodegas){
            return res.status(400).json({
                ok: false,
                msg: 'Bodega ya Existe'
            });
        }
        bodegas = new BodegaSchema(req.body);
        await bodegas.save();
        //Ingreso a la Auditoria
        auditoria.name='Ingreso de Bodega';
        auditoria.descripcion=`Ingreso de Bodega ${bodegas.nombre}`;
        auditoria.idusuario=req.id;
        await auditoria.save();
        res.status(201).json({
            ok: true,
            bodegas
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

//Editar Bodega
const editarBodega = async ( req, res= response)=>{
    const { id } = req.params;
    const auditoria = new AuditoriaSchema();
    try {
        let bodegas = await BodegaSchema.findByPk(id);
        if(!bodegas){
            return res.status(404).json({
                msg: 'No existe Bodega'
            });
        }
        await bodegas.update(req.body);
        //Ingreso a la Auditoria
        auditoria.name='Editar Bodega';
        auditoria.descripcion=`Se edito Bodega ${bodegas.nombre}`;
        auditoria.idusuario=req.id;
        await auditoria.save();
        res.status(201).json({
            ok: true,
            bodegas
        });
    } catch (error) {
        res.status(500).json({
            msg:'Hable con el administrador'
        })
    }
}

//Elimar Bodega
const eliminarBodega = async ( req, res= response)=>{
    const { id } = req.params;
    const auditoria = new AuditoriaSchema();
    try {
        const bodegas = await BodegaSchema.findByPk(id);
        if(!bodegas){
            return res.status(404).json({
                msg: 'No existe Bodega'
            });
        }
        await bodegas.update({estado: false});
        //Ingreso a la Auditoria
        auditoria.name='Eliminar Bodega';
        auditoria.descripcion=`Se cambio de estado a la Bodega ${bodegas.nombre}`;
        auditoria.idusuario=req.id;
        await auditoria.save();
        res.status(201).json({
            ok: true,
            bodegas
        });
    } catch (error) {
        res.status(500).json({
            msg:'Hable con el administrador'
        })
    }
}

module.exports={
    getBodegas,
    getBodegasT,
    getBodegasF,
    getBodega,
    crearBodega,
    editarBodega,
    eliminarBodega
}