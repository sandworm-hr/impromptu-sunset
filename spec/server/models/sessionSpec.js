require('dotenv').load();
var express = require('express');
var db = require('../../../server/models/index.js');

describe("Session Model", function(){

  beforeEach(function(done){
    db.sequelize.sync({force: true}).then(function(){
      done();
    });
  });

  it("should create a new session", function(done){
    var newuser = db.User.build({username:'ss', password:'bla'});
    newuser.save().then(function(x){
      var s = db.Session.build({scores: [1,2,3]});
      newuser.addSessions(s).then(function(){
        newuser.getSessions().then(function(data){
          data[0].getUser().then(function(user){
            expect(user.username).toEqual("ss");
            done();
          });
        });
      });
    });
  });

});