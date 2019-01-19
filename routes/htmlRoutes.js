var db = require("../models");
const authController = require("../controllers/authcontroller.js");
// var passport = require("../config/passport");
// console.log("GU from the html file", globalUser);
module.exports = function(app, passport) {
  // Load index page

  app.get("/", function(req, res) {
    db.user.findAll({}).then(function(userInfo) {
      res.render("index", {
        msg: "Welcome!",
        examples: userInfo
      });
    });
  });

  // Load Neighborhood Page
  app.get("/neighborhood", function(req, res) {
    res.render("neighborhood");
  });

  //passport
  app.get("/signup", authController.signup);
  app.get("/signin", authController.signin);
  app.post(
    "/signup",
    passport.authenticate("local-signup", {
      successRedirect: "/dashboard",
      failureRedirect: "/signup"
    })
  );
  app.get("/dashboard", isLoggedIn, authController.dashboard);
  app.get("/task", isLoggedIn, authController.task);
  app.get("/logout", authController.logout);

  app.get("/user", isLoggedIn, function(req, res) {
    // console.log("just passport", req.user);
    db.user.findAll({ where: { id: req.user.id } }).then(function(data) {
      // console.log("hi user", data[0].username);
      res.render("user", {
        username: data[0].username,
        id: data[0].id
      });
    });
  });

  app.post(
    "/signin",
    passport.authenticate("local-signin", {
      successRedirect: "/dashboard",

      failureRedirect: "404"
    })
  );
  function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect("/");
  }
  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
