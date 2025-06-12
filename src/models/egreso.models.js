const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    const Egreso = sequelize.define("egreso", {
        egreso_id: {
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
            defaultValue: 'Egreso'

        },
    },

    );

    return Egreso;
};