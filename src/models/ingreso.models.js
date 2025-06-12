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

        tipoMovimiento: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'Ingreso'

        },

    },

    );

    return Ingreso;
};
