/* 
    Rutas de Roles /roles
    host + /api/roles
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { getRoles, getRol, crearRol, editarRol, eliminarRol } = require('../controllers/roles');
const { validarJWT, validarCampos, esAdminRol } = require('../middlewares');
const router=Router();

// Todas tiene que pasar por la validacion de JWT
router.use(validarJWT);

//Obtener Roles
router.get('/', getRoles);

//Obtener un Rol
router.get('/:rol', getRol);

//Ingresar Rol
router.post('/',[
    check('rol','el rol es obligatorio').not().isEmpty(),
    check('descripcion','la descripcion es obligatoria').not().isEmpty(),
    validarCampos
], crearRol);

//Modificar Rol
router.put('/:rol1',editarRol);

//Eliminar Rol
router.delete('/:rol',[
    esAdminRol
], eliminarRol);


module.exports = router;