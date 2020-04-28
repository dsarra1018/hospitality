-- Drops the db if it already exists --
DROP DATABASE IF EXISTS patients_db;

-- Create the database and specified it for use.
CREATE DATABASE patients_db;

USE patients_db;

CREATE TABLE patients (
  id INT NOT NULL AUTO_INCREMENT,
  last_name VARCHAR(50) NOT NULL,
  first_name VARCHAR(50) NOT NULL,
  dob VARCHAR(50) NOT NULL,
  symptoms VARCHAR(500) NOT NULL,
  diagnosis VARCHAR(500) NOT NULL,
  treatment VARCHAR(500) NOT NULL,
  PRIMARY KEY (id)
);