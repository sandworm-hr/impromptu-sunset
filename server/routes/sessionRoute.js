var sessionController = require('../controllers/sessionController.js');
var helpers = require('../config/helpers.js');

module.exports = function (app) {

  app.route('/')
    .get(helpers.ensureAuthenticated, sessionController.allSessions)
    .post(helpers.ensureAuthenticated,sessionController.newSession);

};
