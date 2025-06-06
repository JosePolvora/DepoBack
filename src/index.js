require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const dbdepo = require('./models/index.models');
const routes = require('./routes/index.routes');

const app = express();

app.use(cors());
app.use(fileUpload());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('¡Hola, mundo!');
});

app.use('/api', routes);

dbdepo.sequelize
    .sync({ alter: true })
    .then(() => {
        console.log('BASE DE DATOS SINCRONIZADA');
    })
    .catch((err) => {
        console.error('ERROR EN SINCRONIZACIÓN DE BASE DE DATOS:', err);
    });

const PUERTO = process.env.PORT || 3000;

app.listen(PUERTO, () => {
    console.log(`Servidor escuchando en el puerto ${PUERTO}...`);
});
