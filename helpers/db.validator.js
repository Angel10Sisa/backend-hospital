const { CiudadSchema } = require('../models/Ciudad');
const { PaisSchema } = require('../models/Pais');
const { ProvinciaSchema } = require('../models/Provincia');
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

const existePais = async ( pais = 0) => {
    let existePais1 = await PaisSchema.findOne({ where: { id : pais } });
    if( !existePais1 ){
        throw new Error (`Los datos del pais no se encuentran en la base de datos`);
    }
}

const existeProvincia = async ( provincia = 0) => {
    let existeProvincia1 = await ProvinciaSchema.findOne({ where: { id : provincia } });
    if( !existeProvincia1 ){
        throw new Error (`Los datos de la provincia no se encuentran en la base de datos`);
    }
}

const existeCuidad = async ( ciudad = 0) => {
    let existeCuidad1 = await CiudadSchema.findOne({ where: { id : ciudad } });
    if( !existeCuidad1 ){
        throw new Error (`Los datos de la ciudad no se encuentran en la base de datos`);
    }
}

module.exports={
    esRolValido,
    emailExiste,
    existeUsuarioId,
    existePais,
    existeProvincia,
    existeCuidad
}