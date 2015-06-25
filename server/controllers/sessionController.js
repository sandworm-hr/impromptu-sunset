var passport = require('passport');
var db = require('../models/index.js');

module.exports = {

  allSessions: function(req, res, next){
    var userid = req.session.passport.user.id;
    db.User.findById(userid).then(function(user){
      user.getSessions().then(function(x){
        res.status(201).send(x);
      }).catch(function(err){
        res.status(422).send(err);
      });
    });
  },

  newSession: function(req, res, next){
    var scores = req.body.scores;
    var word_count = req.body.word_count;
    var session_time = req.body.session_time;
    var char_count = req.body.char_count;
    var text = req.body.text;
    // create a new session for the authenticated user.
    var userid = req.session.passport.user.id;
    // console.log("USERRRRRRR", userid);
    db.User.findById(userid).then(function(user){
      console.log()
      var s = db.Session.build({
        session_time: session_time, 
        word_count: word_count,
        scores: scores,
        text: text,
        char_count: char_count
      });
      // console.log("SESSION ISSS", s);
      user.addSessions(s).then(function(x){
        res.status(201).send("Session Created");
      }).catch(function(err){
        res.status(422).send(err);
      });
    });

  }

};