/* 
    Rutas de Paciente /paciente
    host + /api/paciente
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { getPacientes, getPacientesT, getPacientesF, getPaciente, crearPaciente, editarPaciente, eliminarPaciente, getPacienteContar, getPacienteContarT, getPacienteB, getPacienteContarF } = require ('../controllers/paciente');
const { existeEstadocivil, existeSexo, existeAfiliacion, existeTipopaciente, existeDireccion } = require('../helpers/db.validator');
const { validarJWT, validarCampos } = require('../middlewares');
const router = Router();


//Todas tienen que pasar por la validacion de JWT
router.use(validarJWT);

//Contar Pacientes
router.get('/contar/', getPacienteContar);

//Contar True Pacientes
router.get('/contar/T', getPacienteContarT);

//Contar False Pacientes
router.get('/contar/F', getPacienteContarF);

//Obtener Pacientes Filtrar
router.get('/:paciente', getPacienteB);

//Obtener Pacientes
router.get('/',getPacientes);

//Obtener Pacientes True
router.get('/true/true',getPacientesT);

//Obtener Pacientes False
router.get('/false/false',getPacientesF);

//Obtener Paciente
router.get('/id/:id',getPaciente);

//Ingresar Paciente
router.post('/',[
    check('identificacion', 'La identifiacion es obligatoria').not().isEmpty(),
    check('tipoidentificacion', 'El tipo de identificacion es obligatoria').not().isEmpty(),
    check('nacionalidad', 'La nacionalidad es obligatoria').not().isEmpty(),
    check('apellido', 'El apellido es obligatoria').not().isEmpty(),
    check('nombre', 'El nombre es obligatoria').not().isEmpty(),
    check('estadocivil', 'El estado civil es obligatoria').custom(existeEstadocivil),
    check('sexo', 'El sexo es obligatoria').custom(existeSexo),
    check('tipopaciente', 'El tipo paciente es obligatoria').custom(existeTipopaciente),
    check('telefono', 'El telefono es obligatoria').not().isEmpty(),
    check('celular', 'El celular es obligatoria').not().isEmpty(),
    check('email', 'El email es obligatoria').isEmail(),
    check('direccion', 'La direccion es obligatoria').custom(existeDireccion),
    check('estado', 'El estado es obligatoria').not().isEmpty(),
    validarCampos
],crearPaciente);

//Editar Paciente
router.put('/:id',editarPaciente);

//Eliminar Paciente
router.delete('/:id',eliminarPaciente);

module.exports = router;