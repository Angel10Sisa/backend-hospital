/* 
    Rutas de Usuarios /usuarios
    host + /api/usuarios
*/
const { Router } = require('express');
const { check } = require('express-validator');
const {
    validarCampos,
    validarJWT,
    esAdminRol
} = require ('../middlewares');
const { getUsuarios, getUsuario, crearUsuarios, editarUsuarios, eliminarUsuarios, getUsuarioT, getUsuarioF} = require('../controllers/usuarios');
const { esRolValido, emailExiste, existeUsuarioId } = require('../helpers/db.validator');
const router=Router();

//Todas tienen que pasar por la validación del JWT
router.use(validarJWT);

//Obtener Usuarios
router.get('/', getUsuarios);

//Obtener Usuarios True
router.get('/true',getUsuarioT);

//Obtener Usuario False
router.get('/false',getUsuarioF);

//Obtener Usuario
router.get('/:id', getUsuario);

//Ingresar Usuarios
router.post('/',[
    //middleware
    check('name', 'el nombre es obligatorio').not().isEmpty(),
    check('email', 'el email es obligatorio').isEmail().custom(emailExiste),
    check('password', 'el password debe de ser de 6 caracteres').isLength({ min: 6 }),
    check('rol', 'el rol es obligatorio').custom(esRolValido),
    check('estado', 'el estado es obligatorio').not().isEmpty(),
    check('google', 'google es obligatorio').not().isEmpty(),
    validarCampos
], crearUsuarios);

//Editar Usuarios
router.put('/:id', editarUsuarios);

//Eliminar Usuarios
router.delete('/:id',[
    esAdminRol,
    //tieneRol('administrador','medico'),
    check('id','id no valido').custom(existeUsuarioId),
    validarCampos
], eliminarUsuarios);

module.exports = router;