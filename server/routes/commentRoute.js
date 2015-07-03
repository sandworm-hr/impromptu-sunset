var commentController = require('../controllers/commentController.js');

// This file handles the comment routing.
module.exports = function (app) {

  app.route('/')
    .get(commentController.allComments)
    .post(commentController.newComment);

};
