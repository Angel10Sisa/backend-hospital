const response = require ('express');
const { AuditoriaSchema } = require('../models/Auditoria');
const { PacienteSchema } = require('../models/Paciente');
const { VentaSchema } = require('../models/Venta');

//Listar Ventas
const getVentas = async ( req, res = response) => {
    try {
        const ventas = await VentaSchema.findAll();
        if(ventas){
            res.json({ventas})
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

//Listar Ventas True
const getVentasT = async ( req, res = response) => {
    try {
        const ventas = await VentaSchema.findAll({where:{estado:true}});
        if(ventas){
            res.json({ventas})
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

//Listar Ventas False
const getVentasF = async ( req, res = response) => {
    try {
        const ventas = await VentaSchema.findAll({where:{estado:false}});
        if(ventas){
            res.json({ventas})
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

//Obtener Venta
const getVenta = async ( req, res = response) => {
    const { id } = req.params;
    try {
        const ventas = await VentaSchema.findByPk(id);
        if(ventas){
            res.json({ventas});
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

//Crear Venta
const crearVenta = async ( req, res = response) => {
    const { paciente } = req.body;
    const auditoria = new AuditoriaSchema();
    try {
        let pacientes = await PacienteSchema.findByPk(paciente);
        if(pacientes.estado === false){
            return res.status(400).json({
                ok: false,
                msg: 'Paciente esta inactivo'
            });
        }
        let ventas = new VentaSchema(req.body);
        await ventas.save();
        //Ingreso a la Auditoria
        auditoria.name='Ingreso de Ventas';
        auditoria.descripcion=`Ingreso de Ventas ${ventas.id}`;
        auditoria.idusuario=req.id;
        await auditoria.save();
        res.status(201).json({
            ok: true,
            ventas
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

//Editar Venta
const editarVenta = async ( req, res = response) => {
    const { id } = req.params;
    const auditoria = new AuditoriaSchema();
    try {
        let ventas = await VentaSchema.findByPk(id);
        if(!ventas){
            return res.status(404).json({
                msg: 'No existe venta'
            });
        }

        await ventas.update(req.body);
        //Ingreso a la Auditoria
        auditoria.name='Editar Venta';
        auditoria.descripcion=`Se edito Venta ${ventas.id}`;
        auditoria.idusuario=req.id;
        await auditoria.save();

        res.json({ventas})
    } catch (error) {
        res.status(500).json({
            msg:'Hable con el administrador'
        })
    }
}

//Eliminar o Liquidar  Venta
const eliminarVenta = async ( req, res = response) => {
    const { id } = req.params;
    const auditoria = new AuditoriaSchema();
    try {
        const ventas = await VentaSchema.findByPk(id);
        if(!ventas){
            return res.status(404).json({
                msg: 'No existe Venta'
            });
        }
        await ventas.update({estado: false});
        //Ingreso a la Auditoria
        auditoria.name='Liquidacion Venta';
        auditoria.descripcion=`Se cambio de estado de Venta ${ventas.id}`;
        auditoria.idusuario=req.id;
        await auditoria.save();
        res.status(201).json({
            ok: true,
            ventas
        });
    } catch (error) {
        res.status(500).json({
            msg:'Hable con el administrador'
        })
    }
}

module.exports = {
    getVentas,
    getVentasT,
    getVentasF,
    getVenta,
    crearVenta,
    editarVenta,
    eliminarVenta
}