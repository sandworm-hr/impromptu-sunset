require('dotenv').load();
var db = require('../../../server/models/index.js');
var request = require('supertest');
var superagent = require('superagent');
var app = require('../../../index.js');

var agent = superagent.agent();

describe("User Controller", function(){

  beforeEach(function(done) {
      // Log out currently signed in user
      request(app)
        .get('/api/users/logout')
        .end(function(err, res) {
          db.sequelize.sync({force: true}).then(function(){
            done();
          });
        });
  });


  it("should signup a new user", function(done){
    request(app)
        .post('/api/users/signup')
        .send({
          'username': 'Phillip',
          'password': 'Phillip' })
        .end(function(err, res) {
           expect(res.status).toEqual(200);
           done();
        });
  });


  it("should not login a new user", function(done){
    request(app)
        .post('/api/users/login')
        .send({
          'username': 'Phillip',
          'password': 'Phillip' })
        .end(function(err, res) {
           expect(res.status).toEqual(401);
           done();
        });
  });

  it("should login an existing user", function(done){
    request(app)
        .post('/api/users/signup')
        .send({
          'username': 'Phillip',
          'password': 'Phillip' })
        .end(function(err, res) {
           request(app)
             .post('/api/users/login')
             .send({
               'username': 'Phillip',
               'password': 'Phillip' })
             .end(function(err, res) {
                expect(res.status).toEqual(200);
                done();
             });
        });
  });

  it("should not login an existing user it invalid username", function(done){
    request(app)
        .post('/api/users/signup')
        .send({
          'username': 'Phillip',
          'password': 'Phillip' })
        .end(function(err, res) {
           request(app)
             .post('/api/users/login')
             .send({
               'username': 'Phillip1',
               'password': 'Phillip' })
             .end(function(err, res) {
                expect(res.status).toEqual(401);
                expect(res.body.message).toEqual("Incorrect username.")
                done();
             });
        });
  });

  it("should not login an existing user it invalid password", function(done){
    request(app)
        .post('/api/users/signup')
        .send({
          'username': 'Phillip',
          'password': 'Phillip' })
        .end(function(err, res) {
           request(app)
             .post('/api/users/login')
             .send({
               'username': 'Phillip',
               'password': 'Phillip1' })
             .end(function(err, res) {
                expect(res.status).toEqual(401);
                expect(res.body.message).toEqual("Incorrect password.")
                done();
             });
        });
  });

  it("should logout signed in user", function(done){
    request(app)
      .post('/api/users/signup')
      .send({
        'username': 'Phillip',
        'password': 'Phillip' })
      .end(function(err, res) {
         expect(res.status).toEqual(200);
         agent.saveCookies(res);
         var req = request(app)
          .get('/api/users/logout');
          agent.attachCookies(req);
          req.end(function(err, res){
            expect(res.status).toEqual(200);
            done();
          });
      });
  });

  it("should return 401 if unauthenticated user tries to logout", function(done){
    request(app)
      .get('/api/users/logout')
      .end(function(err, res){
        expect(res.status).toEqual(401);
        done();
      });
    
  });

});