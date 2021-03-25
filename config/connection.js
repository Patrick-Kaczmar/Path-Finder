const Sequelize = require("sequelize");

let sequelize = new Sequelize("path_finder_db", "root", "Andromeda123", {
    host: "localhost",
    port: 3306,
    dialect: "mysql",
})

module.exports = sequelize;