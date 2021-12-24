const response = require ('express');
const { AuditoriaSchema } = require('../models/Auditoria');
const { CompraSchema } = require('../models/Compra');
const { DetallecompraSchema } = require('../models/Detallecompra');
const { ProductoSchema } = require('../models/Producto');

//Contar Detalle IDCompra
const getDetallecompraID = async(req, res=response) =>{
    const { detallecompra } = req.params;
    const detallecompras = await DetallecompraSchema.findAll({where:{compra:detallecompra}});
    if(detallecompras){
        res.json({detallecompras});
    }else{
        res.status(201).json({
            ok: false,
            msg: 'No existen Datos que mostrar'
        })
    }
}

//Listar Detalle Compra
const getDetallecompras = async ( req, res = response ) => {
    try {
        const detallecompras = await DetallecompraSchema.findAll({order:['id']});
        if(detallecompras){
            res.json({detallecompras})
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

//Obtener Detalle Compra
const getDetallecompra = async ( req, res = response ) => {
    const { id } = req.params;
    try {
        const detallecompras = await DetallecompraSchema.findByPk(id);
        if(detallecompras){
            res.json({detallecompras});
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

//Ingresar Detalle Compra
const crearDetallecompra = async ( req, res = response ) => {
    const { compra, producto } = req.body;
    try {
        let compras = await CompraSchema.findByPk(compra);
        if(compras.estado === false){
            return res.status(400).json({
                ok: false,
                msg: 'Compra esta inactivo'
            });
        }
        let productos = await ProductoSchema.findByPk(producto);
        if(productos.estado === false){
            return res.status(400).json({
                ok: false,
                msg: 'Producto esta inactivo'
            });
        }
        let detallecompras = new DetallecompraSchema(req.body);
        await detallecompras.save();
        res.status(201).json({
            ok: true,
            detallecompras
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

//Editar Detalle Compra
const editarDetallecompra = async ( req, res = response ) => {
    const { id } = req.params;
    try {
        let detallecompras = await DetallecompraSchema.findByPk(id);
        if(!detallecompras){
            return res.status(404).json({
                msg: 'No existe Detalle Compra'
            });
        }

        await detallecompras.update(req.body);

        res.json({detallecompras})
    } catch (error) {
        res.status(500).json({
            msg:'Hable con el administrador'
        })
    }
}

//Eliminar Detalle Compra
const eliminarDetallecompra = async ( req, res = response ) => {
    const { id } = req.params;
    try {
        const detallecompras = await DetallecompraSchema.findByPk(id);
        if(!detallecompras){
            return res.status(404).json({
                msg: 'No existe Detalle Compra'
            });
        }
        await detallecompras.destroy();
        res.status(201).json({
            ok: true,
            detallecompras
        });
    } catch (error) {
        res.status(500).json({
            msg:'Hable con el administrador'
        })
    }
}

module.exports = {
    getDetallecompraID,
    getDetallecompras,
    getDetallecompra,
    crearDetallecompra,
    editarDetallecompra,
    eliminarDetallecompra
}