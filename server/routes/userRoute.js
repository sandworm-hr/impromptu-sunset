var userController = require('../controllers/userController.js');
var passport = require('../config/passport.js');
var helpers = require('../config/helpers.js');

module.exports = function (app) {
  // app === userRouter injected from middlware.js
  passport.setup(app);
  app.post('/login', function(req,res,next){
    passport.authenticate(req,res,next);
  });
  app.post('/signup', userController.signup);
  app.get('/logout', helpers.ensureAuthenticated, userController.signout);
  //app.get('/signedin', userController.checkAuth);

};
