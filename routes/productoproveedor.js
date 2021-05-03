/* 
    Rutas de Producto proveedor /productoproveedor
    host + /api/productoproveedor
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { getProductoproveedores, getProductoproveedor, crearProductoproveedor, editarProductoproveedor, eliminarProductoproveedor } = require('../controllers/productoproveedor');
const { existeProducto, existeProveedor } = require('../helpers/db.validator');
const { validarJWT, validarCampos } = require('../middlewares');
const router = Router();


//Todas tienen que pasar por la validacion de JWT
router.use(validarJWT);

//Listar Producto proveedor
router.get('/',getProductoproveedores);

//Obtener Producto proveedor
router.get('/:id',getProductoproveedor);

//Ingresar Producto proveedor
router.post('/',[
    check('producto','La producto es obligatoria').custom(existeProducto),
    check('proveedor','El proveedor es obligatoria').custom(existeProveedor),
    validarCampos
],crearProductoproveedor);

//Editar  Producto proveedor
router.put('/:id',editarProductoproveedor);

//Eliminar  Producto proveedor
router.delete('/:id',eliminarProductoproveedor);

module.exports = router;