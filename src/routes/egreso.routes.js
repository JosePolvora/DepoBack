const express = require("express");
const egresoController = require("../controllers/egreso.controllers");
const routes = express.Router();

routes.post("/egresos", egresoController.createEgreso);
routes.get("/egresos", egresoController.getEgresos);
routes.get("/egresos/:id", egresoController.getEgresoById);
routes.put("/egresos/:id", egresoController.updateEgresoById);
routes.delete("/egresos/:id", egresoController.deleteEgresoById);

module.exports = routes;