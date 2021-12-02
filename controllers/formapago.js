const response = require ('express');
const { AuditoriaSchema } = require('../models/Auditoria');
const { FormapagoSchema } = require('../models/Formapago');

//Listar Formapago
const getFormaspagos = async ( req, res=response ) => {
    try {
        const formapagos = await FormapagoSchema.findAll({order:['id']});
        if(formapagos){
            res.json({formapagos})
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

//Obtener Formapago
const getFormapago = async ( req, res=response ) => {
    const { id } = req.params;
    try {
        const formapagos = await FormapagoSchema.findByPk(id);
        if(formapagos){
            res.json({formapagos});
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

//Ingresar Formapago
const crearFormapago = async ( req, res=response ) => {
    const { formapago } = req.body;
    const auditoria = new AuditoriaSchema();
    try {
        let formapagos = await FormapagoSchema.findOne({where: {formapago:formapago}});
        if(formapagos){
            return res.status(400).json({
                ok: false,
                msg: 'Forma pago ya Existe'
            });
        }
        formapagos = new FormapagoSchema(req.body);
        await formapagos.save();
        //Ingreso a la Auditoria
        auditoria.name='Ingreso de Forma Pago';
        auditoria.descripcion=`Ingreso de Forma Pago ${formapagos.formapago}`;
        auditoria.idusuario=req.id;
        await auditoria.save();
        res.status(201).json({
            ok: true,
            formapagos
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

//Editar Formapago
const editarFormapago = async ( req, res=response ) => {
    const { id } = req.params;
    const auditoria = new AuditoriaSchema();
    try {
        let formapagos = await FormapagoSchema.findByPk(id);
        if(!formapagos){
            return res.status(404).json({
                msg: 'No existe Forma Pago'
            });
        }
        await formapagos.update(req.body);
        //Ingreso a la Auditoria
        auditoria.name='Editar Forma Pago';
        auditoria.descripcion=`Se edito Forma Pago ${formapagos.formapago}`;
        auditoria.idusuario=req.id;
        await auditoria.save();
        res.status(201).json({
            ok: true,
            formapagos
        });
    } catch (error) {
        res.status(500).json({
            msg:'Hable con el administrador'
        })
    }
}

//Eliminar Formapago
const eliminarFormapago = async ( req, res=response ) => {
    const { id } = req.params;
    const auditoria = new AuditoriaSchema();
    try {
        const formapagos = await FormapagoSchema.findByPk(id);
        if(!formapagos){
            return res.status(404).json({
                msg: 'No existe Forma Pagos'
            });
        }
        await formapagos.destroy();
        //Ingreso a la Auditoria
        auditoria.name='Eliminar Forma Pagos';
        auditoria.descripcion=`Se elimino Forma Pagos ${formapagos.formapago}`;
        auditoria.idusuario=req.id;
        await auditoria.save();
        res.status(201).json({
            ok: true,
            formapagos
        });
    } catch (error) {
        res.status(500).json({
            msg:'Hable con el administrador'
        })
    }
}

module.exports = {
    getFormaspagos,
    getFormapago,
    crearFormapago,
    editarFormapago,
    eliminarFormapago
}