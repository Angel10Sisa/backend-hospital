/* 
    Rutas de Tipoproducto /tipoproducto
    host + /api/tipoproducto
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { getTipoproductos, getTipoproducto, crearTipoproducto, editarTipoproducto, eliminarTipoproducto, getTipoProductoContar, getTipoProductoB } = require('../controllers/tipoproducto');
const { validarJWT, validarCampos } = require('../middlewares');
const router=Router();

//Todas tienen que pasar por la validacion de JWT
router.use(validarJWT);

//Contar Tipos Producto
router.get('/contar/', getTipoProductoContar);

//Obtener Tipos Producto
router.get('/:tipo', getTipoProductoB);

//Obtener Tipoproductos
router.get('/',getTipoproductos);

//Obtener Tipoproducto
router.get('/id/:id',getTipoproducto);

//Ingresar Tipoproductos
router.post('/',[
    check('tipoproducto','El tipo producto es obligatorio').not().isEmpty(),
    validarCampos
],crearTipoproducto);

//Editar Tipoproductos
router.put('/:id',editarTipoproducto);

//Eliminar Tipoproductos
router.delete('/:id',eliminarTipoproducto);

module.exports = router;