module.exports = function (sequelize, DataTypes) {
    var Mall = sequelize.define("Mall", {

        name: {
            type: DataTypes.STRING,
            allowNull: true
        },

        website: {
            type: DataTypes.STRING,
            allowNull: true
        }
    });
    return Mall;
};