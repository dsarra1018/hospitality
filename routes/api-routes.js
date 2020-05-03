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

  //Route for getting some data about our user to be used client side
  app.get("/api/user_data", (req, res) => {
    if (!req.user) {
      res.json({});
    } else {
      res.json({
        email: req.user.email,
        id: req.user.id
      });
    }
  });

  // //Route for loggin user out
  // app.get("/logout", (req, res) => {
  //   req.logout();
  //   res.redirect("/");
  // });

// //Get route to view
// app.get("api/view", function(req, res) {
//   res.json(view);
// })

 // GET route for getting all of the patient
 app.get("/api/add", function(request, response) {
  db.Patient.findAll({}).then( dbnewPatient => {
    response.json(dbnewPatient);
  });
});

// POST route for saving a new patient.
app.post("/api/add", (req, res) => {
  console.log("Patient's Data:");
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

// DELETE route for deleting patient. We can access the ID of the patient to delete in
  // req.params.id
  app.delete("/api/add/:id", function(req, res) {
    db.Patient.destroy({
      where: {
        id: req.params.id
      }
    }).then( newPatient => {
      res.json(newPatient);
    });
  });

  // PUT route for updating patient. We can access the updated patient in req.body
  app.put("/api/add", function(req, res) {
    db.Patient.update({
     text: req.body.text,
     complete: req.body.complete
    },
    {
     where: {
       id: req.body.id
     }
    }).then( updatedPatient=> {
      res.json(updatedPatient);
    });
 });

};
 
