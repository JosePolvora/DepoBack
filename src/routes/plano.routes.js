const express = require("express");
const planoController = require("../controllers/plano.controllers");
const routes = express.Router();


routes.post("/planos", planoController.createPlano);

routes.get("/planos", planoController.getPlanos);
routes.get("/planos/:id", planoController.getPlanoById);
routes.get("/planos/numero/:plano", planoController.getPlanoByNumero);
routes.get("/planos/numero/denominacion/:plano", planoController.getPlanoByNumeroDenominacion);
routes.get("/planoStock", planoController.getPlanosConStockTotal);
routes.get("/planos/movimientos", planoController.getHistorialMovimientos);
routes.get("/planos/qr/:plano", planoController.getPlanoByNumeroQr);

routes.put("/planos/:plano", planoController.updatePlanoByNumero);

routes.delete("/planos/plano/:plano", planoController.deletePlanoByNumero);
routes.delete("/planos/:id", planoController.deletePlanoById);


module.exports = routes;