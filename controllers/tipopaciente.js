const response = require ('express');
const { AuditoriaSchema } = require('../models/Auditoria');
const { TipopacienteSchema } = require('../models/Tipopaciente');

//Listar Tipo Paciente
const getTipospacientes = async (req, res=response) =>{
    try {
        const tipopacientes = await TipopacienteSchema.findAll();
        if(tipopacientes){
            res.json({tipopacientes})
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

//Obtener Tipo Paciente
const getTipopaciente = async (req, res=response) =>{
    const { id } = req.params;
    try {
        const tipopacientes = await TipopacienteSchema.findByPk(id);
        if(tipopacientes){
            res.json({tipopacientes});
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

//Ingresar Tipo Paciente
const crearTipopaciente = async (req, res=response) =>{
    const { tipopaciente } = req.body;
    const auditoria = new AuditoriaSchema();
    try {
        let tipopacientes = await TipopacienteSchema.findOne({where: {tipopaciente:tipopaciente}});
        if(tipopacientes){
            return res.status(400).json({
                ok: false,
                msg: 'Tipo Paciente ya Existe'
            });
        }
        tipopacientes = new TipopacienteSchema(req.body);
        await tipopacientes.save();
        //Ingreso a la Auditoria
        auditoria.name='Ingreso de Tipo Paciente';
        auditoria.descripcion=`Ingreso de Tipo Paciente ${tipopacientes.tipopaciente}`;
        auditoria.idusuario=req.id;
        await auditoria.save();
        res.status(201).json({
            ok: true,
            tipopacientes
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

//Editar Tipo Paciente
const editarTipopaciente = async (req, res=response) =>{
    const { id } = req.params;
    const auditoria = new AuditoriaSchema();
    try {
        let tipopacientes = await TipopacienteSchema.findByPk(id);
        if(!tipopacientes){
            return res.status(404).json({
                msg: 'No existe Tipo Paciente'
            });
        }
        await tipopacientes.update(req.body);
        //Ingreso a la Auditoria
        auditoria.name='Editar Tipo Paciente';
        auditoria.descripcion=`Se edito Tipo Paciente ${tipopacientes.tipopaciente}`;
        auditoria.idusuario=req.id;
        await auditoria.save();
        res.json({tipopacientes})

    } catch (error) {
        res.status(500).json({
            msg:'Hable con el administrador'
        })
    }
}

//Eliminar Tipo Paciente
const eliminarTipopaciente = async (req, res=response) =>{
    const { id } = req.params;
    const auditoria = new AuditoriaSchema();
    try {
        const tipopacientes = await TipopacienteSchema.findByPk(id);
        if(!tipopacientes){
            return res.status(404).json({
                msg: 'No existe Tipo Paciente'
            });
        }
        await tipopacientes.destroy();
        //Ingreso a la Auditoria
        auditoria.name='Eliminar Tipo Paciente';
        auditoria.descripcion=`Se elimino Tipo Paciente ${tipopacientes.tipopaciente}`;
        auditoria.idusuario=req.id;
        await auditoria.save();
        res.status(201).json({
            ok: true,
            tipopacientes
        });
    } catch (error) {
        res.status(500).json({
            msg:'Hable con el administrador'
        })
    }
}


module.exports = {
    getTipospacientes,
    getTipopaciente,
    crearTipopaciente,
    editarTipopaciente,
    eliminarTipopaciente
}