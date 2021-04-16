const response = require ('express');
const { DescuentoSchema } = require('../models/Descuento');
const { AuditoriaSchema } = require('../models/Auditoria');

//Listar Descuento
const getDescuentos = async(req, res = response) => {
    try {
        const descuentos = await DescuentoSchema.findAll();
        if(descuentos){
            res.json({descuentos})
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

//Obtener Descuento
const getDescuento = async(req, res = response) => {
    const { id } = req.params;
    try {
        const descuentos = await DescuentoSchema.findByPk(id);
        if(descuentos){
            res.json({descuentos});
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

//Crear Descuento
const crearDescuento = async(req, res = response) => {
    const { nombre, descuento, valor } = req.body;
    const auditoria = new AuditoriaSchema();
    try {
        let descuentos = await DescuentoSchema.findOne({where: {nombre:nombre}});
        if(descuentos){
            return res.status(400).json({
                ok: false,
                msg: 'Descuento ya Existe'
            });
        }
        descuentos = new DescuentoSchema(req.body);
        await descuentos.save();
        //Ingreso a la Auditoria
        auditoria.name='Ingreso de Descuento';
        auditoria.descripcion=`Ingreso de Descuento ${descuentos.nombre}`;
        auditoria.idusuario=req.id;
        await auditoria.save();
        res.status(201).json({
            ok: true,
            descuentos
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

//Editar Descuento
const editarDescuento = async(req, res = response) => {
    const { id } = req.params;
    const auditoria = new AuditoriaSchema();
    try {
        let descuentos = await DescuentoSchema.findByPk(id);
        if(!descuentos){
            return res.status(404).json({
                msg: 'No existe Descuento'
            });
        }
        await descuentos.update(req.body);
        //Ingreso a la Auditoria
        auditoria.name='Editar Descuento';
        auditoria.descripcion=`Se edito Descuento ${descuentos.nombre}`;
        auditoria.idusuario=req.id;
        await auditoria.save();
        res.json({descuentos})

    } catch (error) {
        res.status(500).json({
            msg:'Hable con el administrador'
        })
    }
}

//Eliminar Descuento
const eliminarDescuento = async(req, res = response) => {
    const { id } = req.params;
    const auditoria = new AuditoriaSchema();
    try {
        const descuentos = await DescuentoSchema.findByPk(id);
        if(!descuentos){
            return res.status(404).json({
                msg: 'No existe Descuento'
            });
        }
        await descuentos.destroy();
        //Ingreso a la Auditoria
        auditoria.name='Eliminar Descuento';
        auditoria.descripcion=`Se elimino Descuento ${descuentos.nombre}`;
        auditoria.idusuario=req.id;
        await auditoria.save();
        res.status(201).json({
            ok: true,
            descuentos
        });
    } catch (error) {
        res.status(500).json({
            msg:'Hable con el administrador'
        })
    }
}

module.exports = {
    getDescuentos,
    getDescuento,
    crearDescuento,
    editarDescuento,
    eliminarDescuento
}