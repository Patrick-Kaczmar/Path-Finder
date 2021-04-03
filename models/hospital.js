module.exports = function (sequelize, DataTypes) {
    var Hospital = sequelize.define("Hospital", {

        name: {
            type: DataTypes.STRING,
            allowNull: true
        },

        website: {
            type: DataTypes.STRING,
            allowNull: true
        }
    });
    return Hospital;
};