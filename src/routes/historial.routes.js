const express = require("express");
const historialController = require("../controllers/historial.controllers");
const routes = express.Router();


routes.post("/historiales", historialController.createHistorial);
routes.get("/historiales", historialController.getHistoriales);
// routes.get("/historiales/:id", historialController.getHistorialById);
// routes.get('/historiales/plano/numero/:plano_id', historialController.getHistorialByPlano);


module.exports = routes;