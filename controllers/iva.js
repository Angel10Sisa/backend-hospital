const  response  = require ('express');
const { AuditoriaSchema } = require('../models/Auditoria');
const { IvaSchema } = require('../models/Iva');

// Listar Iva
const getIvas = async (req, res=response)=>{
    try {
        const ivas = await IvaSchema.findAll();
        if(ivas){
            res.json({ivas})
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

// Obtener Iva
const getIva = async (req, res=response)=>{
    const { id } = req.params;
    try {
        const ivas = await IvaSchema.findByPk(id);
        if(ivas){
            res.json({ivas});
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

// Ingresar Iva
const crearIva = async (req, res=response)=>{
    const { iva } = req.body;
    const auditoria = new AuditoriaSchema();
    try {
        let ivas = await IvaSchema.findOne({where: {iva:iva}});
        if(ivas){
            return res.status(400).json({
                ok: false,
                msg: 'Iva ya Existe'
            });
        }
        ivas = new IvaSchema(req.body);
        await ivas.save();
        //Ingreso a la Auditoria
        auditoria.name='Ingreso de Iva';
        auditoria.descripcion=`Ingreso de Iva ${ivas.iva}`;
        auditoria.idusuario=req.id;
        await auditoria.save();
        res.status(201).json({
            ok: true,
            ivas
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

// Editar Iva
const editarIva = async (req, res=response)=>{
    const { id } = req.params;
    const auditoria = new AuditoriaSchema();
    try {
        let ivas = await IvaSchema.findByPk(id);
        if(!ivas){
            return res.status(404).json({
                msg: 'No existe Iva'
            });
        }
        await ivas.update(req.body);
        //Ingreso a la Auditoria
        auditoria.name='Editar Iva';
        auditoria.descripcion=`Se edito Iva ${ivas.iva}`;
        auditoria.idusuario=req.id;
        await auditoria.save();
        res.json({ivas})

    } catch (error) {
        res.status(500).json({
            msg:'Hable con el administrador'
        })
    }
}

// Eliminar Iva
const eliminarIva = async (req, res=response)=>{
    const { id } = req.params;
    const auditoria = new AuditoriaSchema();
    try {
        const ivas = await IvaSchema.findByPk(id);
        if(!ivas){
            return res.status(404).json({
                msg: 'No existe Iva'
            });
        }
        await ivas.destroy();
        //Ingreso a la Auditoria
        auditoria.name='Eliminar Iva';
        auditoria.descripcion=`Se elimino Iva ${ivas.iva}`;
        auditoria.idusuario=req.id;
        await auditoria.save();
        res.status(201).json({
            ok: true,
            ivas
        });
    } catch (error) {
        res.status(500).json({
            msg:'Hable con el administrador'
        })
    }
}

module.exports = {
    getIvas,
    getIva,
    crearIva,
    editarIva,
    eliminarIva
}