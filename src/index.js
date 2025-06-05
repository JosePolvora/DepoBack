// require('dotenv').config();

// // Importar Express
// const express = require('express');
// // Importar la conexión a la base de datos
// const dbdepo = require('./models/index.models');
// const routes = require("./routes/index.routes");

// const cors = require('cors');

// const fileUpload = require('express-fileupload'); // <--- Línea agregada

// // Inicializar la aplicación
// const app = express();

// // Habilitar CORS
// app.use(cors()); // Usar cors aquí

// app.use(fileUpload()); // <--- Línea agregada


// // Configurar una ruta de ejemplo
// app.get('/', (req, res) => {
//     res.send('¡Hola, mundo!');
// });

// app.use(express.json());

// // Usar rutas principales desde el router
// app.use("/api", routes);


// // Conectar al motor de DB
// dbdepo.sequelize
//     .sync({ alter: true })
//     //.sync({ force: true })
//     .then(() => {
//         console.log("BASE DE DATOS SINCRONIZADA");
//     })
//     .catch((err) => {
//         console.log("ERROR EN SINCRONOZACION DE BASE DE DATOS");
//         console.log(err);
//     });



// // Puerto Principal
// const PUERTO = process.env.PORT || 3000;

// app.listen(PUERTO, () => {
//     console.log(`El servidor esta escuchando en el puerto ${PUERTO}...`);
// });


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
