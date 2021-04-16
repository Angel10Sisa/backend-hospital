/* 
    Rutas de Descuento /descuento
    host + /api/descuento
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { getDescuentos, getDescuento, crearDescuento, editarDescuento, eliminarDescuento } = require('../controllers/descuento');
const { validarJWT, validarCampos} = require('../middlewares');
const router=Router();

//Todas tienen que pasar por la validacion de JWT
router.use(validarJWT);

//Obtener Descuentos
router.get('/',getDescuentos);

//Obtener Descuento
router.get('/:id',getDescuento);

//Ingresar Descuento
router.post('/',[
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('descuento','El descuento es obligatorio').not().isEmpty(),
    check('valor','El valor es obligatorio').not().isEmpty(),
    validarCampos
],crearDescuento);

//Editar Descuento
router.put('/:id',editarDescuento);

//Eliminar Descuento
router.delete('/:id',eliminarDescuento);

module.exports = router;