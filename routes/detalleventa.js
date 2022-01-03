/* 
    Rutas de Detalle Venta /detalleventa
    host + /api/detalleventa
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { getDetalleventas, getDetalleventa, crearDetalleventa, editarDetalleventa, eliminarDetalleventa, getDetalleventaID, getDetalleventaSumar } = require('../controllers/detalleventa');
const { existeProducto, existeVenta } = require('../helpers/db.validator');
const { validarJWT, validarCampos } = require('../middlewares');
const router = Router();


//Todas tienen que pasar por la validacion de JWT
router.use(validarJWT);

//Obtener Detalletransacciones Trasacciones
router.get('/sumar/:detalleventa',getDetalleventaSumar);

//Obtener Detalletransacciones Trasacciones
router.get('/listar/:detalleventa',getDetalleventaID);

//Listar Detalle Venta
router.get('/',getDetalleventas);

//Obtener Detalle Venta
router.get('/id/:id',getDetalleventa);

//Ingresar etalle Venta
router.post('/',[
    check('venta','La venta es obligatoria').custom(existeVenta),
    check('producto','La producto es obligatoria').custom(existeProducto),
    check('cantidad','La cantidad es obligatoria').isInt(),
    check('preciounitario','El precio es obligatoria').isDecimal(),
    check('total','El total es obligatoria').isDecimal(),
    check('nombreproducto','El nombre producto es obligatorio').not().isEmpty(),
    validarCampos
],crearDetalleventa);

//Editar Detalle Venta
router.put('/:id',editarDetalleventa);

//Eliminar etalle Venta
router.delete('/:id',eliminarDetalleventa);

module.exports = router;