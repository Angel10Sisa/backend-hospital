const  response  = require ('express');
const bcrypt = require('bcryptjs');
const { UsuarioSchema } = require('../models/Usuario');
const { generarJWT } = require('../helpers/jwt');
const { RolSchema } = require('../models/Rol');
const { AuditoriaSchema } = require('../models/Auditoria');

// Listar Usuario
const getUsuarios = async (req, res=response) => {
    const usuarios = await UsuarioSchema.findAll({include:[{model: RolSchema, as:'Rols'}]});
    const auditoria = new AuditoriaSchema();
    if(usuarios){
        res.json({usuarios});
        //Ingreso a la Auditoria
        auditoria.name='Lista Usuarios';
        auditoria.descripcion='Se listo Usuarios';
        auditoria.idusuario=req.id;
        await auditoria.save();
    }else{
        res.status(201).json({
            ok: false,
            msg: 'No existen Datos que mostrar'
        })
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
    const { email, password } = req.body;
    const auditoria = new AuditoriaSchema();

    try {
        let usuario = new UsuarioSchema(req.body);
        
        //Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);

        await usuario.save();

        //Ingreso a la Auditoria
        auditoria.name='Ingreso de Usuario';
        auditoria.descripcion='Se ingreso un nuevo usuario';
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

//EditarUsuario
const editarUsuarios = async(req, res=response) => {
    const { id } = req.params;
    const { body } = req;
    try {
        const usuario = await UsuarioSchema.findByPk(id);
        if(!usuario){
            return res.status(404).json({
                msg: 'No existe un usuario con el id'
            });
        }
        await usuario.update(body);
        res.json(usuario);
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
    const auditoria=new AuditoriaSchema();
    const usuario = await UsuarioSchema.findByPk(id);
        //await usuario.destroy(); Elmina por completo el dato
        await usuario.update({estado: false}); //Edita elestado de true a false
        //Ingreso a la Auditoria
        auditoria.name='Eliminar Usuarios';
        auditoria.descripcion='Se cambio el estado del usuario';
        auditoria.idusuario=req.id;
        await auditoria.save();
        res.status(201).json({
            ok: true,
            usuario
        });
}

module.exports = {
    getUsuarios,
    getUsuario,
    crearUsuarios,
    editarUsuarios,
    eliminarUsuarios

}