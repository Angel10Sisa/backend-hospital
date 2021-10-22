/* 
    Rutas de Usuarios /auditoria
    host + /api/auditoria
*/
const { Router } = require('express');
const { getAuditoria, crearAuditoria } = require('../controllers/auditoria');
const { validarJWT } = require('../middlewares');
const router = Router();

//Todas tienen que pasar por la validación del JWT
router.use(validarJWT);

//Ingresar Auditoria
router.post('/', crearAuditoria);

//Listar Auditoria
router.get('/',getAuditoria);


module.exports = router;