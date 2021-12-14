/* 
    Rutas de Ciudad /ciudad
    host + /api/ciudad
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { getCiudades, getCiudad, crearCiudad, editarCiudad, eliminarCiudad, getCiudadContar, getCiudadB } = require('../controllers/ciudad');
const { existeProvincia } = require('../helpers/db.validator');
const { validarJWT, validarCampos } = require('../middlewares');
const router = Router();

//Todas tienen que pasar por la validacion de JWT
router.use(validarJWT);

//Contar Ciudades
router.get('/contar/', getCiudadContar);

//Obtener Filtrar Ciudades
router.get('/:ciudad', getCiudadB);

//Obtener Ciudades
router.get('/',getCiudades);

//Obtener Ciudad
router.get('/id/:id',getCiudad);

//Ingresar Ciudad
router.post('/',[
    check('ciudad','La ciudad es obligatoria').not().isEmpty(),
    check('provincia','La provincia es obligatoria').custom(existeProvincia),
    validarCampos
],crearCiudad);

//Editar Ciudad
router.put('/:id',editarCiudad);

//Eliminar Ciudad
router.delete('/:id',eliminarCiudad);

module.exports = router;