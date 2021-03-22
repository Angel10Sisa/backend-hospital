const  response  = require ('express');
const bcrypt = require('bcryptjs');
const { UsuarioSchema } = require('../models/Usuario');
const { generarJWT } = require('../helpers/jwt');
const { RolSchema } = require('../models/Rol');

// Listar Usuario
const getUsuarios = async (req, res=response) => {
    const usuarios = await UsuarioSchema.findAll({include:[{model: RolSchema, as:'Rols'}]});
    if(usuarios){
        res.json({usuarios});
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

    try {
        let usuario = new UsuarioSchema(req.body);
        //Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);

        await usuario.save();

        //Generar JWT
        const token = await generarJWT(usuario.id, usuario.name);
        res.status(201).json({
            ok: true,
            id: usuario.id,
            name: usuario.name,
            token
        });

    } catch (error) {     
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
    const usuario = await UsuarioSchema.findByPk(id);
        //await usuario.destroy(); Elmina por completo el dato
        await usuario.update({estado: false}); //Edita elestado de true a false
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