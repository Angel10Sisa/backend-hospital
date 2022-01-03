const response = require ('express');
const { DetalleventaSchema } = require('../models/Detalleventa');
const { ProductoSchema } = require('../models/Producto');
const { VentaSchema } = require('../models/Venta');

//Sumar Detalle IDCompra
const getDetalleventaSumar = async(req, res=response) =>{
    const { detalleventa } = req.params;
    const detalleventas = await DetalleventaSchema.sum('total',{where:{venta:detalleventa}});
    if(detalleventas){
        res.json({detalleventas});
    }else{
        res.status(201).json({
            ok: false,
            msg: 'No existen Datos que mostrar'
        })
    }
}

//Contar Detalle IDCompra
const getDetalleventaID = async(req, res=response) =>{
    const { detalleventa } = req.params;
    const detalleventas = await DetalleventaSchema.findAll({where:{venta:detalleventa}});
    if(detalleventas){
        res.json({detalleventas});
    }else{
        res.status(201).json({
            ok: false,
            msg: 'No existen Datos que mostrar'
        })
    }
}

//Listar Detalle venta
const getDetalleventas = async ( req, res = response ) => {
    try {
        const detalleventas = await DetalleventaSchema.findAll({order:['id']});
        if(detalleventas){
            res.json({detalleventas})
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
        const detalleventas = await DetalleventaSchema.findByPk(id);
        if(detalleventas){
            res.json({detalleventas});
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
    const { venta, producto } = req.body;
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
        let detalleventas = new DetalleventaSchema(req.body);
        await detalleventas.save();
        res.status(201).json({
            ok: true,
            detalleventas
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
    try {
        let detalleventas = await DetalleventaSchema.findByPk(id);
        if(!detalleventas){
            return res.status(404).json({
                msg: 'No existe Detalle Venta'
            });
        }

        await detalleventas.update(req.body);

        res.json({detalleventas})
    } catch (error) {
        res.status(500).json({
            msg:'Hable con el administrador'
        })
    }
}

//Eliminar Detalle venta
const eliminarDetalleventa = async ( req, res = response ) => {
    const { id } = req.params;
    try {
        const detalleventas = await DetalleventaSchema.findByPk(id);
        if(!detalleventas){
            return res.status(404).json({
                msg: 'No existe Detalle Venta'
            });
        }
        await detalleventas.destroy();
        res.status(201).json({
            ok: true,
            detalleventas
        });
    } catch (error) {
        res.status(500).json({
            msg:'Hable con el administrador'
        })
    }
}

module.exports = {
    getDetalleventaSumar,
    getDetalleventaID,
    getDetalleventas,
    getDetalleventa,
    crearDetalleventa,
    editarDetalleventa,
    eliminarDetalleventa
}