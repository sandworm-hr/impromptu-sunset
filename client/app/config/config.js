
app.config(function($stateProvider, $urlRouterProvider, $httpProvider) {

  $httpProvider.interceptors.push('sessionInjector');
  $urlRouterProvider.otherwise('/index');

  $stateProvider

    .state('index', {
      url: '/index',
      templateUrl: '/app/home/home.html'
    })

    .state('signup', {
      url: '/signup',
      templateUrl: 'app/signup/signup.html'
    })

    .state('login', {
      url: '/login',
      templateUrl: 'app/login/login.html'
    })

    .state('profile', {
      url: '/profile',
      templateUrl: 'app/profile/profile.html'
    })

    .state('results', {
      url: '/results',
      templateUrl: 'app/results/results.html'
    })
})
.run(['$http', '$rootScope','$cookies','$state','Session', function($http, $rootScope, $cookies,$state,Session) {

    var statesThatDontRequireAuth = ['login', 'signup'];
    var statesThatRequireNoAuth = ['login', 'signup'];

    //check if route requires no auth
    var stateNoAuth = function(state) {
        for (var element in statesThatRequireNoAuth) {
            var input = statesThatRequireNoAuth[element];
            if (state.substring(0, input.length) == input)
                return true;
        }
        return false;
    }

    // check if route does not require authentication
    var routeClean = function(state) {
        for (var element in statesThatDontRequireAuth) {
            var input = statesThatDontRequireAuth[element];
            if (state.substring(0, input.length) == input)
                return true
        }
        return false;
    }


    $rootScope.$on('$stateChangeStart', function(ev, to, toParams, from, fromParams) {

        var result= Session.isAuthenticated();
        
        if (!routeClean(to.name) && result == false ) // user not logged in trying to access a page that needs authentication.
        {
            console.log("not logged in!!");
            ev.preventDefault();
            $state.go("login");
        } else if (stateNoAuth(to.name)  && result == true) { //logged in but going to not logged in page
            ev.preventDefault();
            $state.go("index"); 
        } 

    });
}]);

        
// use ngEnter="action" to trigger starting
app.directive('ngEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if(event.which === 13) {
                scope.$apply(function (){
                    scope.$eval(attrs.ngEnter);
                });

                event.preventDefault();
            }
        });
    };
});