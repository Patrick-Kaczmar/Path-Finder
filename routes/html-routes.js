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
    // res.sendFile(path.join(__dirname, "../public/signup.html"));
    res.render("signup");
  });

  app.get("/login", function(req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/members");
    }
    // res.sendFile(path.join(__dirname, "../public/login.html"));
    res.render("login");
  });

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get("/members", isAuthenticated, function(req, res) {
    // res.sendFile(path.join(__dirname, "../public/members.html"));
    res.render("members");
  });
  
  app.get("/category", function(req, res) {
    res.render("category");
  });

  // route to display restaurant handlebars when icon clicked
  app.get("/views/index-restaurant.handlebars", function(req, res) {
    res.render("restaurant", { activityId: "restaurant" });
  });

  // route to display golf handlebars when icon clicked
  app.get("/views/index-golf.handlebars", function(req, res) {
    res.render("golf", { activityId: "golf" });
  });
 
  // route to display gym handlebars when icon clicked
  app.get("/views/index-gym.handlebars", function(req, res) {
    res.render("gym", { activityId: "gym" });
  });
  
  // tennis route
  app.get("/views/index-tennis.handlebars", function(req, res) {
    res.render("tennis", { activityId: "tennis" });
  });

  // route to display waterpark handlebars when icon clicked
  app.get("/views/index-waterpark.handlebars", function(req, res) {
    res.render("waterpark", { activityId: "waterpark" });
  });

  // route to display zipline handlebars when icon clicked
  app.get("/views/index-zipline.handlebars", function(req, res) {
    res.render("zipline", { activityId: "zipline" });
  });
};
