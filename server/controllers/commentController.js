
var db = require('../models/index.js');

module.exports = {

  newComment: function(req, res, next) {

    console.log('saving new comment to db: ', req.body);

    var comment = db.Comment.create({
      comment: req.body.comment,
      from: req.body.from,
      UserId: req.body.UserId,
      SessionId: req.body.SessionId
    }).then(function() {
      res.status(201).send('Success! Comment saved to database');
      console.log('Saved comment!');
    }).catch(function(err) {
      console.log('Error: ', err);
    })
  },

  allComments: function(req, res, next) {
    var sessionId = req.url.split('=')[1];
    console.log(sessionId);
    if (sessionId) {
      db.Comment.findAll({where: {SessionId: sessionId}}).then(function(comments) {
        var commentData = comments.map(function(comment) {
          return comment.dataValues;
        });
        console.log(commentData);
        res.status(201).send(commentData);
      });
    }
  }

};

  // allSessions: function(req, res, next){
  //   // the authenticated user id is retrieved from the
  //   // request session
  //   var username = req.url.slice(10);
  //   if (username) {
  //     db.User.findOne({where : {username: username}}).then(function(user){
  //       user.getSessions().then(function(x){
  //         // return all user sessions
  //         res.status(201).send(x);
  //       }).catch(function(err){
  //         res.status(422).send(err);
  //       });
  //     });
  //   } else {
  //     var userid = req.session.passport.user.id;
  //     console.log(userid);
  //     // using sequelize retrieve that user from
  //     // the userid
  //     db.User.findById(userid).then(function(user){
  //       user.getSessions().then(function(x){
  //         // return all user sessions
  //         res.status(201).send(x);
  //       }).catch(function(err){
  //         res.status(422).send(err);
  //       });
  //     });
  //   }
  // },