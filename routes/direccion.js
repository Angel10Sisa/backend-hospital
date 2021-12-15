/* 
    Rutas de Direccion /direccion
    host + /api/direccion
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { getDirecciones, getDireccion, crearDireccion, editarDireccion, eliminarDireccion, getDireccionContar, getDireccionB } = require('../controllers/direccion');
const { existePais, existeProvincia, existeCuidad } = require('../helpers/db.validator');
const { validarJWT, validarCampos } = require('../middlewares');
const router = Router();


//Todas tienen que pasar por la validacion de JWT
router.use(validarJWT);

//Contar Direcciones
router.get('/contar/', getDireccionContar);

//Obtener Filtrar Direcciones
router.get('/:direccion', getDireccionB);

//Obtener Direcciones
router.get('/',getDirecciones);

//Obtener Direcciones
router.get('/id/:id',getDireccion);

//Ingresar Direcciones
router.post('/',[
    check('pais','El pais es obligatoria').custom(existePais),
    check('provincia','La provincia es obligatoria').custom(existeProvincia),
    check('ciudad','La ciudad es obligatoria').custom(existeCuidad),
    check('direccion','La direccion es obligatoria').not().isEmpty(),
    validarCampos
],crearDireccion);

//Editar Direcciones
router.put('/:id',editarDireccion);

//Eliminar Direcciones
router.delete('/:id',eliminarDireccion);

module.exports = router;