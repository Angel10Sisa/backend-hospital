const response = require ('express');
const { AuditoriaSchema } = require('../models/Auditoria');
const { BodegaSchema } = require('../models/Bodega');
const { DetalleventaSchema } = require('../models/Detalleventa');
const { ProductoSchema } = require('../models/Producto');
const { VentaSchema } = require('../models/Venta');

//Listar Detalle venta
const getDetalleventas = async ( req, res = response ) => {
    try {
        const detallesventas = await DetalleventaSchema.findAll();
        if(detallesventas){
            res.json({detallesventas})
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

//Obtener Detalle venta
const getDetalleventa = async ( req, res = response ) => {
    const { id } = req.params;
    try {
        const detallesventas = await DetalleventaSchema.findByPk(id);
        if(detallesventas){
            res.json({detallesventas});
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

//Crear Detalle venta
const crearDetalleventa = async ( req, res = response ) => {
    const { venta, producto, bodega } = req.body;
    const auditoria = new AuditoriaSchema();
    try {
        let ventas = await VentaSchema.findByPk(venta);
        if(ventas.estado === false){
            return res.status(400).json({
                ok: false,
                msg: 'Venta esta inactivo'
            });
        }
        let productos = await ProductoSchema.findByPk(producto);
        if(productos.estado === false){
            return res.status(400).json({
                ok: false,
                msg: 'Producto esta inactivo'
            });
        }
        let bodegas = await BodegaSchema.findByPk(bodega);
        if(bodegas.estado === false){
            return res.status(400).json({
                ok: false,
                msg: 'Bodega esta inactivo'
            });
        }
        let detallesventas = new DetalleventaSchema(req.body);
        await detallesventas.save();
        //Ingreso a la Auditoria
        auditoria.name='Ingreso de Detalle Venta';
        auditoria.descripcion=`Ingreso de Detalle Venta ${detallesventas.id}`;
        auditoria.idusuario=req.id;
        await auditoria.save();
        res.status(201).json({
            ok: true,
            detallesventas
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

//Editar Detalle venta
const editarDetalleventa = async ( req, res = response ) => {
    const { id } = req.params;
    const auditoria = new AuditoriaSchema();
    try {
        let detallesventas = await DetalleventaSchema.findByPk(id);
        if(!detallesventas){
            return res.status(404).json({
                msg: 'No existe Detalle Venta'
            });
        }

        await detallesventas.update(req.body);
        //Ingreso a la Auditoria
        auditoria.name='Editar Detalle Venta';
        auditoria.descripcion=`Se edito Detalle Venta ${detallesventas.id}`;
        auditoria.idusuario=req.id;
        await auditoria.save();

        res.json({detallesventas})
    } catch (error) {
        res.status(500).json({
            msg:'Hable con el administrador'
        })
    }
}

//Eliminar Detalle venta
const eliminarDetalleventa = async ( req, res = response ) => {
    const { id } = req.params;
    const auditoria = new AuditoriaSchema();
    try {
        const detallesventas = await DetalleventaSchema.findByPk(id);
        if(!detallesventas){
            return res.status(404).json({
                msg: 'No existe Detalle Venta'
            });
        }
        await detallesventas.destroy();
        //Ingreso a la Auditoria
        auditoria.name='Eliminar Detalle Venta';
        auditoria.descripcion=`Se elimino Detalle Venta ${detallesventas.id}`;
        auditoria.idusuario=req.id;
        await auditoria.save();
        res.status(201).json({
            ok: true,
            detallesventas
        });
    } catch (error) {
        res.status(500).json({
            msg:'Hable con el administrador'
        })
    }
}

module.exports = {
    getDetalleventas,
    getDetalleventa,
    crearDetalleventa,
    editarDetalleventa,
    eliminarDetalleventa
}