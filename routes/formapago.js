/* 
    Rutas de Formapago /formapago
    host + /api/formapago
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { getFormaspagos, getFormapago, crearFormapago, editarFormapago, eliminarFormapago } = require('../controllers/formapago');
const { validarJWT, validarCampos } = require('../middlewares');
const router=Router();

//Todas tienen que pasar por la validacion de JWT
router.use(validarJWT);

//Obtener Formaspagos
router.get('/',getFormaspagos);

//Obtener Formapago
router.get('/:id',getFormapago);

//Ingresar Formapago
router.post('/',[
    check('formapago','La forma pago es obligatoria').not().isEmpty(),
    validarCampos
],crearFormapago);

//Editar Formapago
router.put('/:id',editarFormapago);

//Eliminar Formapago
router.delete('/:id',eliminarFormapago);

module.exports = router;