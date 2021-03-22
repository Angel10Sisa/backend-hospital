const { response } = require ('express')

const esAdminRol = (req, res = response, next)=>{
    if(!req.usuarioau){
        return res.status(500).json({
            ok: false,
            msg: 'Se quiere verificar el rol sin validar el token primero'
        });
    }
    const {rol, name} = req.usuarioau;
    if(rol !== 'administrador'){
        return res.status(401).json({
            ok: false,
            msg: 'Usted no tiene permiso para realizar esta acción'
        });
    }
    next();
}

const tieneRol = (...roles)=>{
    return(req, res = response, next) => {
        if(!req.usuarioau){
            return res.status(500).json({
                ok: false,
                msg: 'Se quiere verificar el rol sin validar el token primero'
            });
        }

        if(!roles.includes(req.usuarioau.rol)){
            return res.status(401).json({
                ok: false,
                msg: 'El servicio requiere un rol valido'
            });
        }

        next();
    }
}

module.exports={
    esAdminRol,
    tieneRol
}