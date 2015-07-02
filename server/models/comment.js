'use strict';
module.exports = function(sequelize, DataTypes) {
  var Comment = sequelize.define('Comment', {
    comment: DataTypes.TEXT,
    from: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER,
    SessionId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        Comment.belongsTo(models.User);
        // associations can be defined here
      }
    }
  });
  return Comment;
};