const { Sequelize } = require('sequelize');
const sequelize = require('../configs/app.configs');

const dbdepo = {};

dbdepo.Sequelize = Sequelize;
dbdepo.sequelize = sequelize;

// Modelos
dbdepo.Plano = require('./plano.models.js')(sequelize, Sequelize);
dbdepo.Usuario = require('./usuario.models.js')(sequelize, Sequelize);
dbdepo.Ubicacion = require('./ubicacion.model.js')(sequelize, Sequelize);
dbdepo.Rol = require('./rol.models.js')(sequelize, Sequelize);
dbdepo.Historial = require('./historial.models.js')(sequelize, Sequelize);
dbdepo.Ingreso = require('./ingreso.models.js')(sequelize, Sequelize);
dbdepo.Egreso = require('./egreso.models.js')(sequelize, Sequelize);
dbdepo.Planoxubicacion = require('./planoxubicacion.model.js')(sequelize, Sequelize);

// Relaciones

// Rol - Usuario
dbdepo.Rol.hasMany(dbdepo.Usuario, { foreignKey: 'rol_id' });
dbdepo.Usuario.belongsTo(dbdepo.Rol, { foreignKey: 'rol_id' });

// Usuario - Ubicacion
dbdepo.Usuario.hasMany(dbdepo.Ubicacion, { foreignKey: 'usuario_id' });
dbdepo.Ubicacion.belongsTo(dbdepo.Usuario, { foreignKey: 'usuario_id' });


// Plano - Historial
dbdepo.Plano.hasMany(dbdepo.Historial, { foreignKey: 'plano_id' });
dbdepo.Historial.belongsTo(dbdepo.Plano, { foreignKey: 'plano_id' });

// Ubicacion - Historial
dbdepo.Ubicacion.hasMany(dbdepo.Historial, { foreignKey: 'ubicacion_id' });
dbdepo.Historial.belongsTo(dbdepo.Ubicacion, { foreignKey: 'ubicacion_id' });

// Usuario - Historial
dbdepo.Usuario.hasMany(dbdepo.Historial, { foreignKey: 'usuario_id' });
dbdepo.Historial.belongsTo(dbdepo.Usuario, { foreignKey: 'usuario_id' });

// Egreso - Historial
dbdepo.Egreso.hasMany(dbdepo.Historial, { foreignKey: 'egreso_id' });
dbdepo.Historial.belongsTo(dbdepo.Egreso, { foreignKey: 'egreso_id'});

// Ingreso - Historial
dbdepo.Ingreso.hasMany(dbdepo.Historial, { foreignKey: 'ingreso_id'});
dbdepo.Historial.belongsTo(dbdepo.Ingreso, { foreignKey: 'ingreso_id'});

// Plano - Planoxubicacion
dbdepo.Plano.hasMany(dbdepo.Planoxubicacion, { foreignKey: 'plano_id' });
dbdepo.Planoxubicacion.belongsTo(dbdepo.Plano, { foreignKey: 'plano_id' });

// Ubicacion - Planoxubicacion
dbdepo.Ubicacion.hasMany(dbdepo.Planoxubicacion, { foreignKey: 'ubicacion_id' });
dbdepo.Planoxubicacion.belongsTo(dbdepo.Ubicacion, { foreignKey: 'ubicacion_id' });

module.exports = dbdepo;
