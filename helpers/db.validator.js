const { RolSchema } = require('../models/Rol');
const { UsuarioSchema } = require('../models/Usuario');

const esRolValido = async ( rol = null ) => {
    let existeRol = await RolSchema.findOne({ where: { rol : rol } });
    if( !existeRol ){
        throw new Error (`Los datos no se encuentran en la base de datos`);
    }
}

const emailExiste = async (email='')=>{
    let existeEmail = await UsuarioSchema.findOne({where:{email:email}});
    if(existeEmail){
        throw new Error (`El email ya existe`);
    }
}

const existeUsuarioId = async (id)=>{
    let existeUsuarioId = await UsuarioSchema.findByPk(id);
    if(!existeUsuarioId){
        throw new Error (`Usuario no existe`);
    }
}

module.exports={
    esRolValido,
    emailExiste,
    existeUsuarioId
}