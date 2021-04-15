/* 
    Rutas de Tipoidentificacion /tipoidentificacion
    host + /api/tipoidentificacion
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { getTipoidentificaciones, getTipoidentificacion, crearTipoidentificacion, editarTipoidentificacion, eliminarTipoidentificacion } = require('../controllers/tipoidentificacion');
const { validarJWT, validarCampos } = require('../middlewares');
const router = Router();

//Todas tienen que pasar por la validacion de JWT
router.use(validarJWT);

//Obtener Ciudades
router.get('/',getTipoidentificaciones);

//Obtener Ciudad
router.get('/:id',getTipoidentificacion);

//Ingresar Ciudad
router.post('/',[
    check('tipo','El tipo de indentificación es obligatorio').not().isEmpty(),
    validarCampos
],crearTipoidentificacion);

//Editar Ciudad
router.put('/:id',editarTipoidentificacion);

//Eliminar Ciudad
router.delete('/:id',eliminarTipoidentificacion);

module.exports = router;