var passport = require('passport');
var db = require('../models/index.js');

module.exports = {

  signup: function(req, res, next){
    var username = req.body.username;
    var password = req.body.password;

    // just create user, and if already exists will return a validation error.
    var newuser = db.User.build({username:username, password:password});
    newuser.save().then(function(){
      passport.authenticate('local') (req, res, function() {
        res.send(newuser);
      });
    }).catch(db.Sequelize.ValidationError, function (err) {
        // respond with validation errors
        return res.status(422).send(err.errors);
    });
    
  },

  signout: function(req, res, next){
    //req.session.destroy();
    req.logout();
    res.status(200).send("Successfully Logged Out");
  }

};