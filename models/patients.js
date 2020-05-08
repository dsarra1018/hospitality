// Creating a "Patient" model
module.exports = function(sequelize, DataTypes) {
  var Patient = sequelize.define(
    "Patient",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      last_name: DataTypes.STRING,
      first_name: DataTypes.STRING,
      dob: DataTypes.DATEONLY,
      symptoms: DataTypes.TEXT,
      diagnosis: DataTypes.TEXT,
      treatment: DataTypes.TEXT
    },
    {
      freezeTableName: true,
      timestamps: false
    }
  );
  return Patient;
};
