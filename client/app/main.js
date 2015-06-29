app.controller('mainController', ['$scope', 'Users','Session', function ($scope, Users, Session) {

  // controller action that logs out the user by calling the Users service
  $scope.logout = function () {
    Users.logout();
  };

  // controller method that calls the Session service to check is the user is authenticated
  $scope.isAuthenticated = function(){
    return Session.isAuthenticated();
  };


}]);