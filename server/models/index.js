// This file loads all the tables based on the current environment
var fs        = require('fs');
var path      = require('path');
var Sequelize = require('sequelize');
var basename  = path.basename(module.filename);
var env       = process.env.NODE_ENV || 'development';
var config    = require(__dirname + '/../config/config.json')[env];
// if specifying an environment variable, will use that to connect to sequelize
if(config.use_env_variable){
  var sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else{
  // otherqise will use the normal parameters
  var sequelize = new Sequelize(config.database, config.username, config.password, config);
}
var db        = {};

fs
  .readdirSync(__dirname)
  .filter(function(file) {
    return (file.indexOf('.') !== 0) && (file !== basename);
  })
  .forEach(function(file) {
    var model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });
// runs the associate class method inside each of the
// models, in order to establish the relationships between
// the models.
Object.keys(db).forEach(function(modelName) {
  if ('associate' in db[modelName]) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;
// exporting db, to access and of the models just do this: db.User or db.Session
module.exports = db;
