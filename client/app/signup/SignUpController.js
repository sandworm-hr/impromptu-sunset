app.controller('SignUpController', ['$scope', 'Users', function ($scope, Users) {

  $scope.user = {};

  $scope.message;

  // stores the status of the signup attempt for testing purposes
  $scope.status;

  $scope.processSignup = function(user) {
   Users.signUp(user)
     .success(function(data, status) {
       $scope.status = 'Signup Completed';
     })
     .catch(function(data) {
      // FOR TESTING:
      // in testing there is no data object
      // if there is a data object, we are not running a test
      // therefore we need to set the scope message
      if (data.data) {
        $scope.message = data.data.message;
      }
      $scope.status = 'Signup Failed';
     });
  }
}]);


