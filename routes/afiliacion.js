/* 
    Rutas de Afiliacion /afiliacion
    host + /api/afiliacion
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { getAfiliaciones, getAfiliacion, crearAfiliacion, editarAfiliacion, eliminarAfiliacion, getAfiliacionT, getAfiliacionF } = require('../controllers/afiliacion');
const { validarJWT, validarCampos } = require('../middlewares');
const router=Router();

//Todas tienen que pasar por la validacion de JWT
router.use(validarJWT);

//Listar Afiliacion
router.get('/',getAfiliaciones);

//Obtener Afiliacion True
router.get('/true',getAfiliacionT);

//Obtener Afiliacion False
router.get('/false',getAfiliacionF);

//Obtener Afiliacion
router.get('/:id',getAfiliacion);

//Ingresar Afiliacion
router.post('/',[
    check('afiliacion','La afiliacion es obligatoria').not().isEmpty(),
    check('descuento','El descuento es obligatoria, es el porcentaje').not().isEmpty(),
    check('valor','El valor es obligatoria').not().isEmpty(),
    check('estado','El estado es obligatoria').not().isEmpty(),
    validarCampos
],crearAfiliacion);

//Editar Afiliacion
router.put('/:id',editarAfiliacion);

//Eliminar Afiliacion
router.delete('/:id',eliminarAfiliacion);

module.exports = router;