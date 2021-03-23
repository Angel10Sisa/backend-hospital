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


//Escuchar peticiones
app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en puerto ${process.env.PORT}`);
    dbConnection();
});