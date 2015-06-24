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


});