app.controller('SignUpController', ['$scope', 'Users', function ($scope, Users) {

  $scope.user = {};

  $scope.message;

  $scope.status;

  // ERROR CODE GUIDE: (use this for testing)
  // 422 : Username already exists
  // 200 : User created successfully


  $scope.processSignup = function(user) {
   Users.signUp(user)
     .success(function(data, status) {
       $scope.status = 'Passed';
     })
     .catch(function(data) {
      console.log('ERROR handling ', data)
      // FOR TESTING:
      // in testing there is no data object
      // if there is a data object, we are not running a test
      // therefore we need to set the scope message
      if (data.data) {
        $scope.message = data.data.message;
      }
      $scope.status = 'Error';
     });
  }
}]);


