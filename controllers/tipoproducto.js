const response = require ('express');
const { AuditoriaSchema } = require('../models/Auditoria');
const { TipoproductoSchema } = require('../models/Tipoproducto');

//Listar Tipoproducto
const getTipoproductos = async ( req, res=response)=>{
    try {
        const tipoproductos = await TipoproductoSchema.findAll();
        if(tipoproductos){
            res.json({tipoproductos})
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

//Obtener Tipoproducto
const getTipoproducto = async ( req, res=response)=>{
    const { id } = req.params;
    try {
        const tipoproductos = await TipoproductoSchema.findByPk(id);
        if(tipoproductos){
            res.json({tipoproductos});
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

//Crear Tipoproducto
const crearTipoproducto = async ( req, res=response)=>{
    const { tipoproducto } = req.body;
    const auditoria = new AuditoriaSchema();
    try {
        let tipoproductos = await TipoproductoSchema.findOne({where: {tipoproducto:tipoproducto}});
        if(tipoproductos){
            return res.status(400).json({
                ok: false,
                msg: 'Tipos productos ya Existe'
            });
        }
        tipoproductos = new TipoproductoSchema(req.body);
        await tipoproductos.save();
        //Ingreso a la Auditoria
        auditoria.name='Ingreso de Tipo Producto';
        auditoria.descripcion=`Ingreso de Tipo Producto ${tipoproductos.tipoproducto}`;
        auditoria.idusuario=req.id;
        await auditoria.save();
        res.status(201).json({
            ok: true,
            tipoproductos
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

//Editar Tipoproducto
const editarTipoproducto = async ( req, res=response)=>{
    const { id } = req.params;
    const auditoria = new AuditoriaSchema();
    try {
        let tipoproductos = await TipoproductoSchema.findByPk(id);
        if(!tipoproductos){
            return res.status(404).json({
                msg: 'No existe Tipo Producto'
            });
        }
        await tipoproductos.update(req.body);
        //Ingreso a la Auditoria
        auditoria.name='Editar Tipo Producto';
        auditoria.descripcion=`Se edito Tipo Producto ${tipoproductos.tipoproducto}`;
        auditoria.idusuario=req.id;
        await auditoria.save();
        res.status(201).json({
            ok: true,
            tipoproductos
        });

    } catch (error) {
        res.status(500).json({
            msg:'Hable con el administrador'
        })
    }
}

//Eliminar Tipoproducto
const eliminarTipoproducto = async ( req, res=response)=>{
    const { id } = req.params;
    const auditoria = new AuditoriaSchema();
    try {
        const tipoproductos = await TipoproductoSchema.findByPk(id);
        if(!tipoproductos){
            return res.status(404).json({
                msg: 'No existe Tipo Producto'
            });
        }
        await tipoproductos.destroy();
        //Ingreso a la Auditoria
        auditoria.name='Eliminar Tipo Producto';
        auditoria.descripcion=`Se elimino Tipo Producto ${tipoproductos.tipoproducto}`;
        auditoria.idusuario=req.id;
        await auditoria.save();
        res.status(201).json({
            ok: true,
            tipoproductos
        });
    } catch (error) {
        res.status(500).json({
            msg:'Hable con el administrador'
        })
    }
}

module.exports ={
    getTipoproductos,
    getTipoproducto,
    crearTipoproducto,
    editarTipoproducto,
    eliminarTipoproducto
}