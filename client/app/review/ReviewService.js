angular.module('app.services')

  .factory('Review', ['$http', function($http) {

    var functions = {};

    functions.postComment = function(comments) {
      return $http({
        method: 'POST',
        url: '/api/comments',
        data: comments
      })
      .success(function(response) {
        console.log(response);
      });
    };

    functions.getComments = function() {
      return $http({
        method: 'GET',
        url: '/api/comments'
      })
      .success(function(response) {
        console.log(response);
      });
    };

    return functions;
  }]);