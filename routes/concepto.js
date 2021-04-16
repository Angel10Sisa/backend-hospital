/* 
    Rutas de Concepto /concepto
    host + /api/concepto
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { getConceptos, getConcepto, crearConcepto, editarConcepto, eliminarConcepto } = require('../controllers/concepto');
const { validarJWT, validarCampos } = require('../middlewares');
const router=Router();

//Todas tienen que pasar por la validacion de JWT
router.use(validarJWT);

//Obtener Conceptos
router.get('/',getConceptos);

//Obtener Concepto
router.get('/:id',getConcepto);

//Ingresar Concepto
router.post('/',[
    check('concepto','El concepto es obligatorio').not().isEmpty(),
    validarCampos
],crearConcepto);

//Editar Concepto
router.put('/:id',editarConcepto);

//Eliminar Concepto
router.delete('/:id',eliminarConcepto);

module.exports = router;