// Requiring our models and passport as we've configured it
var db = require("../models");
var passport = require("../config/passport");

module.exports = function(app) {
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post("/api/login", passport.authenticate("local"), function(req, res) {
   
    res.json({
      email: req.user.email,
      id: req.user.id
    });
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

  //Route for loggin user out
  app.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
  });
};

//   // Route for viewing page
//   app.get("/api/add", function(req, res) {
//     req.add();
//     res.redirect("/add");
//   });

//   // Route for adding page
//   app.get("/api/view", function(req, res) {
//     req.view();
//     res.redirect("/view");
//   });
// };
