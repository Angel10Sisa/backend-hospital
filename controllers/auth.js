const response = require('express');
const bcrypt = require('bcryptjs');
const { UsuarioSchema } = require('../models/Usuario');
const { generarJWT } = require('../helpers/jwt');

// Ingreso de Usuario
const crearUsuario = async(req, res = response) => {
    const { email, password } = req.body;

    try {
        let usuario = await UsuarioSchema.findOne({ where: { email: email } });
        if (usuario) {
            return res.status(400).json({
                ok: false,
                msg: 'Un usuario existe con ese correo'
            });
        }
        usuario = new UsuarioSchema(req.body);
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


// Login de Usuario
const loginUsuario = async(req, res = response) => {
    const { email, password } = req.body;

    try {
        let usuario = await UsuarioSchema.findOne({ where: { email: email } });
        //Verificar si el email existe
        if (!usuario) {
            return res.status(400).json({
                ok: false,
                msg: 'El usuario no existe con ese email'
            });
        }
        //Si el usuario esta activo
        if (!usuario.estado) {
            return res.status(400).json({
                ok: false,
                msg: 'Usuario Inactivo'
            });
        }

        //confirmar los passwords
        const validPassword = bcrypt.compareSync(password, usuario.password);
        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Password incorrecto'
            });
        }
        //Generar nuestro JWT
        const token = await generarJWT(usuario.id, usuario.name);

        res.json({
            ok: true,
            id: usuario.id,
            name: usuario.name,
            token
        })

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }

}


// Revalidacion de Usuario
const revalidarToken = async (req, res = response) => {

    const id = req.id;
    const name = req.name;

    //generar nuevo JWT y retornarlo en esta petición
    const token = await generarJWT(id, name);

    res.json({
        ok: true,
        id,
        name,
        token
    })
}
module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken
}