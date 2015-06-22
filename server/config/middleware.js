var db = require('../models/index');
var bodyParser  = require('body-parser');
var session = require('express-session');
var helpers = require('./helpers.js');

module.exports = function(app, express){
  
  var userRouter = express.Router();

  app.use(session({
    secret: 'a secret',
    resave: false,
    saveUninitialized: true
  }));

  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());
  app.use(express.static(__dirname + '/../../client'));

  app.use('/api/users', userRouter);
  app.use(helpers.errorLogger);
  app.use(helpers.errorHandler);
  
  // include the routers
  require('../routes/userRoute.js')(userRouter);

  
}



