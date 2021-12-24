/* 
    Rutas de Compra /compra
    host + /api/compra
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { getCompras, getComprasT, getComprasF, getCompra, crearCompra, editarCompra, eliminarCompra, getCompraContar, getCompraContarT, getCompraContarF, getCompraB, getCompraF } = require('../controllers/compra');
const { existeConcepto, existeBodega, existeIva, existeDescuento, existeProveedor } = require('../helpers/db.validator');
const { validarJWT, validarCampos } = require('../middlewares');
const router = Router();


//Todas tienen que pasar por la validacion de JWT
router.use(validarJWT);

//Contar Compras
router.get('/contar/', getCompraContar);

//Contar True Compras
router.get('/contar/T', getCompraContarT);

//Contar False Compras
router.get('/contar/F', getCompraContarF);

//Filtrar Compras
router.get('/:compra', getCompraB);

//Filtrar por Fecha
router.post('/fecha/',[
    check('fecha1','La fecha es obligatoria').not(),
    check('fecha2','La fecha es obligatoria').not(),
    validarCampos
], getCompraF);

//Listar Compras
router.get('/',getCompras);

//Obtener Compras True
router.get('/true/true',getComprasT);

//Obtener Compras False
router.get('/false/false',getComprasF);

//Obtener Compra
router.get('/id/:id',getCompra);

//Ingresar Compra
router.post('/',[
    check('fecha','La fecha es obligatoria').isDate(),
    check('documento','El documento es obligatoria').not().isEmpty(),
    check('concepto','El concepto es obligatoria').custom(existeConcepto),
    check('bodega','La bodega es obligatoria').custom(existeBodega),
    check('totalsiniva','El Valor es obligatoria').isDecimal(),
    check('valoriva','El Valor es obligatoria').isDecimal(),
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