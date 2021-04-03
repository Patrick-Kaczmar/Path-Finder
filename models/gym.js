module.exports = function (sequelize, DataTypes) {
    var Gym = sequelize.define("Gym", {

        name: {
            type: DataTypes.STRING,
            allowNull: true
        },

        website: {
            type: DataTypes.STRING,
            allowNull: true
        }
    });
    return Gym;
};