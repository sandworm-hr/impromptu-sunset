"use strict";

describe('LoginController', function() {
  var $scope;
  var ctrl;
  var Users;
  var $controller;
  var createController;
  var $rootScope;
  var $httpBackend;

  beforeEach(module('app'));


  beforeEach(inject(function($injector) {

    $rootScope = $injector.get('$rootScope');
    $httpBackend = $injector.get('$httpBackend');
    Users = $injector.get('Users');
    $scope = $rootScope.$new();

    var $controller = $injector.get('$controller');

    createController = function() {
      return $controller('LoginController', {
        $scope: $scope,
        Users: Users
      });
    };
  }));

  it('should have a user object', function() {
    createController();
    expect($scope.user).toBeDefined();
  }); 

  it('should have a processSignup function', function() {
    createController();
    expect(typeof $scope.processLogin).toBe('function');
  }); 

  it('should send user data', function() {
    $httpBackend.expectPOST('/api/users/login').respond({}, 200);
    $httpBackend.expectGET('/app/home/home.html').respond({}, 200);
    createController();
    $scope.processLogin({username: 'test', password: 'password'});
    $httpBackend.flush();
    expect($scope.status).toBe('Login Completed');
  });

  it('should error when providing an incorrect username or password', function() {
    $httpBackend.expectPOST('/api/users/login').respond(500);
    $httpBackend.expectGET('/app/home/home.html').respond(200);
    createController();
    $scope.processLogin({username: 'takenUsername', password: 'password'});
    $httpBackend.flush();
    expect($scope.status).toBe('Login Failed');
  });


  it('should return true', function() {
    expect(true).toBe(true);
  });




});