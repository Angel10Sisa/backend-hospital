
const {response}=require('express');
const jwt=require('jsonwebtoken');
const { UsuarioSchema } = require('../models/Usuario');


const validarJWT = async (req, res = response, next)=>{
    //x-token headers
    const token=req.header('x-token');
    if(!token){
        return res.status(401).json({
            ok: false,
            msg: 'No hay token en la petición'
        });
    }

    try {
        const { id, name, rol } = jwt.verify(
            token,
            process.env.SECRET_JWT_SEED
        );
        // Leer el usuario que corresponde al id
        const usuarioau = await UsuarioSchema.findByPk(id);

        // Verificar si Usuario existe en base de datos
        if(!usuarioau){
            return res.status(401).json({
                ok: false,
                msg: 'Usuario no Existe'
            });
        }

        // Verficar si el estado esta en true
        if(!usuarioau.estado){
            return res.status(401).json({
                ok: false,
                msg: 'Token no valido'
            });
        }

        req.usuarioau = usuarioau;
        req.id = id;
        req.name = name;  
        req.rol = rol;     
    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Token no valido'
        })
    }

    next();
}

module.exports={
    validarJWT
}