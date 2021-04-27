/* 
    Rutas de Producto /producto
    host + /api/producto
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { getProductos, getProductosT, getProductosF, getProducto, crearProducto, editarProducto, eliminarProducto } = require('../controllers/producto');
const { existeTipoproducto } = require('../helpers/db.validator');
const { validarJWT, validarCampos } = require('../middlewares');
const router = Router();


//Todas tienen que pasar por la validacion de JWT
router.use(validarJWT);

//Obtener Productos
router.get('/',getProductos);

//Obtener Productos True
router.get('/true',getProductosT);

//Obtener Productos False
router.get('/false',getProductosF);

//Obtener Producto
router.get('/:id',getProducto);

//Ingresar Producto
router.post('/',[
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('tipoproducto','El Tipo producto es obligatorio').custom(existeTipoproducto),
    check('propiedad','La propiedad es obligatorio').not().isEmpty(),
    check('codigo','El codigo es obligatorio').not().isEmpty(),
    check('fechavencimiento','La fecha de vencimiento es obligatoria').isDate(),
    check('preciocompra','El Precio es obligatorio').isDecimal(),
    check('precioventa','El Precio es obligatorio').isDecimal(),
    check('stockmaximo','El Stock es obligatorio').isInt(),
    check('stockminimo','El Stock es obligatorio').isInt(),
    check('preciototalcompra','El Precio es obligatorio').isDecimal(),
    check('preciototalventa','El Precio es obligatorio').isDecimal(),
    check('identificador','El identificador es obligatorio').not().isEmpty(),
    check('descripcion','La descripcion es obligatoria').not().isEmpty(),
    check('estado','El estado es obligatorio').not().isEmpty(),
    validarCampos
],crearProducto);

//Editar Producto
router.put('/:id',editarProducto);

//Eliminar Producto
router.delete('/:id',eliminarProducto);

module.exports = router;