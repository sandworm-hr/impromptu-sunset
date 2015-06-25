require('dotenv').load();
var express = require('express');
var db = require('../../../server/models/index.js');

describe("User Model", function(){

  beforeEach(function(done){
    db.sequelize.sync({force: true}).then(function(){
      done();
    });
  });

  it("should create a new user", function(done) {
    var a = db.User.build({username: "username", password: "password"});
    expect(a.username).toEqual("username");
    done();
  });

  it("should save user to database", function(done){
    var a = db.User.build({username: "username2", password: "password"});
    a.save().then(function(x){
      var z= db.User.findAll({where: {username: "username2"}}).then(function(data){
        expect(data[0].username).toEqual("username2");
        done();
      });
    }).catch(function(x){
      console.log("ERROR ", x);
    });
  });

  it("should not allow the same username", function(done){
    var a = db.User.build({username: "username2", password: "password"});
    a.save().then(function(x){
      var b = db.User.build({username: "username2", password: "password"});
      b.save().catch(function(x){
        expect(x.name).toEqual("SequelizeValidationError");
        done();
      });
    }).catch(function(x){
      console.log("ERROR ", x);
    });  
  });

  it("should hash the password on user create", function(done){
    var a = db.User.build({username: "username2", password: "password"});
    a.save().then(function(x){
      expect(x.password).not.toEqual("password");
      done();
    });
  });

  it("should verify password and return false if invalid", function(done){
    var a = db.User.build({username: "username2", password: "password"});
    a.save().then(function(x){
      x.verifyPassword("password2", function(err, result){
        expect(err).toEqual(null);
        expect(result).toEqual(false);
        done();
      });
    });
  });

  it("should verify password and return true if valid", function(done){
    var a = db.User.build({username: "username2", password: "password"});
    a.save().then(function(x){
      x.verifyPassword("password", function(err, result){
        expect(err).toEqual(null);
        expect(result).toEqual(true);
        done();
      });
    });
  });

  it("should return the sessions of that user", function(done){
    var newuser = db.User.build({username:'ss', password:'bla'});
    newuser.save().then(function(x){
      var s = db.Session.build({scores: [1,2,3]});
      newuser.addSessions(s).then(function(){
        newuser.getSessions().then(function(data){
          expect(data.length).toEqual(1);
          expect(data[0].scores).toEqual([1,2,3]);
          done();
        });
      });
    });
  });

});