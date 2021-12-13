/* 
    Rutas de Usuarios /auditoria
    host + /api/auditoria
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { getAuditoria, crearAuditoria, getAuditoriaB, getAuditoriaContar, getAuditoriaF } = require('../controllers/auditoria');
const { validarJWT, validarCampos } = require('../middlewares');
const router = Router();

//Todas tienen que pasar por la validación del JWT
router.use(validarJWT);

//Contar Auditoria
router.get('/contar/', getAuditoriaContar);

//Filtrar por Fecha
router.post('/fecha/',[
    check('fecha1','La fecha es obligatoria').not(),
    check('fecha2','La fecha es obligatoria').not(),
    validarCampos
], getAuditoriaF);

//Obtener Auditoria
router.get('/:auditoria', getAuditoriaB);

//Ingresar Auditoria
router.post('/', crearAuditoria);

//Listar Auditoria
router.get('/',getAuditoria);


module.exports = router;