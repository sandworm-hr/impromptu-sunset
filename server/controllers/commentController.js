
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
