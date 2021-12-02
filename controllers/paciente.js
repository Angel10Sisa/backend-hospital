const response = require ('express');
const { AfiliacionSchema } = require('../models/Afiliacion');
const { AuditoriaSchema } = require('../models/Auditoria');
const { PacienteSchema } = require('../models/Paciente');

//Listar Paciente
const getPacientes = async (req, res=response) => {
    try {
        const pacientes = await PacienteSchema.findAll({order:['id']});
        if(pacientes){
            res.json({pacientes})
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

//Listar Paciente True
const getPacientesT = async (req, res=response) => {
    try {
        const pacientes = await PacienteSchema.findAll({where:{estado:true}});
        if(pacientes){
            res.json({pacientes})
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

//Listar Paciente False
const getPacientesF = async (req, res=response) => {
    try {
        const pacientes = await PacienteSchema.findAll({where:{estado:false}});
        if(pacientes){
            res.json({pacientes})
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

//Obtener Paciente
const getPaciente = async (req, res=response) => {
    const { id } = req.params;
    try {
        const pacientes = await PacienteSchema.findByPk(id);
        if(pacientes){
            res.json({pacientes});
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

//Crear Paciente
const crearPaciente = async (req, res=response) => {
    const { identificacion } = req.body;
    const auditoria = new AuditoriaSchema();
    try {
        let pacientes = await PacienteSchema.findOne({where: {identificacion:identificacion}});
        if(pacientes){
            return res.status(400).json({
                ok: false,
                msg: 'Paciente ya Existe'
            });
        }
        pacientes = new PacienteSchema(req.body);
        let afiliaciones = await AfiliacionSchema.findOne({where: {id:pacientes.afiliacion}});
        if(afiliaciones.estado === false){
            return res.status(400).json({
                ok: false,
                msg: 'Afiliación no esta activa'
            });
        }
        await pacientes.save();
        //Ingreso a la Auditoria
        auditoria.name='Ingreso de Paciente';
        auditoria.descripcion=`Ingreso de Paciente ${pacientes.identificacion}`;
        auditoria.idusuario=req.id;
        await auditoria.save();
        res.status(201).json({
            ok: true,
            pacientes
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

//Editar Paciente
const editarPaciente = async (req, res=response) => {
    const { id } = req.params;
    const auditoria = new AuditoriaSchema();
    try {
        let pacientes = await PacienteSchema.findByPk(id);
        if(!pacientes){
            return res.status(404).json({
                msg: 'No existe paciente'
            });
        }

        await pacientes.update(req.body);
        //Ingreso a la Auditoria
        auditoria.name='Editar Paciente';
        auditoria.descripcion=`Se edito Paciente ${pacientes.identificacion}`;
        auditoria.idusuario=req.id;
        await auditoria.save();

        res.json({pacientes})
    } catch (error) {
        res.status(500).json({
            msg:'Hable con el administrador'
        })
    }
}

//Eliminar Paciente
const eliminarPaciente = async (req, res=response) => {
    const { id } = req.params;
    const auditoria = new AuditoriaSchema();
    try {
        const pacientes = await PacienteSchema.findByPk(id);
        if(!pacientes){
            return res.status(404).json({
                msg: 'No existe Paciente'
            });
        }
        await pacientes.update({estado: false});
        //Ingreso a la Auditoria
        auditoria.name='Eliminar Paciente';
        auditoria.descripcion=`Se cambio de estado al Paciente ${pacientes.identificacion}`;
        auditoria.idusuario=req.id;
        await auditoria.save();
        res.status(201).json({
            ok: true,
            pacientes
        });
    } catch (error) {
        res.status(500).json({
            msg:'Hable con el administrador'
        })
    }
}

module.exports = {
    getPacientes,
    getPacientesT,
    getPacientesF,
    getPaciente,
    crearPaciente,
    editarPaciente,
    eliminarPaciente
}