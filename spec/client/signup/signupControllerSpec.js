"use strict";

describe('SignUpController', function() {
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
      return $controller('SignUpController', {
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
    expect(typeof $scope.processSignup).toBe('function');
  }); 

  it('should send user data', function() {
    $httpBackend.expectPOST('api/users/signup').respond({}, 200);
    $httpBackend.expectGET('/app/home/home.html').respond({}, 200);
    createController();
    $scope.processSignup({username: 'test', password: 'password'});
    $httpBackend.flush();
    expect($scope.status).toBe('Signup Completed');
  });

  it('should error when providing a username that is already in use', function() {
    $httpBackend.expectPOST('api/users/signup').respond(500);
    $httpBackend.expectGET('/app/home/home.html').respond(200);
    createController();
    $scope.processSignup({username: 'takenUsername', password: 'password'});
    $httpBackend.flush();
    expect($scope.status).toBe('Signup Failed');
  });


  it('should return true', function() {
    expect(true).toBe(true);
  });




});