/* 
    Rutas de Roles /roles
    host + /api/roles
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { getRoles, getRol, crearRol, editarRol, eliminarRol, getRolesB, getRolContar } = require('../controllers/roles');
const { validarJWT, validarCampos, esAdminRol } = require('../middlewares');
const router=Router();

// Todas tiene que pasar por la validacion de JWT
router.use(validarJWT);

//Obtener Contar
router.get('/contar/', getRolContar);

//Obtener Roles
router.get('/', getRoles);

//Obtener Roles
router.get('/:rol', getRolesB);

//Obtener un Rol
router.get('/id/:id', getRol);

//Ingresar Rol
router.post('/',[
    check('rol','el rol es obligatorio').not().isEmpty(),
    check('descripcion','la descripcion es obligatoria').not().isEmpty(),
    validarCampos
], crearRol);

//Modificar Rol
router.put('/:id',editarRol);

//Eliminar Rol
router.delete('/:id',[
    esAdminRol
], eliminarRol);


module.exports = router;