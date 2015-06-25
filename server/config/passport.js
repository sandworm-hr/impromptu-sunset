var passport = require('passport');
var db = require('../models/index.js');
var LocalStrategy = require('passport-local').Strategy;


module.exports.setup = function(app){
  // initialize passport and add as middleware
  app.use(passport.initialize());
  app.use(passport.session());

  // using passport's local strategy for authentication
  // will make it easy later to add other strategies as well.
  passport.use(new LocalStrategy(
    function(username, password, done) {
      db.User.findOne({ where: {username: username} })
        .then(function(user) {
          if (!user) {
            // if user not found, then invalid username
            return done(null, false, { message: 'Incorrect username.' });
          }
          else{
            user.verifyPassword(password, function(err, output){
              if(err)
                done(err);
              else{
                if(!output){
                  // if passwords don't match, then invalid password
                  return done(null, false, { message: 'Incorrect password.' });  
                } else {
                  // if correct username and password, then successful login
                  return done(null, user);
                }
              }
            });
          }
        })
        .catch(function(err){
          return done(err);
        });
    }
  ));

  // passport's methods that deal with serializing
  // and deserializing the user when storing and 
  // retreiving from cookie
  passport.serializeUser(function(user, done) {
    done(null, user);
  });

  passport.deserializeUser(function(user, done) {
    done(null, user);
  });
};

// uses passport's authenticate method.
// but uses a custom callback since we don't want to redirect to 
// a page, this is all handled client side. instead just want
// to send back a json response

module.exports.authenticate = function(req,res,next){
  return passport.authenticate('local', function (err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).send(info);
    }

    req.login(user, function(err) {
      if (err) return next(err);
      res.status(200).send(user);
    });
  })(req,res,next);
};





