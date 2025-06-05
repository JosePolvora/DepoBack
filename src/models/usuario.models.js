const { DataTypes } = require("sequelize");


module.exports = (sequelize, Sequelize) => {
    const Usuario = sequelize.define("usuario",
        {
            usuario_id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },

            nombre: {
                type: DataTypes.STRING,
                allowNull: true,
            },

            apellido: {
                type: DataTypes.STRING,
                allowNull: true
            },

            sector: {
                type: DataTypes.STRING,
                allowNull: true
            },

            legajo: {
                type: DataTypes.INTEGER,
                allowNull: false
            },

            correo: {
                type: DataTypes.STRING,
                allowNull: false
            },

            clave: {
                type: DataTypes.STRING,
                allowNull: false
            },

            rol_id: {
                type: DataTypes.INTEGER,
                references: {
                    model: 'roles',
                    key: 'rol_id'
                }
            },

            activo: {
                type: DataTypes.STRING,
                allowNull: false
            }
        });

    return Usuario

}