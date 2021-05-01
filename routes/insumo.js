/* 
    Rutas de Insumo /insumo
    host + /api/insumo
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { getInsumos, getInsumo, crearInsumo, editarInsumo, eliminarInsumo } = require('../controllers/insumo');
const { existeProducto } = require('../helpers/db.validator');
const { validarJWT, validarCampos } = require('../middlewares');
const router = Router();


//Todas tienen que pasar por la validacion de JWT
router.use(validarJWT);

//Obtener Insumos
router.get('/',getInsumos);

//Obtener Insumo
router.get('/:id',getInsumo);

//Ingresar Insumo
router.post('/',[
    check('producto','El producto es obligatoria').custom(existeProducto),
    check('productoinsumo','El producto es obligatoria').custom(existeProducto),
    check('cantidad','La cantidad es obligatoria').isInt(),
    validarCampos
],crearInsumo);

//Editar Insumo
router.put('/:id',editarInsumo);

//Eliminar Insumo
router.delete('/:id',eliminarInsumo);

module.exports = router;