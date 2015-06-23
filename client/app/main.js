app.controller('mainController', ['$scope', 'Users','Session', function ($scope, Users, Session) {

  $scope.logout = function () {
    Users.logout();
  };

  $scope.isAuthenticated = function(){
    return Session.isAuthenticated();
  };


}]);