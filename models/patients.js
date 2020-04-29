// Dependencies
const DataTypes = require("sequelize");
const sequelize = require("../config/connection");

// Creates a "Patient" model.
const Patient = sequelize.define("patients", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    last_name: DataTypes.STRING,
    first_name: DataTypes.STRING,
    dob: DataTypes.STRING, //Change to DATEONLY when schema.sql has been updated to reflect it.
    symptoms: DataTypes.TEXT,
    diagnosis: DataTypes.TEXT,
    treatment: DataTypes.TEXT
},
{
    freezeTableName: true,
    timestamps: false
});

Patient.sync();

module.exports = Patient;
