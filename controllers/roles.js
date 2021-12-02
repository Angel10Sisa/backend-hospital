const response = require ('express');
const { AuditoriaSchema } = require('../models/Auditoria');
const { RolSchema } = require('../models/Rol');
const Sequelize = require ('sequelize');
const Op=Sequelize.Op;

//Listar Roles
const getRolContar = async(req, res=response) =>{
    const roles = await RolSchema.count();
    if(roles){
        res.json({roles});
    }else{
        res.status(201).json({
            ok: false,
            msg: 'No existen Datos que mostrar'
        })
    }
}

//Listar Roles
const getRoles = async(req, res=response) =>{
    const roles = await RolSchema.findAll({order:['id']});
    if(roles){
        res.json({roles});

    }else{
        res.status(201).json({
            ok: false,
            msg: 'No existen Datos que mostrar'
        })
    }
}

//Listar Roles Busqueda
const getRolesB = async(req, res=response) =>{
    const { rol } = req.params;
    const roles = await RolSchema.findAll({where:{[Op.or]:[{rol:{[Op.like]:'%'+rol+'%'}},{descripcion:{[Op.like]:'%'+rol+'%'}}]}});
    if(roles){
        res.json({roles});

    }else{
        res.status(201).json({
            ok: false,
            msg: 'No existen Datos que mostrar'
        })
    }
}

//Obtener un Rol
const getRol = async(req, res=response) =>{
    const { id } = req.params;
    const roles = await RolSchema.findByPk(id);
    if(roles){
        res.json({roles});
    }else{
        res.status(201).json({
            ok: false,
            msg: 'No existen Datos que mostrar'
        })
    }
}

//Ingresar un Rol
const crearRol = async(req, res=response) =>{
    const { rol }= req.body;
    const auditoria = new AuditoriaSchema();
    try {
        let roles = await RolSchema.findOne({where: {rol:rol}});
        if(roles){
            return res.status(400).json({
                ok: false,
                msg: 'Un Rol existe con ese nombre'
            });
        }
        roles = new RolSchema(req.body);
        await roles.save();

        //Ingreso a la Auditoria
        auditoria.name='Ingreso nuevo Roles';
        auditoria.descripcion=`Se ingreso Rol ${roles.rol}`;
        auditoria.idusuario=req.id;
        await auditoria.save();

        res.status(201).json({
            ok: true,
            roles
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });        
    }
}

//Editar un Rol
const editarRol = async(req, res=response) =>{
    const { id } = req.params;
    const auditoria= new AuditoriaSchema();
    try {
        let roles = await RolSchema.findByPk(id);
        if(!roles){
            return res.status(404).json({
                msg: 'No existe un rol'
            });
        }
        await roles.update(req.body);
        //Ingreso a la Auditoria
        auditoria.name='Editar Roles';
        auditoria.descripcion=`Se edito Rol ${roles.rol}`;
        auditoria.idusuario=req.id;
        await auditoria.save();
        res.status(201).json({
            ok: true,
            roles
        });
    } catch (error) {
        res.status(500).json({
            msg:'Hable con el administrador'
        })
    }
}

//Eliminar un Rol
const eliminarRol = async(req, res=response) =>{
    const { id } = req.params;
    const auditoria= new AuditoriaSchema();
    let roles = await RolSchema.findByPk(id);
    if(!roles){
        return res.status(404).json({
            msg: 'No existe un rol'
        });
    }
    await roles.destroy();
    //Ingreso a la Auditoria
    auditoria.name='Eliminar Roles';
    auditoria.descripcion=`Se elimino Rol ${roles.rol}`;
    auditoria.idusuario=req.id;
    await auditoria.save();

    res.status(201).json({
        ok: true,
        roles
    });
}

module.exports = {
    getRolContar,
    getRoles,
    getRolesB,
    getRol,
    crearRol,
    editarRol,
    eliminarRol
}