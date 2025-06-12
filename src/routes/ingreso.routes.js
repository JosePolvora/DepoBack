const express = require("express");
const ingresoController = require("../controllers/ingreso.controllers");
const routes = express.Router();

routes.post("/ingresos", ingresoController.createIngreso);
routes.get("/ingresos", ingresoController.getIngresos);
routes.get("/ingresos/:id", ingresoController.getIngresoById);
routes.put("/ingresos/:id", ingresoController.updateIngresoById);
routes.delete("/ingresos/:id", ingresoController.deleteIngresoById);


module.exports = routes;