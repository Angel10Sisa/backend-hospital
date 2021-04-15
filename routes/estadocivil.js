const { Router } = require('express');
const { check } = require('express-validator');
const { getEstadosciviles, getEstadocivil, crearEstadocivil, editarEstadocivil, eliminarEstadocivil } = require('../controllers/estadocivil');
const { validarJWT, validarCampos } = require('../middlewares');
const router=Router();

//Todas tienen que pasar por la validacion de JWT
router.use(validarJWT);

//Obtener EstadosCiviles
router.get('/',getEstadosciviles);

//Obtener Estado Civil
router.get('/:id',getEstadocivil);

//Ingresar Estado Civil
router.post('/',[
    check('estadocivil','El estado civil es obligatorio').not().isEmpty(),
    validarCampos
],crearEstadocivil);

//Editar Estado Civil
router.put('/:id',editarEstadocivil);

//Eliminar Estado Civil
router.delete('/:id',eliminarEstadocivil);

module.exports = router;