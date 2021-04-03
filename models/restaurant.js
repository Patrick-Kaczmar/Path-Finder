module.exports = function (sequelize, DataTypes) {
    var Restaurant = sequelize.define("Restaurant", {

        name: {
            type: DataTypes.STRING,
            allowNull: true
        },

        website: {
            type: DataTypes.STRING,
            allowNull: true
        }
    });
    return Restaurant;
};