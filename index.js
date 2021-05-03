const express = require('express');
require('dotenv').config();
const { db } = require('./database/config');
const cors=require('cors');

//Crear Servidor de express
const app = express();
require('dotenv').config();

//Base de datos
const dbConnection = async() => {
    try {
        await db.authenticate();
        console.log('data base connect');
    } catch (error) {
        throw new Error(error);
    }
}

//CORS
app.use(cors());

//Directorio publico
app.use(express.static('public'));

//Lactura y parseo del nody
app.use(express.json());

//Rutas
// TODO: auth//crear, login, renew
app.use('/api/auth', require('./routes/auth'));

// TODO: CRUD:Eventos
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/auditoria', require('./routes/auditoria'));
app.use('/api/roles', require('./routes/roles'));
app.use('/api/pais', require('./routes/pais'));
app.use('/api/provincia', require('./routes/provincia'));
app.use('/api/ciudad', require('./routes/ciudad'));
app.use('/api/direccion', require('./routes/direccion'));
app.use('/api/proveedor', require('./routes/proveedor'));
app.use('/api/tipoidentificacion', require('./routes/tipoidentificacion'));
app.use('/api/estadocivil', require('./routes/estadocivil'));
app.use('/api/sexo', require('./routes/sexo'));
app.use('/api/afiliacion', require('./routes/afiliacion'));
app.use('/api/tipopaciente', require('./routes/tipopaciente'));
app.use('/api/descuento', require('./routes/descuento'));
app.use('/api/iva', require('./routes/iva'));
app.use('/api/formapago', require('./routes/formapago'));
app.use('/api/concepto', require('./routes/concepto'));
app.use('/api/tipoproducto', require('./routes/tipoproducto'));
app.use('/api/bodega', require('./routes/bodega'));
app.use('/api/paciente', require('./routes/paciente'));
app.use('/api/transaccion', require('./routes/transaccion'));
app.use('/api/producto', require('./routes/producto'));
app.use('/api/venta', require('./routes/venta'));
app.use('/api/compra', require('./routes/compra'));
app.use('/api/productobodega', require('./routes/productobodega'));
app.use('/api/detalletransaccion', require('./routes/detalletransaccion'));
app.use('/api/insumo', require('./routes/insumo'));
app.use('/api/detalleventa', require('./routes/detalleventa'));
app.use('/api/detallecompra', require('./routes/detallecompra'));
app.use('/api/productoproveedor', require('./routes/productoproveedor'));


//Escuchar peticiones
app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en puerto ${process.env.PORT}`);
    dbConnection();
});