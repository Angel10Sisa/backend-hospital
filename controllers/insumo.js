const response = require ('express');
const { AuditoriaSchema } = require('../models/Auditoria');
const { InsumoSchema } = require('../models/Insumo');
const { ProductoSchema } = require('../models/Producto');


//Listar Insumos
const getInsumos = async ( req, res = response ) => {
    try {
        const insumos = await InsumoSchema.findAll({order:['id']});
        if(insumos){
            res.json({insumos})
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

//Obtener Insumo
const getInsumo = async ( req, res = response ) => {
    const { id } = req.params;
    try {
        const insumos = await InsumoSchema.findByPk(id);
        if(insumos){
            res.json({insumos});
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

//Crear Insumo
const crearInsumo = async ( req, res = response ) => {
    const { producto, productoinsumo } = req.body;
    const auditoria = new AuditoriaSchema();
    try {
        let productos = await ProductoSchema.findByPk(producto);
        if(productos.estado === false){
            return res.status(400).json({
                ok: false,
                msg: 'Producto esta inactivo'
            });
        }
        let productoinsumos = await ProductoSchema.findByPk(productoinsumo);
        if(productoinsumos.estado === false){
            return res.status(400).json({
                ok: false,
                msg: 'Producto esta inactivo'
            });
        }
        let insumos = new InsumoSchema(req.body);
        await insumos.save();
        //Ingreso a la Auditoria
        auditoria.name='Ingreso de Insumo';
        auditoria.descripcion=`Ingreso de Insumo ${insumos.id}`;
        auditoria.idusuario=req.id;
        await auditoria.save();
        res.status(201).json({
            ok: true,
            insumos
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

//Editar Insumo
const editarInsumo = async ( req, res = response ) => {
    const { id } = req.params;
    const auditoria = new AuditoriaSchema();
    try {
        let insumos = await InsumoSchema.findByPk(id);
        if(!insumos){
            return res.status(404).json({
                msg: 'No existe Insumo'
            });
        }

        await insumos.update(req.body);
        //Ingreso a la Auditoria
        auditoria.name='Editar Insumo';
        auditoria.descripcion=`Se edito Insumo ${insumos.id}`;
        auditoria.idusuario=req.id;
        await auditoria.save();

        res.json({insumos})
    } catch (error) {
        res.status(500).json({
            msg:'Hable con el administrador'
        })
    }
}

//Eliminar Insumo
const eliminarInsumo = async ( req, res = response ) => {
    const { id } = req.params;
    const auditoria = new AuditoriaSchema();
    try {
        const insumos = await InsumoSchema.findByPk(id);
        if(!insumos){
            return res.status(404).json({
                msg: 'No existe Insumo'
            });
        }
        await insumos.destroy();
        //Ingreso a la Auditoria
        auditoria.name='Eliminar Insumo';
        auditoria.descripcion=`Se elimino Insumo ${insumos.id}`;
        auditoria.idusuario=req.id;
        await auditoria.save();
        res.status(201).json({
            ok: true,
            insumos
        });
    } catch (error) {
        res.status(500).json({
            msg:'Hable con el administrador'
        })
    }
}


module.exports = {
    getInsumos,
    getInsumo,
    crearInsumo,
    editarInsumo,
    eliminarInsumo
}