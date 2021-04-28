/* 
    Rutas de Compra /compra
    host + /api/compra
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { getCompras, getComprasT, getComprasF, getCompra, crearCompra, editarCompra, eliminarCompra } = require('../controllers/compra');
const { existeConcepto, existeBodega, existeIva, existeDescuento, existeProveedor } = require('../helpers/db.validator');
const { validarJWT, validarCampos } = require('../middlewares');
const router = Router();


//Todas tienen que pasar por la validacion de JWT
router.use(validarJWT);

//Obtener Compras
router.get('/',getCompras);

//Obtener Compras True
router.get('/true',getComprasT);

//Obtener Compras False
router.get('/false',getComprasF);

//Obtener Compra
router.get('/:id',getCompra);

//Ingresar Compra
router.post('/',[
    check('fecha','La fecha es obligatoria').isDate(),
    check('documento','El documento es obligatoria').not().isEmpty(),
    check('concepto','El concepto es obligatoria').custom(existeConcepto),
    check('bodega','La bodega es obligatoria').custom(existeBodega),
    check('totalsiniva','El Valor es obligatoria').isDecimal(),
    check('iva','El IVA es obligatoria').custom(existeIva),
    check('valoriva','El Valor es obligatoria').isDecimal(),
    check('descuento','El descuento es obligatoria').custom(existeDescuento),
    check('valordescuento','El Valor es obligatoria').isDecimal(),
    check('total','El Valor es obligatoria').isDecimal(),
    check('proveedor','El proveedor es obligatoria').custom(existeProveedor),
    check('estado','El estado es obligatoria').not().isEmpty(),
    validarCampos
],crearCompra);

//Editar Compra
router.put('/:id',editarCompra);

//Eliminar o Liquidar Compra
router.delete('/:id',eliminarCompra);

module.exports = router;