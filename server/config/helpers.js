
module.exports = {
  ensureAuthenticated: function (req, res, next) {
    if (req.isAuthenticated()) { return next(); }
    res.status(401).send("Not Authenticated");
  },
  errorLogger: function (error, req, res, next) {
    // log the error then send it to the next middleware in
    // middleware.js
    console.error(error.stack);
    next(error);
  },

  errorHandler: function (error, req, res, next) {
    // send error message to client
    // message for gracefull error handling on app
    res.send(500, {error: error.message});
  }

}