const express = require("express");
const rolController = require("../controllers/rol.controllers");
const routes = express.Router();

routes.get("/roles", rolController.getRoles);
routes.post("/roles", rolController.createRol);
routes.get("/roles/:id", rolController.getRolById);
routes.put("/roles/:id", rolController.updateRolById);
routes.delete("/roles/:id", rolController.deleteRolById);

module.exports = routes;