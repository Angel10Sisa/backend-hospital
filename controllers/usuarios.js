const  response  = require ('express');
const bcrypt = require('bcryptjs');
const { UsuarioSchema } = require('../models/Usuario');
const { generarJWT } = require('../helpers/jwt');
const { RolSchema } = require('../models/Rol');
const { AuditoriaSchema } = require('../models/Auditoria');
const Sequelize = require ('sequelize');
const Op=Sequelize.Op;

//Contar Usuarios
const getUsuarioContar = async(req, res=response) =>{
    const usuarios = await UsuarioSchema.count();
    if(usuarios){
        res.json({usuarios});
    }else{
        res.status(201).json({
            ok: false,
            msg: 'No existen Datos que mostrar'
        })
    }
}

//Contar True Usuarios
const getUsuarioContarT = async(req, res=response) =>{
    const usuarios = await UsuarioSchema.count({where:{estado:true}});
    if(usuarios){
        res.json({usuarios});
    }else{
        res.status(201).json({
            ok: false,
            msg: 'No existen Datos que mostrar'
        })
    }
}

//Contar False Usuarios
const getUsuarioContarF = async(req, res=response) =>{
    const usuarios = await UsuarioSchema.count({where:{estado:false}});
    if(usuarios){
        res.json({usuarios});
    }else{
        res.status(201).json({
            ok: false,
            msg: 'No existen Datos que mostrar'
        })
    }
}

//Listar Usuarios Busqueda
const getUsuarioB = async(req, res=response) =>{
    const { usuario } = req.params;
    if(usuario > 0){
        const usuarios = await UsuarioSchema.findAll({where:{[Op.or]:[{id:{[Op.eq]:parseInt(usuario)}}]}});
        if(usuarios){
            res.json({usuarios});

        }else{
            res.status(201).json({
                ok: false,
                msg: 'No existen Datos que mostrar'
            })
        }
    }else{
        const usuarios = await UsuarioSchema.findAll({where:{[Op.or]:[{name:{[Op.like]:'%'+usuario+'%'}},{email:{[Op.like]:'%'+usuario+'%'}}]}});
        if(usuarios){
            res.json({usuarios});

        }else{
            res.status(201).json({
                ok: false,
                msg: 'No existen Datos que mostrar'
            })
        }
    }
}

// Listar Usuario
const getUsuarios = async (req, res=response) => {
    const usuarios = await UsuarioSchema.findAll({include:[{model: RolSchema, as:'Rols'}]});
    const auditoria = new AuditoriaSchema();
    if(usuarios){
        res.json({usuarios});
    }else{
        res.status(201).json({
            ok: false,
            msg: 'No existen Datos que mostrar'
        })
    }
}

//Listar Usuarios True
const getUsuarioT = async (req, res=response) => {
    try {
        const usuarios = await UsuarioSchema.findAll({where:{estado:true}});
        if(usuarios){
            res.json({usuarios})
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
const getUsuarioF = async (req, res=response) => {
    try {
        const usuarios = await UsuarioSchema.findAll({where:{estado:false}});
        if(usuarios){
            res.json({usuarios})
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

//Obtener Usuario
const getUsuario = async (req, res=response) => {
    const { id } = req.params;
    const usuario = await UsuarioSchema.findByPk( id, {include:[{model: RolSchema, as:'Rols'}]});
    if(usuario){
        res.json({usuario});
    }else{
        res.status(201).json({
            ok: false,
            msg: 'No existen Datos con ese usuario que mostrar'
        })
    }
}

// Ingreso de Usuario
const crearUsuarios = async(req, res = response) => {
    const { name, email, password } = req.body;
    const auditoria = new AuditoriaSchema();

    try {
        let usuario = await UsuarioSchema.findOne({where:{[Op.or]:[{name:name},{email:email}]}});
        if(usuario){
            return res.status(400).json({
                ok: false,
                msg: 'Usuario ya Existe'
            });
        }
        usuario = new UsuarioSchema(req.body);
        //Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);

        await usuario.save();

        //Ingreso a la Auditoria
        auditoria.name='Ingreso de Usuario';
        auditoria.descripcion=`Ingreso de Afiliacion ${usuario.id}`;
        auditoria.idusuario=req.id;
        await auditoria.save();

        //Generar JWT
        const token = await generarJWT(usuario.id, usuario.name);
        res.status(201).json({
            ok: true,
            id: usuario.id,
            name: usuario.name,
            token
        });

    } catch (error) {    
        console.log(error); 
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

// Editar Password de Usuario
const modificarPasswordUsuarios = async(req, res = response) => {
    const { id } = req.params;
    const { body } = req;
    const auditoria = new AuditoriaSchema();

    try {
        const usuario = await UsuarioSchema.findByPk(id);
        if(!usuario){
            return res.status(404).json({
                msg: 'No existe un usuario con el id'
            });
        }
        //Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        pass = bcrypt.hashSync(body.password, salt);
        await usuario.update({password: pass});
        //Ingreso a la Auditoria
        auditoria.name='Editar Password';
        auditoria.descripcion=`Se edito password del Usuario ${usuario.id}`;
        auditoria.idusuario=req.id;
        await auditoria.save();
        res.status(201).json({
            ok: true,
            password: usuario.password
        });

    } catch (error) {    
        console.log(error); 
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

//EditarUsuario
const editarUsuarios = async(req, res=response) => {
    const { id } = req.params;
    const { body } = req;
    const auditoria = new AuditoriaSchema();
    try {
        const usuario = await UsuarioSchema.findByPk(id);
        if(!usuario){
            return res.status(404).json({
                msg: 'No existe un usuario con el id'
            });
        }
        await usuario.update(body);
        //Ingreso a la Auditoria
        auditoria.name='Editar Usuario';
        auditoria.descripcion=`Se edito Usuario ${usuario.id}`;
        auditoria.idusuario=req.id;
        await auditoria.save();
        res.status(201).json({
            ok: true,
            usuario
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg:'Hable con el administrador'
        })
        
    }
}

//Eliminar Usuario
const eliminarUsuarios = async (req, res=response) => {
    const { id } = req.params;
    const auditoria = new AuditoriaSchema();
    const usuario = await UsuarioSchema.findByPk(id);
        //await usuario.destroy(); Elmina por completo el dato
        await usuario.update({estado: false}); //Edita elestado de true a false
        //Ingreso a la Auditoria
        auditoria.name='Eliminar Usuarios';
        auditoria.descripcion=`Se cambio el estado del usuario ${usuario.id}`;
        auditoria.idusuario=req.id;
        await auditoria.save();
        res.status(201).json({
            ok: true,
            usuario
        });
}

module.exports = {
    getUsuarioContarT,
    getUsuarioContarF,
    modificarPasswordUsuarios,
    getUsuarioContar,
    getUsuarioB,
    getUsuarios,
    getUsuarioT,
    getUsuarioF,
    getUsuario,
    crearUsuarios,
    editarUsuarios,
    eliminarUsuarios

}