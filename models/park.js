module.exports = function (sequelize, DataTypes) {
    var Park = sequelize.define("Park", {

        name: {
            type: DataTypes.STRING,
            allowNull: true
        },

        website: {
            type: DataTypes.STRING,
            allowNull: true
        }
    });
    return Park;
};