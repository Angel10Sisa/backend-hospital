/* 
    Rutas de Detalletransaccion /detalletransaccion
    host + /api/detalletransaccion
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { getDetalletransacciones, getDetalletransaccion, crearDetalletransaccion, editarDetalletransaccion, eliminarDetalletransaccion } = require('../controllers/destalletransaccion');
const { existeProducto, existeTransaccion } = require('../helpers/db.validator');
const { validarJWT, validarCampos } = require('../middlewares');
const router = Router();


//Todas tienen que pasar por la validacion de JWT
router.use(validarJWT);

//Obtener Detalletransacciones
router.get('/',getDetalletransacciones);

//Obtener Detalletransaccion
router.get('/:id',getDetalletransaccion);

//Ingresar Detalletransaccion
router.post('/',[
    check('transaccion','La transaccion es obligatoria').custom(existeTransaccion),
    check('producto','La producto es obligatoria').custom(existeProducto),
    check('cantidad','La cantidad es obligatoria').isInt(),
    validarCampos
],crearDetalletransaccion);

//Editar Detalletransaccion
router.put('/:id',editarDetalletransaccion);

//Eliminar Detalletransaccion
router.delete('/:id',eliminarDetalletransaccion);

module.exports = router;