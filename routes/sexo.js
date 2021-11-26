/* 
    Rutas de Sexo /sexo
    host + /api/sexo
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { getSexos, getSexo, crearSexo, editarSexo, eliminarSexo, getSexoContar, getSexoB } = require('../controllers/sexo');
const { validarJWT, validarCampos } = require('../middlewares');
const router=Router();

//Todas tienen que pasar por la validacion de JWT
router.use(validarJWT);

//Contar Sexos
router.get('/contar/', getSexoContar);

//Obtener Sexos
router.get('/:sexo', getSexoB);

//Obtener Sexos
router.get('/',getSexos);

//Obtener Sexo
router.get('/id/:id',getSexo);

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