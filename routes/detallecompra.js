/* 
    Rutas de Detalle Compra /detallecompra
    host + /api/detalleventa
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { getDetallecompras, getDetallecompra, editarDetallecompra, crearDetallecompra, eliminarDetallecompra, getDetallecompraID, editarDetallecompraProducto } = require('../controllers/detallecompra');
const { existeProducto, existeCompra } = require('../helpers/db.validator');
const { validarJWT, validarCampos } = require('../middlewares');
const router = Router();


//Todas tienen que pasar por la validacion de JWT
router.use(validarJWT);

//Obtener ProductoBodegas
router.get('/listar/:detallecompra',getDetallecompraID);

//Listar Detalle compra
router.get('/',getDetallecompras);

//Obtener Detalle Compra
router.get('/id/:id',getDetallecompra);

//Ingresar Detalle Compra
router.post('/',[
    check('compra','La compra es obligatoria').custom(existeCompra),
    check('producto','La producto es obligatoria').custom(existeProducto),
    check('cantidad','La cantidad es obligatoria').isInt(),
    check('preciounitario','El precio es obligatoria').isDecimal(),
    check('total','El total es obligatoria').isDecimal(),
    check('nombreproducto','El nombre producto es obligatorio').not().isEmpty(),
    validarCampos
],crearDetallecompra);

//Editar  Detalle Compra
router.put('/:id',editarDetallecompra);

//Eliminar  Detalle Compra
router.delete('/:id',eliminarDetallecompra);

module.exports = router;