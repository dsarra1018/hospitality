// Requiring our models and passport as we've configured it
var db = require("../models");
var passport = require("../config/passport");

module.exports = function(app) {
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post("/api/login", passport.authenticate("local"), function(req, res) {
    res.json(req.user);
  });

  // Route for signing up a user.
  // If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/signup", function(req, res) {
    db.User.create({
      email: req.body.email,
      password: req.body.password
    })
      .then(function() {
        res.redirect(307, "/api/login");
      })
      .catch(function(err) {
        res.status(401).json(err);
      });
  });

  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", function(req, res) {
    if (!req.user) {
      res.json({});
    } else {
      res.json({
        email: req.user.email,
        id: req.user.id
      });
    }
  });

  // POST route for saving a new patient.
  app.post("/api/add", function(req, res) {
    console.log("Patient's Data: ");
    console.log(req.body);

    db.Patient.create({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      dob: req.body.dob,
      symptoms: req.body.symptoms,
      diagnosis: req.body.diagnosis,
      treatment: req.body.treatment
    });
    res.status(204).end();
  });

  // GET route for getting a patient information
  app.get("/api/patient/name/:name", function(req, res) {
    var full_name = req.params.name;
    var full_name_arr = full_name.split("_");
    var first_name = full_name_arr[0];
    var last_name = full_name_arr[1];

    db.Patient.findOne({
      where: {
        last_name: last_name,
        first_name: first_name
      }
    }).then(function(new_patient) {
      res.json(new_patient);
    });
  });

  // DEvarE route for devaring patient. We can access the ID of the patient to devare in
  // req.params.id
  app.devare("/api/patient/:id", function(req, res) {
    db.Patient.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(new_patient) {
      res.json(new_patient);
    });
  });

  // PUT route for updating patient. We can access the updated patient in req.body
  app.put("/api/patient", function(req, res) {
    db.Patient.update(
      {
        text: req.body.text,
        compvare: req.body.compvare
      },
      {
        where: {
          id: req.body.id
        }
      }
    ).then(function(updatedPatient) {
      res.json(updatedPatient);
    });
  });
};
