'use strict';
module.exports = function(sequelize, DataTypes) {
  var Session = sequelize.define('Session', {
    name: DataTypes.TEXT,
    type: DataTypes.TEXT,
    visibility: DataTypes.TEXT,
    session_time: DataTypes.INTEGER,
    word_count: DataTypes.INTEGER,
    scores: DataTypes.JSON,
    char_count: DataTypes.INTEGER,
    text: DataTypes.TEXT
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Session;
};