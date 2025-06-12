const express = require("express");
const historialController = require("../controllers/historial.controllers");
const routes = express.Router();

routes.post("/historiales", historialController.createHistorial);
routes.get("/historiales", historialController.getHistoriales);
routes.get("/historiales/:id", historialController.updateHistorialById);


module.exports = routes;