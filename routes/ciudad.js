/* 
    Rutas de Ciudad /ciudad
    host + /api/ciudad
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { getCiudades, getCiudad, crearCiudad, editarCiudad, eliminarCiudad } = require('../controllers/ciudad');
const { existeProvincia } = require('../helpers/db.validator');
const { validarJWT, validarCampos } = require('../middlewares');
const router = Router();

//Todas tienen que pasar por la validacion de JWT
router.use(validarJWT);

//Obtener Ciudades
router.get('/',getCiudades);

//Obtener Ciudad
router.get('/:id',getCiudad);

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