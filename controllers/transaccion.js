const response = require ('express');
const { AuditoriaSchema } = require('../models/Auditoria');
const { BodegaSchema } = require('../models/Bodega');
const { TransaccionSchema } = require('../models/Transaccion');

//Listar todas las Transacciones
const getTransacciones = async ( req, res=response) =>{
    try {
        const transacciones = await TransaccionSchema.findAll();
        if(transacciones){
            res.json({transacciones})
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

//Listar todas las Transacciones True
const getTransaccionesT = async ( req, res=response) =>{
    try {
        const transacciones = await TransaccionSchema.findAll({where:{estado:true}});
        if(transacciones){
            res.json({transacciones})
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

//Listar todas las Transacciones False
const getTransaccionesF = async ( req, res=response) =>{
    try {
        const transacciones = await TransaccionSchema.findAll({where:{estado:false}});
        if(transacciones){
            res.json({transacciones})
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

//Obtener Transaccion
const getTransaccion = async ( req, res=response) =>{
    const { id } = req.params;
    try {
        const transacciones = await TransaccionSchema.findByPk(id);
        if(transacciones){
            res.json({transacciones});
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

//Ingresar Transaccion
const crearTransaccion = async ( req, res=response) =>{
    const auditoria = new AuditoriaSchema();
    try {
        let transacciones = new TransaccionSchema(req.body);
        let bodegasalida = await BodegaSchema.findOne({where: {id:transacciones.bodegasalida}});
        if(bodegasalida.estado === false){
            return res.status(400).json({
                ok: false,
                msg: 'Bodega Salida no esta activa'
            });
        }
        let bodegaentrada = await BodegaSchema.findOne({where: {id:transacciones.bodegaentrada}});
        if(bodegaentrada.estado === false){
            return res.status(400).json({
                ok: false,
                msg: 'Bodega Entrada no esta activa'
            });
        }        
        await transacciones.save();
        //Ingreso a la Auditoria
        auditoria.name='Ingreso de Transaccion';
        auditoria.descripcion=`Ingreso de Transaccion ${transacciones.id}`;
        auditoria.idusuario=req.id;
        await auditoria.save();
        res.status(201).json({
            ok: true,
            transacciones
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

//Editar Transaccion
const editarTransaccion = async ( req, res=response) =>{
    const { id } = req.params;
    const auditoria = new AuditoriaSchema();
    try {
        let transacciones = await TransaccionSchema.findByPk(id);
        if(!transacciones){
            return res.status(404).json({
                msg: 'No existe transaccion'
            });
        }

        await transacciones.update(req.body);
        //Ingreso a la Auditoria
        auditoria.name='Editar Transaccion';
        auditoria.descripcion=`Se edito Transaccion ${transacciones.id}`;
        auditoria.idusuario=req.id;
        await auditoria.save();

        res.json({transacciones})
    } catch (error) {
        res.status(500).json({
            msg:'Hable con el administrador'
        })
    }
}

//Registrar compra Transaccion
const eliminarTransaccion = async ( req, res=response) =>{
    const { id } = req.params;
    const auditoria = new AuditoriaSchema();
    try {
        const transacciones = await TransaccionSchema.findByPk(id);
        if(!transacciones){
            return res.status(404).json({
                msg: 'No existe Transaccion'
            });
        }
        await transacciones.update({estado: false});
        //Ingreso a la Auditoria
        auditoria.name='Regitro Transaccion';
        auditoria.descripcion=`Se cambio de estado de Transaccion ${transacciones.id}`;
        auditoria.idusuario=req.id;
        await auditoria.save();
        res.status(201).json({
            ok: true,
            transacciones
        });
    } catch (error) {
        res.status(500).json({
            msg:'Hable con el administrador'
        })
    }
}

module.exports = {
    getTransacciones,
    getTransaccionesT,
    getTransaccionesF,
    getTransaccion,
    crearTransaccion,
    editarTransaccion,
    eliminarTransaccion
}
