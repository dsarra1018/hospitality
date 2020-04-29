// Dependencies
const Sequelize = require("sequilize");

// Creates MySQL connection using Sequelize
const sequilize = new Sequelize("patients_db", "root", null, {
    host: "localhost",
    port: 3306,
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    }
});

// Exports the connection for other files to use
module.exports = sequilize;