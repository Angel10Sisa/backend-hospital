/* 
    Rutas de Bodega /bodega
    host + /api/bodega
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { getBodegas, getBodega, crearBodega, editarBodega, eliminarBodega, getBodegasT, getBodegasF, getBodegaB, getBodegaContar, getBodegaContarT, getBodegaContarF } = require('../controllers/bodega');
const { validarJWT, validarCampos } = require('../middlewares');
const router=Router();

//Todas tienen que pasar por la validacion de JWT
router.use(validarJWT);

//Contar Bodegas
router.get('/contar/', getBodegaContar);

//Contar True Bodegas
router.get('/contar/T', getBodegaContarT);

//Contar False Bodegas
router.get('/contar/F', getBodegaContarF);

//Obtener Bodegas
router.get('/:bodega', getBodegaB);

//Obtener Bodegas
router.get('/',getBodegas);

//Obtener Bodegas True
router.get('/true/true',getBodegasT);

//Obtener Bodegas False
router.get('/false/false',getBodegasF);

//Obtener Bodega
router.get('/id/:id',getBodega);

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