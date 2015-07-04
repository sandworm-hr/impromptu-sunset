var passport = require('passport');
var db = require('../models/index.js');

module.exports = {
  // allSessions returns all the sessions of the
  // authenticated user.
  allSessions: function(req, res, next){
    // the authenticated user id is retrieved from the
    // request session
    var username = req.url.slice(10);
    if (username) {
      db.User.findOne({where : {username: username}}).then(function(user){
        user.getSessions().then(function(x){
          // return all user sessions
          res.status(201).send(x);
        }).catch(function(err){
          res.status(422).send(err);
        });
      });
    } else {
      var userid = req.session.passport.user.id;
      console.log(userid);
      // using sequelize retrieve that user from
      // the userid
      db.User.findById(userid).then(function(user){
        user.getSessions().then(function(x){
          // return all user sessions
          res.status(201).send(x);
        }).catch(function(err){
          res.status(422).send(err);
        });
      });
    }
  },

  sessionById: function(req, res, next) {
    console.log(req.url);

    var id = +req.url.slice(4);
    db.Session.findOne({where: {id: id}}).then(function(session) {
      res.status(201).send(session);
    });

  },

  editSession: function(req, res, next) {
    console.log('Calling edit session with ', req.body);
    var attributes = {};
    if (req.body.hasOwnProperty('text')) {
      attributes.text = req.body.text;
    } else {
      attributes.visibility = req.body.visibility;
    }
    db.Session.findOne({where: {id: req.body.id}}).then(function(session) {
      session.updateAttributes(attributes).then(function() {
        res.status(201).send("Session Updated!");
      });
    });
  },

  // newSession creates a new session for the 
  // currently signed in user
  newSession: function(req, res, next){
    var scores = req.body.scores;
    var word_count = req.body.word_count;
    var session_time = req.body.session_time;
    var char_count = req.body.char_count;
    var text = req.body.text;
    var title = req.body.title;
    // retrieve the user id from the session
    var userid = req.session.passport.user.id;
    // use sequelize to retrieve the user from
    // the user id
    db.User.findById(userid).then(function(user){
      // once retrieved, create a session
      var s = db.Session.build({
        session_time: session_time, 
        word_count: word_count,
        scores: scores,
        text: text,
        char_count: char_count,
        type: 'default',
        visibility: 'public',
        name: title
      });
      // add that session to the list of user sessions
      // since a user has many sessions (1 to many relationship)
      user.addSessions(s).then(function(x){
        res.status(201).send("Session Created");
      }).catch(function(err){
        res.status(422).send(err);
      });
    });

  }

};