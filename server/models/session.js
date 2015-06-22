'use strict';
module.exports = function(sequelize, DataTypes) {
  var Session = sequelize.define('Session', {
    duration: DataTypes.INTEGER,
    word_count: DataTypes.INTEGER,
    session_data: DataTypes.JSON,
    text: DataTypes.TEXT
  }, {
    classMethods: {
      associate: function(models) {
         Session.belongsTo(models.User);
      }
    }
  });
  return Session;
};