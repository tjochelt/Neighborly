const bCrypt = require("bcrypt-nodejs");
// const passport = require("passport");

module.exports = (passport, user) => {
  var User = user;
  var globalUser = "";
  var LocalStrategy = require("passport-local").Strategy;

  passport.use(
    "local-signup",
    new LocalStrategy(
      {
        usernameField: "username",
        email: "email",
        passwordField: "password",
        passReqToCallback: true // allows us to pass back the entire request to the callback
      },
      (req, username, password, done) => {
        const generateHash = password => {
          return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
        };
        User.findOne({
          where: {
            username: username
          }
        }).then(user => {
          if (user) {
            return done(null, false, {
              message: "That username is already taken"
            });
          } else {
            let userPassword = generateHash(password);
            //set signup fields as data variable.
            let data = {
              username: req.body.username,
              email: req.body.email,

              password: userPassword

              // firstname: req.body.firstname,

              // lastname: req.body.lastname
            };
            //pass data variable to user table
            User.create(data).then((newUser, created) => {
              if (!newUser) {
                return done(null, false);
              }

              if (newUser) {
                return done(null, newUser);
              }
            });
          }
        });
      }
    )
  );
  //serialize
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  passport.deserializeUser(function(id, done) {
    User.findById(id).then(function(user) {
      // console.log("deserialize", user);
      if (user) {
        globalUser = user.dataValues.id;
        // console.log("deserialize global user", globalUser);
        done(null, user.get());
      } else {
        done(user.errors, null);
      }
    });
  });
  //LOCAL SIGNIN
  passport.use(
    "local-signin",
    new LocalStrategy(
      {
        // by default, local strategy uses username and password

        usernameField: "username",
        email: "email",
        passwordField: "password",
        passReqToCallback: true // allows us to pass back the entire request to the callback
      },

      function(req, username, password, done) {
        console.log("in passport");
        var User = user;

        var isValidPassword = function(userpass, password) {
          return bCrypt.compareSync(password, userpass);
        };

        User.findOne({
          where: {
            username: username
          }
        })
          .then(function(user) {
            if (!user) {
              return done(null, false, {
                message: "User does not exist"
              });
            }

            if (!isValidPassword(user.password, password)) {
              return done(null, false, {
                message: "Incorrect password."
              });
            }

            var userinfo = user.get();
            return done(null, userinfo);
          })
          .catch(function(err) {
            console.log("Error:", err);

            return done(null, false, {
              message: "Something went wrong with your Signin"
            });
          });
      }
    )
  );

  // console.log("end of function", globalUser);
};
