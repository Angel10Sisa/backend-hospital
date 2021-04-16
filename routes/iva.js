/* 
    Rutas de Iva /iva
    host + /api/iva
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { getIvas, getIva, crearIva, editarIva, eliminarIva } = require('../controllers/iva');
const { validarJWT, validarCampos } = require('../middlewares');
const router=Router();

//Todas tienen que pasar por la validacion de JWT
router.use(validarJWT);

//Obtener Ivas
router.get('/',getIvas);

//Obtener Iva
router.get('/:id',getIva);

//Ingresar Iva
router.post('/',[
    check('iva','El iva es obligatorio').not().isEmpty(),
    check('valor','El valor es obligatorio').not().isEmpty(),
    validarCampos
],crearIva);

//Editar Iva
router.put('/:id',editarIva);

//Eliminar Iva
router.delete('/:id',eliminarIva);

module.exports = router;