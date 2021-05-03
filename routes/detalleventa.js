/* 
    Rutas de Detalle Venta /detalleventa
    host + /api/detalleventa
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { getDetalleventas, getDetalleventa, crearDetalleventa, editarDetalleventa, eliminarDetalleventa } = require('../controllers/detalleventa');
const { existeProducto, existeVenta, existeBodega } = require('../helpers/db.validator');
const { validarJWT, validarCampos } = require('../middlewares');
const router = Router();


//Todas tienen que pasar por la validacion de JWT
router.use(validarJWT);

//Listar Detalle Venta
router.get('/',getDetalleventas);

//Obtener Detalle Venta
router.get('/:id',getDetalleventa);

//Ingresar etalle Venta
router.post('/',[
    check('venta','La venta es obligatoria').custom(existeVenta),
    check('producto','La producto es obligatoria').custom(existeProducto),
    check('bodega','La bodega es obligatoria').custom(existeBodega),
    check('cantidad','La cantidad es obligatoria').isInt(),
    check('preciounitario','El precio es obligatoria').isDecimal(),
    check('total','El total es obligatoria').isDecimal(),
    validarCampos
],crearDetalleventa);

//Editar Detalle Venta
router.put('/:id',editarDetalleventa);

//Eliminar etalle Venta
router.delete('/:id',eliminarDetalleventa);

module.exports = router;