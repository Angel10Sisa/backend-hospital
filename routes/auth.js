/* 
    Rutas de Usuario /Auth
    host + /api/auth
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const router = Router();
const { crearUsuario, loginUsuario, revalidarToken } = require('../controllers/auth');
const { validarJWT } = require ('../middlewares/validar-jwt');
const { esRolValido } = require('../helpers/db.validator');



router.post('/new', [
    //middleware
    check('name', 'el nombre es obligatorio').not().isEmpty(),
    check('email', 'el email es obligatorio').isEmail(),
    check('password', 'el password debe de ser de 6 caracteres').isLength({ min: 6 }),
    check('rol', 'el rol es obligatorio').custom(esRolValido),
    check('estado', 'el estado es obligatorio').not().isEmpty(),
    check('google', 'google es obligatorio').not().isEmpty(),
    validarCampos
], crearUsuario);

router.post('/', [
    //middleware
    check('email', 'el email es obligatorio').isEmail(),
    check('password', 'el password debe de ser de 6 caracteres').isLength({ min: 6 }),
    validarCampos
], loginUsuario);

router.get('/renew', validarJWT, revalidarToken);


module.exports = router;