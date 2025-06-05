const { DataTypes } = require("sequelize");


module.exports = (sequelize, Sequelize) => {
    const Rol = sequelize.define("rol",
        {
            rol_id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },

            nombre: {
                type: DataTypes.STRING,
                allowNull: true
            },

        },
        {
            tableName: "roles",
            timestamps: true,
        }
    );

    return Rol
}