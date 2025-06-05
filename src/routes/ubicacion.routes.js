const express = require("express");
const ubicacionController = require("../controllers/ubicacion.controllers");
const routes = express.Router();

routes.post("/ubicaciones", ubicacionController.createUbicacion);
routes.get("/ubicaciones", ubicacionController.getUbicaciones);
routes.get("/ubicaciones/:id", ubicacionController.getUbicacionById);

routes.get("/ubicaciones/ubicacion/:codigo", ubicacionController.getUbicacionByCodigo);
routes.get("/ubicaciones/ubicacion/codigos/:codigo", ubicacionController.getUbicacionByCodigoUbicacion);

routes.put("/ubicaciones/:codigo", ubicacionController.updateUbicacionByCodigo);
routes.delete("/ubicaciones/:codigo", ubicacionController.deleteUbicacionByCodigo);

module.exports = routes;

