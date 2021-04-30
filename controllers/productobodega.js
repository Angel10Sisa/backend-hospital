const response = require ('express');
const { AuditoriaSchema } = require('../models/Auditoria');
const { BodegaSchema } = require('../models/Bodega');
const { ProductoSchema } = require('../models/Producto');
const { ProductobodegaSchema } = require('../models/Productobodega');

// Listar Producto Bodegas
const getProductobodegas = async ( req, res = response) => {
    try {
        const productobodegas = await ProductobodegaSchema.findAll();
        if(productobodegas){
            res.json({productobodegas})
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


// Obtener Producto Bodega
const getProductobodega = async ( req, res = response) => {
    const { id } = req.params;
    try {
        const productobodegas = await ProductobodegaSchema.findByPk(id);
        if(productobodegas){
            res.json({productobodegas});
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

// Crear Producto Bodega
const crearProductobodega = async ( req, res = response) => {
    const { bodega, producto } = req.body;
    const auditoria = new AuditoriaSchema();
    try {
        let bodegas = await BodegaSchema.findByPk(bodega);
        if(bodegas.estado === false){
            return res.status(400).json({
                ok: false,
                msg: 'Bodega esta inactivo'
            });
        }
        let productos = await ProductoSchema.findByPk(producto);
        if(productos.estado === false){
            return res.status(400).json({
                ok: false,
                msg: 'Producto esta inactivo'
            });
        }
        let productobodegas = new ProductobodegaSchema(req.body);
        await productobodegas.save();
        //Ingreso a la Auditoria
        auditoria.name='Ingreso de Producto a Bodega';
        auditoria.descripcion=`Ingreso de Producto a Bodega ${productobodegas.id}`;
        auditoria.idusuario=req.id;
        await auditoria.save();
        res.status(201).json({
            ok: true,
            productobodegas
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

// Editar Producto Bodega
const editarProductobodega = async ( req, res = response) => {
    const { id } = req.params;
    const auditoria = new AuditoriaSchema();
    try {
        let productobodegas = await ProductobodegaSchema.findByPk(id);
        if(!productobodegas){
            return res.status(404).json({
                msg: 'No existe producto en bodega'
            });
        }

        await productobodegas.update(req.body);
        //Ingreso a la Auditoria
        auditoria.name='Editar Producto Bodega';
        auditoria.descripcion=`Se edito Producto Bodega ${productobodegas.id}`;
        auditoria.idusuario=req.id;
        await auditoria.save();

        res.json({productobodegas})
    } catch (error) {
        res.status(500).json({
            msg:'Hable con el administrador'
        })
    }
}

// Eliminar Producto Bodega
const eliminarProductobodega = async ( req, res = response) => {
    const { id } = req.params;
    const auditoria = new AuditoriaSchema();
    try {
        const productobodegas = await ProductobodegaSchema.findByPk(id);
        if(!productobodegas){
            return res.status(404).json({
                msg: 'No existe Producto Bodega'
            });
        }
        await productobodegas.destroy();
        //Ingreso a la Auditoria
        auditoria.name='Eliminar Producto Bodega';
        auditoria.descripcion=`Se elimino Producto Bodega ${productobodegas.id}`;
        auditoria.idusuario=req.id;
        await auditoria.save();
        res.status(201).json({
            ok: true,
            productobodegas
        });
    } catch (error) {
        res.status(500).json({
            msg:'Hable con el administrador'
        })
    }
}

module.exports = {
    getProductobodegas,
    getProductobodega,
    crearProductobodega,
    editarProductobodega,
    eliminarProductobodega
}