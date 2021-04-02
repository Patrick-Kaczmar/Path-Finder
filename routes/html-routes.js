// Requiring path to so we can use relative routes to our HTML files
const { readdirSync } = require("fs");
var path = require("path");

// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {

  app.get("/", function(req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      // res.redirect("/members");
      res.render("members");
    }
    res.render("signup");
  });

  app.get("/login", function(req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/members");
    }
    res.render("login");
  });

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get("/members", isAuthenticated, function(req, res) {
    // res.sendFile(path.join(__dirname, "../public/members.html"));
    res.render("members");
  });

  // route to display restaurant handlebars when icon clicked
  app.get("/views/index-restaurant.handlebars", function(req, res) {
    res.render("restaurant");
  });

  // route to display park handlebars when icon clicked
  app.get("/views/index-park.handlebars", function(req, res) {
    res.render("park");
  });
 
  // route to display gym handlebars when icon clicked
  app.get("/views/index-gym.handlebars", function(req, res) {
    res.render("gym");
  });
  
  // hospital route
  app.get("/views/index-hospital.handlebars", function(req, res) {
    res.render("hospital");
  });

  // route to display shoppingMall handlebars when icon clicked
  app.get("/views/index-shoppingMall.handlebars", function(req, res) {
    res.render("shoppingMall");
  });

  // route to display zoo handlebars when icon clicked
  app.get("/views/index-zoo.handlebars", function(req, res) {
    res.render("zoo");
  });
};
