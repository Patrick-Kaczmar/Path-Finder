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
  app.get("/restaurant", function(req, res) {

    res.render("restaurant", { WEATHER_API: process.env.WEATHER_API });
  });

  // route to display golf handlebars when icon clicked
  app.get("/golf", function(req, res) {
    res.render("golf", { WEATHER_API: process.env.WEATHER_API });

    res.render("restaurant");
  });

  // route to display park handlebars when icon clicked
  app.get("/park", function(req, res) {
    res.render("park", { WEATHER_API: process.env.WEATHER_API });

  });
 
  // route to display gym handlebars when icon clicked
  app.get("/gym", function(req, res) {

    res.render("gym", { WEATHER_API: process.env.WEATHER_API });
  });
  
  // tennis route
  app.get("/tennis", function(req, res) {
    res.render("tennis", { WEATHER_API: process.env.WEATHER_API });
  });

  // route to display waterpark handlebars when icon clicked
  app.get("/waterpark", function(req, res) {
    res.render("waterpark", { WEATHER_API: process.env.WEATHER_API });
  });

  // route to display zipline handlebars when icon clicked
  app.get("/zipline", function(req, res) {
    res.render("zipline", { WEATHER_API: process.env.WEATHER_API });

    res.render("gym", { WEATHER_API: process.env.WEATHER_API });
  });
  
  // hospital route
  app.get("/hospital", function(req, res) {
    res.render("hospital", { WEATHER_API: process.env.WEATHER_API });
  });

  // route to display shoppingMall handlebars when icon clicked
  app.get("/shoppingMall", function(req, res) {
    res.render("shoppingMall", { WEATHER_API: process.env.WEATHER_API });
  });

  // route to display zoo handlebars when icon clicked
  app.get("/zoo", function(req, res) {
    res.render("zoo", { WEATHER_API: process.env.WEATHER_API });

  });
};
