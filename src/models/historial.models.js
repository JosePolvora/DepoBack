const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    const Historial = sequelize.define("historial", {
        historial_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        fecha: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: Sequelize.NOW
        },

    },
        {
            tableName: "historiales",
            timestamps: true,
        },


    );

    return Historial;
};