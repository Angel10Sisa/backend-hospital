/* 
    Rutas de Direccion /direccion
    host + /api/direccion
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { getDirecciones, getDireccion, crearDireccion, editarDireccion, eliminarDireccion } = require('../controllers/direccion');
const { existePais, existeProvincia, existeCuidad } = require('../helpers/db.validator');
const { validarJWT, validarCampos } = require('../middlewares');
const router = Router();


//Todas tienen que pasar por la validacion de JWT
router.use(validarJWT);

//Obtener Ciudades
router.get('/',getDirecciones);

//Obtener Ciudad
router.get('/:id',getDireccion);

//Ingresar Ciudad
router.post('/',[
    check('pais','El pais es obligatoria').custom(existePais),
    check('provincia','La provincia es obligatoria').custom(existeProvincia),
    check('ciudad','La ciudad es obligatoria').custom(existeCuidad),
    check('direccion','La direccion es obligatoria').not().isEmpty(),
    check('referencia','La referencia es obligatoria').not().isEmpty(),
    validarCampos
],crearDireccion);

//Editar Ciudad
router.put('/:id',editarDireccion);

//Eliminar Ciudad
router.delete('/:id',eliminarDireccion);

module.exports = router;