const response = require ('express');
const { AuditoriaSchema } = require('../models/Auditoria');
const { PacienteSchema } = require('../models/Paciente');
const Sequelize = require ('sequelize');
const Op=Sequelize.Op;

//Contar Paciente
const getPacienteContar = async(req, res=response) =>{
    const pacientes = await PacienteSchema.count();
    if(pacientes){
        res.json({pacientes});
    }else{
        res.status(201).json({
            ok: false,
            msg: 'No existen Datos que mostrar'
        })
    }
}

//Contar Paciente TRUE
const getPacienteContarT = async(req, res=response) =>{
    const pacientes = await PacienteSchema.count({where:{estado:true}});
    if(pacientes){
        res.json({pacientes});
    }else{
        res.status(201).json({
            ok: false,
            msg: 'No existen Datos que mostrar'
        })
    }
}

//Contar Paciente FALSE
const getPacienteContarF = async(req, res=response) =>{
    const pacientes = await PacienteSchema.count({where:{estado:false}});
    if(pacientes){
        res.json({pacientes});
    }else{
        res.status(201).json({
            ok: false,
            msg: 'No existen Datos que mostrar'
        })
    }
}

//Listar Paciente Busqueda
const getPacienteB = async(req, res=response) =>{
    const { paciente } = req.params;
    const pacientes = await PacienteSchema.findAll({where:{[Op.or]:[{identificacion:{[Op.like]:'%'+paciente+'%'}},{apellido:{[Op.like]:'%'+paciente+'%'}},{nombre:{[Op.like]:'%'+paciente+'%'}},{email:{[Op.like]:'%'+paciente+'%'}}]}});
    if(pacientes){
        res.json({pacientes});

    }else{
        res.status(201).json({
            ok: false,
            msg: 'No existen Datos que mostrar'
        })
    }
}

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

//Obtener Paciente Cedula
const getPacienteCedula = async (req, res=response) => {
    const { cedula } = req.params;
    try {
        const pacientes = await PacienteSchema.findOne({where:{identificacion:cedula}});
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

        res.status(201).json({
            ok: true,
            pacientes
        });
    } catch (error) {
        console.log(error);
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
    getPacienteContar,
    getPacienteContarT,
    getPacienteContarF,
    getPacienteB,
    getPacientes,
    getPacientesT,
    getPacientesF,
    getPacienteCedula,
    getPaciente,
    crearPaciente,
    editarPaciente,
    eliminarPaciente
}