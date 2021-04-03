module.exports = function (sequelize, DataTypes) {
    var Zoo = sequelize.define("Zoo", {

        name: {
            type: DataTypes.STRING,
            allowNull: true
        },

        website: {
            type: DataTypes.STRING,
            allowNull: true
        }
    });
    return Zoo;
};