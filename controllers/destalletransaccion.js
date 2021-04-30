const response = require ('express');
const { AuditoriaSchema } = require('../models/Auditoria');
const { DetalletransaccionSchema } = require('../models/Detalletransaccion');
const { ProductoSchema } = require('../models/Producto');
const { TransaccionSchema } = require('../models/Transaccion');


//Lista Detalle Transacciones
const getDetalletransacciones = async (req, res = response ) => {
    try {
        const detalletransacciones = await DetalletransaccionSchema.findAll();
        if(detalletransacciones){
            res.json({detalletransacciones})
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

//Obtener Detalle Transaccion
const getDetalletransaccion = async (req, res = response ) => {
    const { id } = req.params;
    try {
        const detalletransacciones = await DetalletransaccionSchema.findByPk(id);
        if(detalletransacciones){
            res.json({detalletransacciones});
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

//Crear Detalle Transaccion
const crearDetalletransaccion = async (req, res = response ) => {
    const { transaccion, producto } = req.body;
    const auditoria = new AuditoriaSchema();
    try {
        let transacciones = await TransaccionSchema.findByPk(transaccion);
        if(transacciones.estado === false){
            return res.status(400).json({
                ok: false,
                msg: 'Transaccion esta inactivo'
            });
        }
        let productos = await ProductoSchema.findByPk(producto);
        if(productos.estado === false){
            return res.status(400).json({
                ok: false,
                msg: 'Producto esta inactivo'
            });
        }
        let detalletransacciones = new DetalletransaccionSchema(req.body);
        await detalletransacciones.save();
        //Ingreso a la Auditoria
        auditoria.name='Ingreso de Detalle Transaccion';
        auditoria.descripcion=`Ingreso de Detalle transaccion ${detalletransacciones.id}`;
        auditoria.idusuario=req.id;
        await auditoria.save();
        res.status(201).json({
            ok: true,
            detalletransacciones
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

//Editar Detalle Transaccion
const editarDetalletransaccion = async (req, res = response ) => {
    const { id } = req.params;
    const auditoria = new AuditoriaSchema();
    try {
        let detalletransacciones = await DetalletransaccionSchema.findByPk(id);
        if(!detalletransacciones){
            return res.status(404).json({
                msg: 'No existe Detalle Transaccion'
            });
        }

        await detalletransacciones.update(req.body);
        //Ingreso a la Auditoria
        auditoria.name='Editar Detalle Transaccion';
        auditoria.descripcion=`Se edito Detalle Transaccion ${detalletransacciones.id}`;
        auditoria.idusuario=req.id;
        await auditoria.save();

        res.json({detalletransacciones})
    } catch (error) {
        res.status(500).json({
            msg:'Hable con el administrador'
        })
    }
}

//Eliminar Detalle Transaccion
const eliminarDetalletransaccion = async (req, res = response ) => {
    const { id } = req.params;
    const auditoria = new AuditoriaSchema();
    try {
        const detalletransacciones = await DetalletransaccionSchema.findByPk(id);
        if(!detalletransacciones){
            return res.status(404).json({
                msg: 'No existe Detalle Transaccion'
            });
        }
        await detalletransacciones.destroy();
        //Ingreso a la Auditoria
        auditoria.name='Eliminar Detalle Transaccion';
        auditoria.descripcion=`Se elimino Detalle Transaccio ${detalletransacciones.id}`;
        auditoria.idusuario=req.id;
        await auditoria.save();
        res.status(201).json({
            ok: true,
            detalletransacciones
        });
    } catch (error) {
        res.status(500).json({
            msg:'Hable con el administrador'
        })
    }
}


module.exports = {
    getDetalletransacciones,
    getDetalletransaccion,
    crearDetalletransaccion,
    editarDetalletransaccion,
    eliminarDetalletransaccion
}
