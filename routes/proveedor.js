/* 
    Rutas de Proveedores /proveedor
    host + /api/proveedor
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { getProveedores, getProveedor, crearProveedor, editarProveedor, eliminarProveedor, getProveedorT, getProveedorF, getProveedorContar, getProveedorB, getProveedorContarT, getProveedorContarF } = require('../controllers/proveedor');
const { existeDireccion } = require('../helpers/db.validator');
const { validarJWT, validarCampos } = require('../middlewares');
const router = Router();

//Todas tienen que pasar por la validacion de JWT
router.use(validarJWT);

//Contar Proveedores
router.get('/contar/', getProveedorContar);

//Contar True Proveedores
router.get('/contar/T', getProveedorContarT);

//Contar False Proveedores
router.get('/contar/F', getProveedorContarF);

//Obtener Proveedores Filtrar
router.get('/:proveedor', getProveedorB);

//Obtener Proveedores
router.get('/',getProveedores);

//Obtener Proveedor True
router.get('/true/true',getProveedorT);

//Obtener Proveedor False
router.get('/false/false',getProveedorF);

//Obtener Proveedor
router.get('/id/:id',getProveedor);

//Ingresar Proveedor
router.post('/',[
    //middleware
    check('nombre','el nombre es obligatorio').not().isEmpty(),
    check('contacto','el contacto es obligatorio').not().isEmpty(),
    check('telefono','debe ser un numero de telefono real').isLength({min:9}),
    check('celular','debe ser un numero de celular real').isLength({min:10}),
    check('email','el email no es valido').isEmail(),
    check('direccion','La direccion es obligatoria').custom(existeDireccion),
    validarCampos
],crearProveedor);

//Editar Proveedor
router.put('/:id',editarProveedor);

//Eliminar Proveedor
router.delete('/:id',eliminarProveedor);

module.exports = router;