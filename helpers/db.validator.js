const { AfiliacionSchema } = require('../models/Afiliacion');
const { CiudadSchema } = require('../models/Ciudad');
const { DireccionSchema } = require('../models/Direccion');
const { EstadocivilSchema } = require('../models/Estadocivil');
const { PaisSchema } = require('../models/Pais');
const { ProvinciaSchema } = require('../models/Provincia');
const { RolSchema } = require('../models/Rol');
const { SexoSchema } = require('../models/Sexo');
const { TipoidentificacionSchema } = require('../models/Tipoidentificacion');
const { TipopacienteSchema } = require('../models/Tipopaciente');
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

const existeDireccion = async ( direccion = 0) => {
    let existeDireccion1 = await DireccionSchema.findOne({ where: { id : direccion } });
    if( !existeDireccion1 ){
        throw new Error (`Los datos de la direccion no se encuentran en la base de datos`);
    }
}

const existeEstadocivil = async ( estadocivil = 0 ) => {
    let existeEstadocivil1 = await EstadocivilSchema.findOne({ where: { id : estadocivil } });
    if( !existeEstadocivil1 ){
        throw new Error (`Los datos del Estado Civil no se encuentran en la base de datos`);
    }
}

const existeSexo = async ( sexo = 0 ) => {
    let existeSexo1 = await SexoSchema.findOne({ where: { id : sexo } });
    if( !existeSexo1 ){
        throw new Error (`Los datos de Sexo no se encuentran en la base de datos`);
    }
}

const existeAfiliacion = async ( afiliacion = 0 ) => {
    let existeAfiliacion1 = await AfiliacionSchema.findOne({ where: { id : afiliacion } });
    if( !existeAfiliacion1 ){
        throw new Error (`Los datos de la Afiliacion no se encuentran en la base de datos`);
    }
}

const existeTipopaciente = async ( tipopaciente = 0 ) => {
    let existeTipopaciente1 = await TipopacienteSchema.findOne({ where: { id : tipopaciente } });
    if( !existeTipopaciente1 ){
        throw new Error (`Los datos del Tipo paciente no se encuentran en la base de datos`);
    }
}



module.exports={
    esRolValido,
    emailExiste,
    existeUsuarioId,
    existePais,
    existeProvincia,
    existeCuidad,
    existeDireccion,
    existeEstadocivil,
    existeSexo,
    existeAfiliacion,
    existeTipopaciente,
}