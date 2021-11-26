/* 
    Rutas de Tipoidentificacion /tipoidentificacion
    host + /api/tipoidentificacion
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { getTipoidentificaciones, getTipoidentificacion, crearTipoidentificacion, editarTipoidentificacion, eliminarTipoidentificacion, getTipoidentificacionesContar, getTipoidentificacionesB } = require('../controllers/tipoidentificacion');
const { validarJWT, validarCampos } = require('../middlewares');
const router = Router();

//Todas tienen que pasar por la validacion de JWT
router.use(validarJWT);

//Obtener Tipoidentificaciones
router.get('/contar/', getTipoidentificacionesContar);

//Obtener Tipoidentificaciones
router.get('/:tipo', getTipoidentificacionesB);

//Obtener Tipoidentificaciones
router.get('/',getTipoidentificaciones);

//Obtener Tipoidentificaciones
router.get('/id/:id',getTipoidentificacion);

//Ingresar Tipoidentificaciones
router.post('/',[
    check('tipo','El tipo de indentificación es obligatorio').not().isEmpty(),
    validarCampos
],crearTipoidentificacion);

//Editar Tipoidentificaciones
router.put('/:id',editarTipoidentificacion);

//Eliminar Tipoidentificaciones
router.delete('/:id',eliminarTipoidentificacion);

module.exports = router;