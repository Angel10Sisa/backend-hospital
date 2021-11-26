/* 
    Rutas de Tipopaciente /tipopaciente
    host + /api/tipopaciente
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { getTipospacientes, getTipopaciente, crearTipopaciente, editarTipopaciente, eliminarTipopaciente, getTipopacienteContar, getTipopacienteB } = require('../controllers/tipopaciente');
const { validarJWT, validarCampos} = require('../middlewares');
const router=Router();

//Todas tienen que pasar por la validacion de JWT
router.use(validarJWT);

//Contar Tipospacientes
router.get('/contar/', getTipopacienteContar);

//Obtener Tipospacientes
router.get('/:tipopaciente', getTipopacienteB);

//Obtener Tipospacientes
router.get('/',getTipospacientes);

//Obtener Tipopaciente
router.get('/id/:id',getTipopaciente);

//Ingresar Tipopaciente
router.post('/',[
    check('tipopaciente','El tipo paciente es obligatorio').not().isEmpty(),
    validarCampos
],crearTipopaciente);

//Editar Tipopaciente
router.put('/:id',editarTipopaciente);

//Eliminar Tipopaciente
router.delete('/:id',eliminarTipopaciente);

module.exports = router;