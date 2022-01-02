const response = require ('express');
const { AuditoriaSchema } = require('../models/Auditoria');
const { PacienteSchema } = require('../models/Paciente');
const { VentaSchema } = require('../models/Venta');
const Sequelize = require ('sequelize');
const Op=Sequelize.Op;
var moment = require('moment');
const { BodegaSchema } = require('../models/Bodega');

//Contar Ventas
const getVentasContar = async(req, res=response) =>{
    const ventas = await VentaSchema.count();
    if(ventas){
        res.json({ventas});
    }else{
        res.status(201).json({
            ok: false,
            msg: 'No existen Datos que mostrar'
        })
    }
}

//Contar True Ventas
const getVentasContarT = async(req, res=response) =>{
    const ventas = await VentaSchema.count({where:{estado:true}});
    if(ventas){
        res.json({ventas});
    }else{
        res.status(201).json({
            ok: false,
            msg: 'No existen Datos que mostrar'
        })
    }
}

//Contar False Ventas
const getVentasContarF = async(req, res=response) =>{
    const ventas = await VentaSchema.count({where:{estado:false}});
    if(ventas){
        res.json({ventas});
    }else{
        res.status(201).json({
            ok: false,
            msg: 'No existen Datos que mostrar'
        })
    }
}

//Listar Ventas Busqueda
const getVentasB = async(req, res=response) =>{
    const { venta } = req.params;
    const ventas = await VentaSchema.findAll({where:{id:venta}});
    if(ventas){
        res.json({ventas});

    }else{
        res.status(201).json({
            ok: false,
            msg: 'No existen Datos que mostrar'
        })
    }
}

//Listar Ventas Pro Fechas
const getVentasFecha = async(req, res=response) =>{
    try {
    const { fecha1, fecha2 } = req.body;
    fechaa = moment(fecha1).format('YYYY-MM-DD');
    fechae = moment(fecha2).format('YYYY-MM-DD');
        const ventas = await VentaSchema.findAll({where:{fecha: {
            [Op.between]: [fechaa,fechae]
          }}});
        if(ventas){
            res.json({ventas});
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

//Listar Ventas
const getVentas = async ( req, res = response) => {
    try {
        const ventas = await VentaSchema.findAll({order:['id']});
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
    const { paciente, bodega } = req.body;
    const auditoria = new AuditoriaSchema();
    try {
        let pacientes = await PacienteSchema.findByPk(paciente);
        if(pacientes.estado === false){
            return res.status(400).json({
                ok: false,
                msg: 'Paciente esta inactivo'
            });
        }
        let bodegas = await BodegaSchema.findByPk(bodega);
        if(bodegas.estado === false){
            return res.status(400).json({
                ok: false,
                msg: 'Bodega esta inactivo'
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
    getVentasContar,
    getVentasContarT,
    getVentasContarF,
    getVentasB,
    getVentasFecha,
    getVentas,
    getVentasT,
    getVentasF,
    getVenta,
    crearVenta,
    editarVenta,
    eliminarVenta
}