const express = require("express");
const usuarioController = require("../controllers/usuario.controllers");
const routes = express.Router();


routes.post("/usuarios", usuarioController.createUsuario);
routes.get("/usuarios", usuarioController.getUsuarios);
routes.get("/usuarios/:id", usuarioController.getUsuarioById);
routes.put("/usuarios/:id", usuarioController.updateUsuario);
routes.delete("/usuarios/:id", usuarioController.deleteUsuario);
routes.post("/usuarios/login", usuarioController.loginUsuario);

// routes/adminUsuarios.routes.js
routes.post('/usuarios/admin', usuarioController.createUsuarioAdmin);



module.exports = routes;