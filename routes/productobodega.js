/* 
    Rutas de ProductoBodega /productobodega
    host + /api/productobodega
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { getProductobodegas, getProductobodega, crearProductobodega, editarProductobodega, eliminarProductobodega, getProductobodegaContar, getProductobodegaB, getProductobodegaidContar, getProductobodegaid, editarProductobodegaProducto } = require('../controllers/productobodega');
const { existeBodega, existeProducto } = require('../helpers/db.validator');
const { validarJWT, validarCampos } = require('../middlewares');
const router = Router();


//Todas tienen que pasar por la validacion de JWT
router.use(validarJWT);

//Contar Productobodega
router.get('/contar/', getProductobodegaContar);

//Contar Productobodegaid
router.get('/contar/:productobodega', getProductobodegaidContar);

//Obtener Productobodega Filtrar
router.get('/:productobodega', getProductobodegaB);

//Obtener ProductoBodegas
router.get('/',getProductobodegas);

//Obtener ProductoBodegas
router.get('/listar/:productobodega',getProductobodegaid);

//Editar  Bodega Producto
router.put('/producto/:id',editarProductobodegaProducto);

//Obtener Productobodega
router.get('/id/:id',getProductobodega);

//Ingresar Productobodega
router.post('/',[
    check('bodega','La bodega es obligatoria').custom(existeBodega),
    check('producto','El producto es obligatoria').custom(existeProducto),
    check('codigoproducto','El codigo producto es obligatoria').not().isEmpty(),
    check('nombreproducto','El nombre producto es obligatoria').not().isEmpty(),
    check('propiedadproducto','La propiedades del producto son obligatoria').not().isEmpty(),
    check('stockminimo','El stock minimo es obligatoria').isInt(),
    check('precioventa','El precio es obligatorio').isDecimal(),
    validarCampos
],crearProductobodega);

//Editar Productobodega
router.put('/:id',editarProductobodega);

//Eliminar Productobodega
router.delete('/:id',eliminarProductobodega);

module.exports = router;