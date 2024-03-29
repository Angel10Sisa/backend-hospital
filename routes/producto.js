/* 
    Rutas de Producto /producto
    host + /api/producto
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { getProductos, getProductosT, getProductosF, getProducto, crearProducto, editarProducto, eliminarProducto, getProductoContar, getProductoContarF, getProductoB, getProductoContarT } = require('../controllers/producto');
const { existeTipoproducto } = require('../helpers/db.validator');
const { validarJWT, validarCampos } = require('../middlewares');
const router = Router();


//Todas tienen que pasar por la validacion de JWT
router.use(validarJWT);

//Contar Producto
router.get('/contar/', getProductoContar);

//Contar True Producto
router.get('/contar/T', getProductoContarT);

//Contar False Producto
router.get('/contar/F', getProductoContarF);

//Obtener Producto Filtrar
router.get('/:producto', getProductoB);

//Obtener Productos
router.get('/',getProductos);

//Obtener Productos True
router.get('/true/true',getProductosT);

//Obtener Productos False
router.get('/false/false',getProductosF);

//Obtener Producto
router.get('/id/:id',getProducto);

//Ingresar Producto
router.post('/',[
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('tipoproducto','El Tipo producto es obligatorio').custom(existeTipoproducto),
    check('propiedad','La propiedad es obligatorio').not().isEmpty(),
    check('codigo','El codigo es obligatorio').not().isEmpty(),
    check('stockminimo','El Stock es obligatorio').isInt(),
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