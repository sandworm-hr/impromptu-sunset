
app.config(function($stateProvider, $urlRouterProvider) {

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
});

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