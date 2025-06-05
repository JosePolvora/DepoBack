const express = require("express");
const planoxubicacionController = require("../controllers/planoxubicacion.controllers");
const routes = express.Router();

routes.post("/planoxubicacion", planoxubicacionController.createPlanoxubicacion);
routes.post("/planoxubicacion/asignar", planoxubicacionController.asignarUbicacionAPlano);
routes.post("/planoxubicacion/actualizar-stock", planoxubicacionController.actualizarStockYFecha);
routes.post("/planoxubicacion/actualizar-stock-ubicacion", planoxubicacionController.actualizarStockyUbicacion);

routes.get("/planosxubicaciones", planoxubicacionController.getPlanosxubicaciones);
routes.get("/planoxubicacion/:id", planoxubicacionController.getPlanoxubicacionById);

routes.put("/planoxubicacion/:id", planoxubicacionController.updatePlanoxubicacionById);
routes.put("/planoxubicacion", planoxubicacionController.moverStockEntreUbicaciones);

routes.delete("/planoxubicacion/:id", planoxubicacionController.deletePlanoxubicacionById);
routes.delete("/planoxubicacion", planoxubicacionController.deletePlanoxubicacionByPlanoYUbicacion);

    
module.exports = routes;



