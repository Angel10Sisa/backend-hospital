/* 
    Rutas de Pais /pais
    host + /api/pais
*/
const {Router} = require ('express');
const { check } = require('express-validator');
const { getPaises, getPais, crearPais, editarPais, eliminarPais, getPaisContar, getPaisB } = require('../controllers/pais');
const { validarJWT, validarCampos } = require('../middlewares');
const router = Router();

//Todas tienen que pasar por la validación de JWT
router.use(validarJWT);

//Obtener Contar
router.get('/contar/', getPaisContar);

//Obtener Roles
router.get('/:pais', getPaisB);

//Obtener Paises
router.get('/',getPaises);

//Obtener un Pais
router.get('/id/:id',getPais);

//Ingresar un Pais
router.post('/',[
    check('pais','El pais es obligatorio').not().isEmpty(),
    validarCampos
],crearPais);

//Editar un Pais
router.put('/:id',editarPais); 

//Eliminar un Pais 
router.delete('/:id',eliminarPais);

module.exports = router;
