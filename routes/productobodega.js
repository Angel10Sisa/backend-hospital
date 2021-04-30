/* 
    Rutas de ProductoBodega /productobodega
    host + /api/productobodega
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { getProductobodegas, getProductobodegasT, getProductobodegasF, getProductobodega, crearProductobodega, editarProductobodega, eliminarProductobodega } = require('../controllers/productobodega');
const { existeBodega, existeProducto } = require('../helpers/db.validator');
const { validarJWT, validarCampos } = require('../middlewares');
const router = Router();


//Todas tienen que pasar por la validacion de JWT
router.use(validarJWT);

//Obtener ProductoBodegas
router.get('/',getProductobodegas);

//Obtener Productobodega
router.get('/:id',getProductobodega);

//Ingresar Productobodega
router.post('/',[
    check('bodega','La bodega es obligatoria').custom(existeBodega),
    check('producto','El producto es obligatoria').custom(existeProducto),
    check('codigoproducto','El codigo producto es obligatoria').not().isEmpty(),
    check('nombreproducto','El nombre producto es obligatoria').not().isEmpty(),
    check('propiedadproducto','La propiedades del producto son obligatoria').not().isEmpty(),
    check('stockminimo','El stock minimo es obligatoria').isInt(),
    check('stock','El stock es obligatoria').isInt(),
    check('preciocompra','El precio es obligatorio').isDecimal(),
    check('precioventa','El precio es obligatorio').isDecimal(),
    check('valortotal','El precio es obligatorio').isDecimal(),
    check('fechacaducidad','La fecha es obligatorio').isDate(),
    validarCampos
],crearProductobodega);

//Editar Productobodega
router.put('/:id',editarProductobodega);

//Eliminar Productobodega
router.delete('/:id',eliminarProductobodega);

module.exports = router;