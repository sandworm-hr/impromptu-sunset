require('dotenv').load();
var db = require('../../../server/models/index.js');
var request = require('supertest');
var superagent = require('superagent');
var app = require('../../../index.js');

var agent = superagent.agent();

describe("Session Controller", function(){

  beforeEach(function(done) {
      // Log out currently signed in user
      agent = superagent.agent();
      db.User.sync({force: true}).then(function(){
        request(app)
          .post('/api/users/signup')
          .send({
            'username': 'Phillip',
            'password': 'Phillip' })
          .end(function(err, res) {
            agent.saveCookies(res);
            db.Session.sync({force: true}).then(function(){
              done();
            });
           });
      });
  });
  


  it("should create a new session if signed in", function(done){
    var req = request(app)
      .post('/api/sessions/');
      agent.attachCookies(req);
      req
        .send({
          'scores': [1,2,3],
        })
        .end(function(err, res) {
           db.Session.findAll().then(function(data){
              expect(data.length).toEqual(1);
              expect(res.status).toEqual(201);
              done();
           });
        });
  });

  it("should not create a new session if not signed in", function(done){
    request(app)
      .get('/api/users/logout')
      .end(function(err,res){
        var req = request(app)
          .post('/api/sessions/');
          req
            .send({
              'scores': [1,2,3],
            })
            .end(function(err, res) {
               db.Session.findAll().then(function(data){
                  expect(data.length).toEqual(0);
                  expect(res.status).toEqual(401);
                  done();
               });              
            });
      });
  });


  it("should return all user sessions if logged in", function(done){
    var req = request(app)
      .get('/api/sessions');
      agent.attachCookies(req);
      req
        .end(function(err, res) {
           expect(res.status).toEqual(201);
           done();
        });
  });

  it("should not return all user sessions if not logged in", function(done){
    request(app)
      .get('/api/users/logout')
      .end(function(err,res){
        var req = request(app)
          .get('/api/sessions')
          .end(function(err, res) {
            expect(res.status).toEqual(401);
            done();
          });
      });
  });

});