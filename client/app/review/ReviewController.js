
app.controller('ReviewController', ['$scope', '$stateParams', 'Review', 'Session', 'Sessions', function($scope, $stateParams, Review, Session, Sessions) {


  $scope.getSession = function (id) {
    Sessions.getSessionById(function(data){
      $scope.sessionInfo = data;
    }, id);
  };

  $scope.saveComment = function() {
    if ($scope.commentInput !== '') {
      var comment = {};
      comment.comment = $scope.commentInput;
      comment.from = Session.getUser().userId;
      comment.UserId = $scope.sessionInfo.UserId;
      comment.SessionId = $scope.sessionInfo.id;
      console.log(comment);
      Review.postComment(comment)
        .success(function(data, status) {
           $scope.commentInput = '';
           // TO DO: display some sort of success message
        })
        .catch(function(data) {
          $scope.status = 'Save Failed';
       });
    }
  };

  $scope.editMode = function() {
    if ($scope.mode === 'view') {
      $scope.mode = 'edit';
    }
  };

  $scope.mode = "view";


  if ($stateParams.id) {
    $scope.getSession($stateParams.id);
  }

}]);
