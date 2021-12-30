/* 
    Rutas de Transaccion /transaccion
    host + /api/transaccion
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { getTransacciones, getTransaccionesT, getTransaccionesF, getTransaccion, crearTransaccion, editarTransaccion, eliminarTransaccion, getTransaccionesContar, getTransaccionesContarT, getTransaccionesContarF, getTransaccionesFecha, getTransaccionB } = require('../controllers/transaccion');
const { existeConcepto, existeBodega } = require('../helpers/db.validator');
const { validarJWT, validarCampos } = require('../middlewares');
const router = Router();


//Todas tienen que pasar por la validacion de JWT
router.use(validarJWT);

//Contar Compras
router.get('/contar/', getTransaccionesContar);

//Contar True Compras
router.get('/contar/T', getTransaccionesContarT);

//Contar False Compras
router.get('/contar/F', getTransaccionesContarF);

//Filtrar por Fecha
router.post('/fecha/',[
    check('fecha1','La fecha es obligatoria').not(),
    check('fecha2','La fecha es obligatoria').not(),
    validarCampos
], getTransaccionesFecha);

//Obtener Transacciones
router.get('/',getTransacciones);

//Obtener Trasacciones True
router.get('/true/true',getTransaccionesT);

//Obtener Transacciones False
router.get('/false/false',getTransaccionesF);

//Obtener Transaccion
router.get('/id/:id',getTransaccion);

//Filtrar Transaccion
router.get('/:transaccion', getTransaccionB);

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