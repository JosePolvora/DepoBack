const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    const Ingreso = sequelize.define("ingreso", {
        ingreso_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        cantidad: {
            type: DataTypes.INTEGER,
            allowNull: false
        },

        fecha: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: Sequelize.NOW
        },
    },

    );

    return Ingreso;
};
