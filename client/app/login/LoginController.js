app.controller('LoginController', ['$scope', 'Users', function ($scope, Users) {

  $scope.user = {};

  $scope.message;

  $scope.status;

  $scope.processLogin= function(user) {
   Users.login(user)
     .success(function(data, status) {
       $scope.status = 'Login Completed';
     })
     .catch(function(data) {
      // FOR TESTING:
      // in testing there is no data object
      // if there is a data object, we are not running a test
      // therefore we need to set the scope message
      if (data.data) {
        $scope.message = data.data.message;
      }
      $scope.status = 'Login Failed';
     });
  }

}]);
