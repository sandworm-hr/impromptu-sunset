
app.controller('ReviewController', ['$scope', '$stateParams', 'Review', 'Session', 'Sessions', function($scope, $stateParams, Review, Session, Sessions) {


  $scope.getSession = function (id) {
    Sessions.getSessionById(function(data){
      $scope.sessionInfo = data;
    }, id);
  };

  $scope.saveComment = function() {
    var comment = {};
    comment.comment = $scope.commentInput;
    comment.from = Session.getUser().userId;
    comment.UserId = $scope.sessionInfo.UserId;
    comment.SessionId = $scope.sessionInfo.id;
    console.log(comment);
    Review.postComment(comment)
      .success(function(data, status) {
         $scope.status = 'Saved Comment';
         // clear out comment
         // display some sort of success message
      })
      .catch(function(data) {
      // FOR TESTING:
      // in testing there is no data object
      // if there is a data object, we are not running a test
      // therefore we need to set the scope message
      if (data.data) {
        $scope.message = data.data.message;
      }
      $scope.status = 'Save Failed';
     });
  };


  if ($stateParams.id) {
    $scope.getSession($stateParams.id);
  }

}]);
