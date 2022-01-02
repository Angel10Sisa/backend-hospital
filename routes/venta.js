/* 
    Rutas de Venta /venta
    host + /api/venta
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { getVentas, getVentasT, getVentasF, getVenta, crearVenta, editarVenta, eliminarVenta, getVentasContar, getVentasContarT, getVentasContarF, getVentasFecha, getVentasB } = require('../controllers/venta');
const { existeConcepto, existePaciente, existeIva, existeDescuento, existeFormapago, existeBodega } = require('../helpers/db.validator');
const { validarJWT, validarCampos } = require('../middlewares');
const router = Router();


//Todas tienen que pasar por la validacion de JWT
router.use(validarJWT);

//Contar Ventas
router.get('/contar/', getVentasContar);

//Contar True Ventas
router.get('/contar/T', getVentasContarT);

//Contar False Ventas
router.get('/contar/F', getVentasContarF);

//Filtrar por Fecha
router.post('/fecha/',[
    check('fecha1','La fecha es obligatoria').not(),
    check('fecha2','La fecha es obligatoria').not(),
    validarCampos
], getVentasFecha);

//Filtrar Ventas
router.get('/:venta', getVentasB);

//Obtener Ventas
router.get('/',getVentas);

//Obtener Ventas True
router.get('/true/true',getVentasT);

//Obtener Ventas False
router.get('/false/false',getVentasF);

//Obtener Venta
router.get('/id/:id',getVenta);

//Ingresar Venta
router.post('/',[
    check('fecha','La fecha es obligatoria').isDate(),
    check('concepto','El concepto es obligatoria').custom(existeConcepto),
    check('paciente','El Paciente es obligatoria').custom(existePaciente),
    check('total','El Valor es obligatoria').isDecimal(),
    check('estado','El estado es obligatoria').not().isEmpty(),
    check('identificacion','La identificacion es obligatoria').not().isEmpty(),
    check('bodega','La bodega es obligatoria').custom(existeBodega),
    validarCampos
],crearVenta);

//Editar Venta
router.put('/:id',editarVenta);

//Eliminar o Liquidar Venta
router.delete('/:id',eliminarVenta);

module.exports = router;