/* 
    Rutas de Venta /venta
    host + /api/venta
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { getVentas, getVentasT, getVentasF, getVenta, crearVenta, editarVenta, eliminarVenta } = require('../controllers/venta');
const { existeConcepto, existePaciente, existeIva, existeDescuento, existeFormapago } = require('../helpers/db.validator');
const { validarJWT, validarCampos } = require('../middlewares');
const router = Router();


//Todas tienen que pasar por la validacion de JWT
router.use(validarJWT);

//Obtener Ventas
router.get('/',getVentas);

//Obtener Ventas True
router.get('/true',getVentasT);

//Obtener Ventas False
router.get('/false',getVentasF);

//Obtener Venta
router.get('/:id',getVenta);

//Ingresar Venta
router.post('/',[
    check('fecha','La fecha es obligatoria').isDate(),
    check('concepto','El concepto es obligatoria').custom(existeConcepto),
    check('paciente','El Paciente es obligatoria').custom(existePaciente),
    check('totalsiniva','El Valor es obligatoria').isDecimal(),
    check('iva','El IVA es obligatoria').custom(existeIva),
    check('valoriva','El Valor es obligatoria').isDecimal(),
    check('descuento','El descuento es obligatoria').custom(existeDescuento),
    check('valordescuento','El Valor es obligatoria').isDecimal(),
    check('total','El Valor es obligatoria').isDecimal(),
    check('formapago','La forma de pago es obligatoria').custom(existeFormapago),
    check('estado','El estado es obligatoria').not().isEmpty(),
    validarCampos
],crearVenta);

//Editar Venta
router.put('/:id',editarVenta);

//Eliminar o Liquidar Venta
router.delete('/:id',eliminarVenta);

module.exports = router;