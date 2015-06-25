describe('LoginController', function() {
  var scope;
  var ctrl;

  beforeEach(module('app'));

  beforeEach(inject(function($rootScope, $controller) {
    scope = $rootScope.$new();
    ctrl = $controller('LoginController', {$scope: scope});
  }));

  it('should have a user object', function() {
    expect(scope.user).toBeDefined();
  }); 

  it('should have a processLogin function', function() {
    expect(scope.processLogin).toBeDefined();
  }); 

  it('should return true', function() {
    expect(true).toBe(true);
  });


});