var bcrypt   = require('bcrypt-nodejs');

'use strict';
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      validate: {
        isUnique: function(value, next) {
          User.find({
              where: {username: value},
              attributes: ['id']
          })
          .done(function(error, user) {
            if (error)
                // Some unexpected error occured with the find method.
                return next(error);
            if (user)
                // We found a user with this email address.
                // Pass the error to the next method.
                return next('Email address already in use!');
            // If we got this far, the email address hasn't been used yet.
            // Call next with no arguments when validation is successful.
            next();
          });
        }
      }
    },
    password: DataTypes.TEXT,
    session_duration: DataTypes.INTEGER
  }, {
    hooks: {
      beforeCreate: function(user, options, fn) {
        user.setPassword(user.password, function(){
          fn();
        });
      }
    },
    classMethods: {
      associate: function(models) {
        User.hasMany(models.Session)
      },
    },
    instanceMethods: {
      setPassword: function(password, done) {
        var user = this;
        return bcrypt.genSalt(10, function(err, salt) {
          if (err) {
            return done(err);
          }
          return bcrypt.hash(password, salt, null, function(error, encrypted) {
            if (err) {
              return done(err);
            }
            user.password = encrypted;
            return done();
          });
        });
      },
      verifyPassword: function(password, done) {
        return bcrypt.compare(password, this.password, function(err, res) {
          if(err){
            return done(err);
          }
          return done(err, res);
        });
      }
    }
  });
  return User;
};