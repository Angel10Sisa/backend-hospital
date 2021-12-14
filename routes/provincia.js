/* 
    Rutas de Provincia /provincia
    host + /api/provincia
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { getProvincias, getProvincia, crearProvincia, editarProvincia, eliminarProvincia, getProvinciasContar, getProvinciasB } = require('../controllers/provincia');
const { existePais } = require('../helpers/db.validator');
const { validarJWT, validarCampos } = require('../middlewares');
const router = Router();

//Todas tienen que pasar por la validacion de JWT
router.use(validarJWT);

//Contar Provincias
router.get('/contar/', getProvinciasContar);

//Obtener Filtrar Provincias
router.get('/:provincia', getProvinciasB);

//Obtener Provincias
router.get('/',getProvincias);

//Obtener Provincia
router.get('/id/:id',getProvincia);

//Ingresar Provincia
router.post('/',[
    check('provincia','La provincia es obligatoria').not().isEmpty(),
    check('pais','El pais es obligatorio').custom(existePais),
    validarCampos
],crearProvincia);

//Editar Provincia
router.put('/:id',editarProvincia);

//Eliminar Provincia
router.delete('/:id',eliminarProvincia);

module.exports = router;