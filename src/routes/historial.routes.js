const express = require("express");
const historialController = require("../controllers/historial.controllers");
const routes = express.Router();

routes.get("/historiales", historialController.getHistoriales);
routes.post("/historiales", historialController.createHistorial);
routes.get("/historiales/:id", historialController.getHistorialById);
routes.get('/historiales/plano/numero/:plano_id', historialController.getHistorialByPlano);
//routes.get("/historiales/historial/:plano_id", historialController.getHistorialByPlano);

module.exports = routes;