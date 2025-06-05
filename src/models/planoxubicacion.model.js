const { DataTypes } = require("sequelize");


module.exports = (sequelize, Sequelize) => {
    const Planoxubicacion = sequelize.define("planosxubicaciones",
        {
            planoxubicacion_id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },

            stock: {
                type: DataTypes.INTEGER,
                allowNull: true
            },

            fecha: {
                type: DataTypes.DATE,
                allowNull: true, // 👈 cambiá esto
            },

        },
        {
            tableName: "planosxubicaciones",
            timestamps: true,
        }
    );

    return Planoxubicacion
}