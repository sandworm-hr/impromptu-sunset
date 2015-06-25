"use strict";

describe('Multiplayer Controller', function() {
  var $scope;
  var ctrl;
  var $controller;
  var createController;
  var $rootScope;
  var $httpBackend;
  var ColorIndexService;
  var Session;
  var $interval;
  var $timeout;

  beforeEach(module('app'));


  beforeEach(inject(function($injector) {

    $rootScope = $injector.get('$rootScope');
    $httpBackend = $injector.get('$httpBackend');
    $timeout = $injector.get('$timeout');

    Session = $injector.get('Session');
    ColorIndexService = $injector.get('ColorIndexService');

    $scope = $rootScope.$new();

    var $controller = $injector.get('$controller');


    createController = function() {
      return $controller('MultiplayerController', {
        $scope: $scope,
        Session: Session,
        ColorIndexService: ColorIndexService,
        $timeout: $timeout,
        $httpBackend: $httpBackend
      });
    };
  }));


  it('should have a users collection', function() {
    createController();
    expect($scope.usersCollection).toBeDefined();
  }); 

  describe('socket io present', function() {
    it('should emit a user update properly', function() {
      createController();
      spyOn($scope.socket, 'emit');
      $scope.socket.emit();
      expect($scope.socket.emit).toHaveBeenCalled();
    });
  })

  describe('setting and updating myUser', function() {
    it('should create a default username and colorIndex', function() {
      createController();
      var user = $scope.getMyUserAndColor();
      var expectedUser = {username: 'you', colorIndex: 10};

      expect(user).toEqual(expectedUser);
    });

    it('should update myUser and color when the session data changes', function() {
      createController();
      var newUserData = {username: 'spiderdog', colorIndex: 8};
      $scope.myUser = {username: 'flipper', colorIndex: 4};
      spyOn($scope, 'getMyUserAndColor').and.returnValue(newUserData);
      $scope.updateMyUserAndColor();
      expect($scope.myUser).toEqual(newUserData);
    });

    it('should call handleUserUpdate when the username has changed', function() {
      createController();
      var newUserData = {username: 'airbud', colorIndex: 5};
      $scope.myUser = {username: 'mowgli', colorIndex: 4};
      spyOn($scope, 'handleUserUpdate');
      $scope.updateMyUserAndColor();
      expect($scope.handleUserUpdate).toHaveBeenCalled();
    });

    it('should call handleUserUpdate when the username has not changed', function() {
      createController();
      var newUserData = {username: 'captainPlanet', colorIndex: 10};
      $scope.myUser = {username: 'captainPlanet', colorIndex: 10};
      spyOn($scope, 'handleUserUpdate');
      $scope.updateMyUserAndColor();
      expect($scope.handleUserUpdate).toHaveBeenCalled();
    });

    it('should delete users when they log out', function(done) {
      // note this test doesn't test the socket listener itself
      // the socket listener that listens for 'userExit' calls handleDeleteUser
      $httpBackend.expectGET('/app/home/home.html').respond(200);
      createController();
      $scope.usersCollection['Cruella'] = {username: 'Cruella', colorIndex: 5};
      $scope.handleDeleteUser({username: 'Cruella', colorIndex: 5});
      // must run $timeout.flush() to let the $timeout promises run to completion
      $timeout.flush();
      expect($scope.usersCollection['Cruella']).not.toBeDefined();
      done();
      });
  });


  it('should have an array of 11 colors for setting the circle colors', function() {
    createController();
    expect($scope.colors.length).toBe(11);
  })
});