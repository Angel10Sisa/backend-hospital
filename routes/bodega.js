/* 
    Rutas de Bodega /bodega
    host + /api/bodega
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { getBodegas, getBodega, crearBodega, editarBodega, eliminarBodega } = require('../controllers/bodega');
const { validarJWT, validarCampos } = require('../middlewares');
const router=Router();

//Todas tienen que pasar por la validacion de JWT
router.use(validarJWT);

//Obtener Bodegas
router.get('/',getBodegas);

//Obtener Bodega
router.get('/:id',getBodega);

//Ingresar Bodega
router.post('/',[
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('sede','La sede es obligatorio').not().isEmpty(),
    check('estado','El estado es obligatorio').not().isEmpty(),
    validarCampos
],crearBodega);

//Editar Bodega
router.put('/:id',editarBodega);

//Eliminar Bodega
router.delete('/:id',eliminarBodega);

module.exports = router;