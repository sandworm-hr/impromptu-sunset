"use strict";

describe('ResultsController', function() {
  var $scope;
  var ctrl;
  var $controller;
  var createController;
  var $rootScope;
  var $timeout;
  var $httpBackend;
  var Results;

  beforeEach(module('app'));


  beforeEach(inject(function($injector) {

    $rootScope = $injector.get('$rootScope');
    $httpBackend = $injector.get('$httpBackend');
    $timeout = $injector.get('$timeout');
    Results = $injector.get('Results');
    $scope = $rootScope.$new();

    var $controller = $injector.get('$controller');

    createController = function() {
      return $controller('ResultsController', {
        $scope: $scope,
        $timeout: $timeout,
        Results: Results
      });
    };

    Results.setDuration(0);
    Results.setText("");
    Results.setScores([]);
  }));

  it('should have a sendResultsToServer function', function() {
    createController();
    expect(typeof $scope.sendResultsToServer).toBe('function');
  });

  it('should send data to the server', function() {
    $httpBackend.expectPOST('/api/sessions').respond({}, 201);
    $httpBackend.expectGET('/app/home/home.html').respond({}, 200);
    createController();
    $scope.sendResultsToServer({session_time: 1, char_count: 11, text: 'hello world', scores: [0,0,0,1,1], word_count: 2});
    $httpBackend.flush();
    expect($scope.status).toBe('Saved Session Data');
  });

});
