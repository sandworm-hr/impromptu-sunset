angular.module('app.services', [])

  .factory('Session',['$cookies', '$injector', function ($cookies, $injector) {
    
    var user = function(){
      return($cookies.getObject("user") || {username: "", userId: ""});
    };

    var session = {};
    session.getUser = function(){
      return {username: user().username, userId: user().userId};
    };
    session.create = function (userId, userName) {
      $cookies.putObject('user', {userId: userId, username: userName});
      var $state = $injector.get('$state');
      $state.go('index');
    };
    session.destroy = function () {
      $cookies.remove("user");
      // also redirect to sign in page
      var $state = $injector.get('$state');
      $state.go('login');
    };
    session.isAuthenticated = function(){
      return (!!user().username);
    };

    return session;
  }])

  .factory('sessionInjector', ['Session','$q', function(Session, $q) {
    var sessionInjector = {
      responseError: function(rejection) {

        if (rejection.status == 401) {
            // remove the cookie if it exists.
            Session.destroy(); 
        }

        return $q.reject(rejection);
      }
    };
    return sessionInjector;
  }])

  .factory('Sessions', function($http){
    var getSessions = function(callback){
      $http({
        method: 'GET',
        url: '/api/sessions'
      })
      .then(function(response) {
        callback(response.data);
      });
    };

    return{
      getSessions: getSessions
    };
  })

  .factory('Users', function ($http, Session) {
    var logout = function() {
      $http({
        method: 'GET',
        url: '/api/users/logout'
      })
      .then(function(response) {
        Session.destroy();
      });
    };

    var login = function(user) {
      return $http({
        method: 'POST',
        url: '/api/users/login',
        data: user
      })
      .success(function(data, status) {
        Session.create(
          data.id,
          data.username
        );
      })
      .error(function(data, status) {
      });
    };

    var signUp = function(user) {
      return $http({
        method: 'POST',
        url: 'api/users/signup',
        data: user
      })
      .success(function(data, status) {
        Session.create(
          data.id,
          data.username
        );
      }).error(function(data, status) {
        // console.log('data', data, 'staus', status);
      });
    };


    return {
      login: login,
      signUp: signUp,
      logout: logout
    };
  });
