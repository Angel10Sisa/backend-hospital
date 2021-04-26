/* 
    Rutas de Transaccion /transaccion
    host + /api/transaccion
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { getTransacciones, getTransaccionesT, getTransaccionesF, getTransaccion, crearTransaccion, editarTransaccion, eliminarTransaccion } = require('../controllers/transaccion');
const { existeConcepto, existeBodega } = require('../helpers/db.validator');
const { validarJWT, validarCampos } = require('../middlewares');
const router = Router();


//Todas tienen que pasar por la validacion de JWT
router.use(validarJWT);

//Obtener Transacciones
router.get('/',getTransacciones);

//Obtener Trasacciones True
router.get('/true',getTransaccionesT);

//Obtener Transacciones False
router.get('/false',getTransaccionesF);

//Obtener Transaccion
router.get('/:id',getTransaccion);

//Ingresar Transaccion
router.post('/',[
    check('fecha','La fecha es obligatoria').isDate(),
    check('concepto','El concepto es obligatoria').custom(existeConcepto),
    check('bodegasalida','La bodega es obligatoria').custom(existeBodega),
    check('bodegaentrada','La bodega es obligatoria').custom(existeBodega),
    check('estado','El estado es obligatoria').not().isEmpty(),
    validarCampos
],crearTransaccion);

//Editar Transaccion
router.put('/:id',editarTransaccion);

//Registrar Transaccion
router.delete('/:id',eliminarTransaccion);

module.exports = router;