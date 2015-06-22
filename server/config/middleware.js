var db = require('../models/index');

module.exports = function(app, express){
  
  app.use(express.static(__dirname + '/../../client'));
  
}



