// const express = require("express");
// const uploadController = require("../controllers/upload.controller");
// const routes = express.Router();

// // Ruta para subir archivo Excel
// routes.post("/upload-excel", uploadController.uploadFile);

// module.exports = routes;


const express = require("express");
const uploadPlanoController = require("../controllers/upload.controller");
const uploadUbicacionesController = require("../controllers/upload.ubi.controller");
const routes = express.Router();

// Ruta para subir planos
routes.post("/upload-excel", uploadPlanoController.uploadFile);

// Ruta para subir ubicaciones
routes.post("/upload-ubicaciones", uploadUbicacionesController.uploadUbicaciones);

module.exports = routes;

