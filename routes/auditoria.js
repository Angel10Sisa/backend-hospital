/* 
    Rutas de Usuarios /auditoria
    host + /api/auditoria
*/
const { Router } = require('express');
const { getAuditoria } = require('../controllers/auditoria');
const { validarJWT } = require('../middlewares');
const router = Router();

//Todas tienen que pasar por la validación del JWT
router.use(validarJWT);

//Listar Auditoria
router.get('/',getAuditoria);


module.exports = router;