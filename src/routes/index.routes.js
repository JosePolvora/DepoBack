const express = require("express");
const routes = express.Router();



// TODAS LAS RUTAS ⬇⬇⬇

const planoRoutes = require("./plano.routes");
routes.use("/", planoRoutes);

const usuarioRoutes = require("./usuario.routes");
routes.use("/", usuarioRoutes);

const ubicacionRoutes = require("./ubicacion.routes");
routes.use("/", ubicacionRoutes);

const rolRoutes = require("./rol.routes");
routes.use("/", rolRoutes);

const historialRoutes = require("./historial.routes");
routes.use("/", historialRoutes);

const ingresoRoutes = require("./ingreso.routes");
routes.use("/", ingresoRoutes);

const egresoRoutes = require("./egreso.routes");
routes.use("/", egresoRoutes);

const planoxubicacionRoutes = require("./planoxubicacion.routes");
routes.use("/", planoxubicacionRoutes);

// NUEVA RUTA PARA AI
const airoutes = require("./ai.routes");
routes.use("/ai", airoutes);

// Ruta para subir Excel
const uploadRoutes = require("./upload.routes");
routes.use("/", uploadRoutes); 


module.exports = routes;
