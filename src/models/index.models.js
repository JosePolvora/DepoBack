const { Sequelize } = require('sequelize');
const sequelize = require('../configs/app.configs');

const dbdepo = {};

dbdepo.Sequelize = Sequelize;
dbdepo.sequelize = sequelize;

// Acá podés agregar tus modelos más adelante

dbdepo.Plano = require('./plano.models.js')(sequelize, Sequelize);
dbdepo.Usuario = require('./usuario.models.js')(sequelize, Sequelize);
dbdepo.Ubicacion = require('./ubicacion.model.js')(sequelize, Sequelize);
dbdepo.Rol = require('./rol.models.js')(sequelize, Sequelize);
dbdepo.Historial = require('./historial.models.js')(sequelize, Sequelize);
dbdepo.Ingreso = require('./ingreso.models.js')(sequelize, Sequelize);
dbdepo.Egreso = require('./egreso.models.js')(sequelize, Sequelize);
dbdepo.Planoxubicacion = require('./planoxubicacion.model.js')(sequelize, Sequelize);


// Un Rol tiene muchos Usuarios
dbdepo.Rol.hasMany(dbdepo.Usuario, { foreignKey: 'rol_id' });

// Un Usuario pertenece a un Rol
dbdepo.Usuario.belongsTo(dbdepo.Rol, { foreignKey: 'rol_id' });

// Un Usuario tiene muchas Ubicaciones
dbdepo.Usuario.hasMany(dbdepo.Ubicacion, { foreignKey: 'usuario_id' });

// Una Ubicacion pertenece a un Usuario
dbdepo.Ubicacion.belongsTo(dbdepo.Usuario, { foreignKey: 'usuario_id' });

// Una Ubicacion tiene muchos Ingresos
dbdepo.Ubicacion.hasMany(dbdepo.Ingreso, { foreignKey: 'ubicacion_id' });

// Un Ingreso pertenece a una Ubicacion
dbdepo.Ingreso.belongsTo(dbdepo.Ubicacion, { foreignKey: 'ubicacion_id' });

// Un Plano tiene muchos Ingresos
dbdepo.Plano.hasMany(dbdepo.Ingreso, { foreignKey: 'plano_id' });

// Una Ingreso pertenece a un Plano
dbdepo.Ingreso.belongsTo(dbdepo.Plano, { foreignKey: 'plano_id' });

// Una Ubicacion tiene muchos Egresos
dbdepo.Ubicacion.hasMany(dbdepo.Egreso, { foreignKey: 'ubicacion_id' });

// Un Egreso pertenece a una Ubicacion
dbdepo.Egreso.belongsTo(dbdepo.Ubicacion, { foreignKey: 'ubicacion_id' });

// Un Plano tiene muchos Egresos
dbdepo.Plano.hasMany(dbdepo.Egreso, { foreignKey: 'plano_id' });

// Una Egreso pertenece a un Plano
dbdepo.Egreso.belongsTo(dbdepo.Plano, { foreignKey: 'plano_id' });

// Un Plano tiene muchos Egresos
dbdepo.Plano.hasMany(dbdepo.Historial, { foreignKey: 'plano_id' });

// Una Egreso pertenece a un Plano
dbdepo.Historial.belongsTo(dbdepo.Plano, { foreignKey: 'plano_id' });

// Una Ubicacion tiene muchos Egresos
dbdepo.Ubicacion.hasMany(dbdepo.Historial, { foreignKey: 'ubicacion_id' });

// Un Egreso pertenece a una Ubicacion
dbdepo.Historial.belongsTo(dbdepo.Ubicacion, { foreignKey: 'ubicacion_id' });

// Usuario
dbdepo.Usuario.hasMany(dbdepo.Historial, { foreignKey: 'usuario_id' });

dbdepo.Historial.belongsTo(dbdepo.Usuario, { foreignKey: 'usuario_id' });

// Egreso e Ingreso
dbdepo.Egreso.hasOne(dbdepo.Historial, { foreignKey: 'egreso_id' });

dbdepo.Historial.belongsTo(dbdepo.Egreso, { foreignKey: 'egreso_id' });

dbdepo.Ingreso.hasOne(dbdepo.Historial, { foreignKey: 'ingreso_id' });

dbdepo.Historial.belongsTo(dbdepo.Ingreso, { foreignKey: 'ingreso_id' });

// Un plano puede tener muchas ubicaciones a través de Planoxubicacion
dbdepo.Plano.hasMany(dbdepo.Planoxubicacion, { foreignKey: 'plano_id' });

dbdepo.Planoxubicacion.belongsTo(dbdepo.Plano, { foreignKey: 'plano_id' });

// Una ubicación puede estar en muchos planos a través de Planoxubicacion
dbdepo.Ubicacion.hasMany(dbdepo.Planoxubicacion, { foreignKey: 'ubicacion_id' });

dbdepo.Planoxubicacion.belongsTo(dbdepo.Ubicacion, { foreignKey: 'ubicacion_id' });

// Asociación de Planoxubicacion a Ingreso/Egreso
dbdepo.Planoxubicacion.hasMany(dbdepo.Ingreso, { foreignKey: 'planoxubicacion_id'});

dbdepo.Planoxubicacion.hasMany(dbdepo.Egreso, { foreignKey: 'planoxubicacion_id'});



module.exports = dbdepo;
