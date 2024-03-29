const response = require ('express');
const { AuditoriaSchema } = require('../models/Auditoria');
const { BodegaSchema } = require('../models/Bodega');
const { CompraSchema } = require('../models/Compra');
const { ProveedorSchema } = require('../models/Proveedor');
const Sequelize = require ('sequelize');
const Op=Sequelize.Op;
var moment = require('moment');

//Contar Compra Bodega
const getCompraContar = async(req, res=response) =>{
    const compras = await CompraSchema.count();
    if(compras){
        res.json({compras});
    }else{
        res.status(201).json({
            ok: false,
            msg: 'No existen Datos que mostrar'
        })
    }
}

//Contar True Comprar
const getCompraContarT = async(req, res=response) =>{
    const compras = await CompraSchema.count({where:{estado:true}});
    if(compras){
        res.json({compras});
    }else{
        res.status(201).json({
            ok: false,
            msg: 'No existen Datos que mostrar'
        })
    }
}

//Contar False Compra
const getCompraContarF = async(req, res=response) =>{
    const compras = await CompraSchema.count({where:{estado:false}});
    if(compras){
        res.json({compras});
    }else{
        res.status(201).json({
            ok: false,
            msg: 'No existen Datos que mostrar'
        })
    }
}

//Listar Paciente Busqueda
const getCompraB = async(req, res=response) =>{
    const { compra } = req.params;
    const compras = await CompraSchema.findAll({where:{[Op.or]:[{documento:{[Op.like]:'%'+compra+'%'}}]}});
    if(compras){
        res.json({compras});

    }else{
        res.status(201).json({
            ok: false,
            msg: 'No existen Datos que mostrar'
        })
    }
}

//Listar Auditoria Pro Fechas
const getCompraF = async(req, res=response) =>{
    try {
    const { fecha1, fecha2 } = req.body;
    console.log(fecha1);
    fechaa = moment(fecha1).format('YYYY-MM-DD');
    fechae = moment(fecha2).format('YYYY-MM-DD');
        const compras = await CompraSchema.findAll({where:{fecha: {
            [Op.between]: [fechaa,fechae]
          }}});
        if(compras){
            res.json({compras});
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

//Listar Compras
const getCompras = async (req, res=response) =>{
    try {
        const compras = await CompraSchema.findAll({order:['id']});
        if(compras){
            res.json({compras})
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

//Listar Compras True
const getComprasT = async (req, res=response) =>{
    try {
        const compras = await CompraSchema.findAll({where:{estado:true}});
        if(compras){
            res.json({compras})
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

//Listar Compras False
const getComprasF = async (req, res=response) =>{
    try {
        const compras = await CompraSchema.findAll({where:{estado:false}});
        if(compras){
            res.json({compras})
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

//Obtener Compra
const getCompra = async (req, res=response) =>{
    const { id } = req.params;
    try {
        const compras = await CompraSchema.findByPk(id);
        if(compras){
            res.json({compras});
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

//Crear Compra
const crearCompra = async (req, res=response) =>{
    const { documento, bodega, proveedor } = req.body;
    const auditoria = new AuditoriaSchema();
    try {
        let compras = await CompraSchema.findOne({where:{documento:documento}});
        if(compras){
            return res.status(400).json({
                ok: false,
                msg: 'Compra ya existe'
            });
        }
        let bodegas = await BodegaSchema.findByPk(bodega);
        if(bodegas.estado === false){
            return res.status(400).json({
                ok: false,
                msg: 'Bodega esta inactivo'
            });
        }
        let proveedores = await ProveedorSchema.findByPk(proveedor);
        if(proveedores.estado === false){
            return res.status(400).json({
                ok: false,
                msg: 'Proveedor esta inactivo'
            });
        }
        compras = new CompraSchema(req.body);
        await compras.save();
        //Ingreso a la Auditoria
        auditoria.name='Ingreso de Compra';
        auditoria.descripcion=`Ingreso de Compra ${compras.id}`;
        auditoria.idusuario=req.id;
        await auditoria.save();
        res.status(201).json({
            ok: true,
            compras
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

//Editar Compra
const editarCompra = async (req, res=response) =>{
    const { id } = req.params;
    const auditoria = new AuditoriaSchema();
    try {
        let compras = await CompraSchema.findByPk(id);
        if(!compras){
            return res.status(404).json({
                msg: 'No existe compra'
            });
        }

        await compras.update(req.body);
        //Ingreso a la Auditoria
        auditoria.name='Editar Compra';
        auditoria.descripcion=`Se edito Compra ${compras.id}`;
        auditoria.idusuario=req.id;
        await auditoria.save();

        res.status(201).json({
            ok: true,
            compras
        });
    } catch (error) {
        res.status(500).json({
            msg:'Hable con el administrador'
        })
    }
}

//Eliminar o Regitrar Compra
const eliminarCompra = async (req, res=response) =>{
    const { id } = req.params;
    const auditoria = new AuditoriaSchema();
    try {
        const compras = await CompraSchema.findByPk(id);
        if(!compras){
            return res.status(404).json({
                msg: 'No existe Compra'
            });
        }
        await compras.update({estado: false});
        //Ingreso a la Auditoria
        auditoria.name='Liquidacion Compra';
        auditoria.descripcion=`Se cambio de estado de Compra ${compras.id}`;
        auditoria.idusuario=req.id;
        await auditoria.save();
        res.status(201).json({
            ok: true,
            compras
        });
    } catch (error) {
        res.status(500).json({
            msg:'Hable con el administrador'
        })
    }
}

module.exports = {
    getCompraContar,
    getCompraContarT,
    getCompraContarF,
    getCompraB,
    getCompraF,
    getCompras,
    getComprasT,
    getComprasF,
    getCompra,
    crearCompra,
    editarCompra,
    eliminarCompra
}