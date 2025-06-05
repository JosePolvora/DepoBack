const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    const Ubicacion = sequelize.define("ubicacion",
        {
            ubicacion_id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            codigo: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            calle: {
                type: DataTypes.STRING(2),
                allowNull: false
            },
            estanteria: {
                type: DataTypes.STRING(2),
                allowNull: false
            },
            nivel: {
                type: DataTypes.STRING(2),
                allowNull: false
            },
        },
        {
            tableName: "ubicaciones",
            timestamps: true,
        }

    );

    return Ubicacion;
}