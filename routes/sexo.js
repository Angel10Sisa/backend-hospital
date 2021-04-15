/* 
    Rutas de Sexo /sexo
    host + /api/sexo
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { getSexos, getSexo, crearSexo, editarSexo, eliminarSexo } = require('../controllers/sexo');
const { validarJWT, validarCampos } = require('../middlewares');
const router=Router();

//Todas tienen que pasar por la validacion de JWT
router.use(validarJWT);

//Obtener Sexos
router.get('/',getSexos);

//Obtener Sexo
router.get('/:id',getSexo);

//Ingresar Sexo
router.post('/',[
    check('sexo','El sexo es obligatorio').not().isEmpty(),
    validarCampos
],crearSexo);

//Editar Sexo
router.put('/:id',editarSexo);

//Eliminar Sexo
router.delete('/:id',eliminarSexo);

module.exports = router;