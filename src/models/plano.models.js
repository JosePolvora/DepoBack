const { DataTypes } = require("sequelize");


module.exports = (sequelize, Sequelize) => {
    const Plano = sequelize.define("plano",
        {
            plano_id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },

            plano: {
                type: DataTypes.STRING,
                allowNull: false,
            },

            denominacion: {
                type: DataTypes.STRING,
                allowNull: false
            },

            origen: {
                type: DataTypes.STRING,
                allowNull: true
            },
            
            stock_total: {
                type: DataTypes.INTEGER,
                allowNull: true
            },

        });

    return Plano

}