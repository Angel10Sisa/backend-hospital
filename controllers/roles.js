const response = require ('express');
const { AuditoriaSchema } = require('../models/Auditoria');
const { RolSchema } = require('../models/Rol');

//Listar Roles
const getRoles = async(req, res=response) =>{
    const roles = await RolSchema.findAll();
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
    const { rol } = req.params;
    const roles = await RolSchema.findOne({where:{rol:rol}});
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
    const { rol1 } = req.params;
    const { rol, ...resto } = req.body;
    const auditoria= new AuditoriaSchema();
    try {
        const roles = await RolSchema.findOne({where:{rol:rol1}});
        if(!roles){
            return res.status(404).json({
                msg: 'No existe un rol'
            });
        }
        await roles.update(resto);
        //Ingreso a la Auditoria
        auditoria.name='Eliminar Roles';
        auditoria.descripcion=`Se edito Rol ${roles.rol}`;
        auditoria.idusuario=req.id;
        await auditoria.save();

        res.json({roles});
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg:'Hable con el administrador'
        })
    }
}

//Eliminar un Rol
const eliminarRol = async(req, res=response) =>{
    const { rol } = req.params;
    const auditoria= new AuditoriaSchema();
    const roles = await RolSchema.findOne({where: {rol:rol}});
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
    getRoles,
    getRol,
    crearRol,
    editarRol,
    eliminarRol
}