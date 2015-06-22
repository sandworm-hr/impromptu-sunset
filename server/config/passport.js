var passport = require('passport');
var db = require('../models/index.js');
var LocalStrategy = require('passport-local').Strategy;


module.exports.setup = function(app){
  app.use(passport.initialize());
  app.use(passport.session());

  passport.use(new LocalStrategy(
    function(username, password, done) {
      db.User.findOne({ where: {username: username} })
        .then(function(user) {
          if (!user) {
            return done(null, false, { message: 'Incorrect username.' });
          }
          else{
            user.verifyPassword(password, function(err, output){
              if(err)
                done(err);
              else{
                if(!output){
                  return done(null, false, { message: 'Incorrect password.' });  
                } else {
                  return done(null, user);
                }
              }
            });
          }
        })
        .catch(function(err){
          return done(err);
        })
    }
  ));

  passport.serializeUser(function(user, done) {
    done(null, user);
  });

  passport.deserializeUser(function(user, done) {
    done(null, user);    
  });
}

module.exports.authenticate = function(req,res,next){
  return passport.authenticate('local', function (err, user, info) {
    console.log(info);
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).send(info);
    }

    req.logIn(user, function(err) {
      if (err) return next(err);
      res.status(200).send(user);
      // return res.json({
      //     message: 'user authenticated',
      // });
    });
  })(req,res,next);
};





