angular.module('myApp', [
  'myApp.index',
  'myApp.dashboard',
  'myApp.login',
  'myApp.services',
  'myApp.signup',
  'myApp.profile',
  'door3.css',
  'ngRoute'
])

.constant('MY_CONSTANTS', {
  "SERVER": "http://127.0.0.1:3000"
})

.config(['$routeProvider', '$httpProvider', function($routeProvider, $httpProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'app/index/main.html',
      controller: 'MainCtrl',
      controllerAs: 'vm',
      css: '../styles/main-page.css'
    })
    .when('/signup/:type', {
      templateUrl: 'app/signup/signup.html',
      controller: 'SignupCtrl',
      controllerAs: 'vm'
    })
    .when('/login', {
      templateUrl: 'app/login/login.html',
      controller: 'LoginCtrl',
      controllerAs: 'vm'
    })
    .when('/profile/:type/:username', {
      templateUrl: 'app/profile/profile.html',
      controller: 'ProfileCtrl',
      controllerAs: 'vm'
    })
    .when('/dash/:username', {
      templateUrl: 'app/dashboard/dash.html',
      controller: 'DashboardCtrl',
      controllerAs: 'vm'
    })
    .otherwise({
      redirectTo: '/'
    });

  // We add our $httpInterceptor into the array
  // of interceptors. Think of it like middleware for your ajax calls
  $httpProvider.interceptors.push('AttachTokens');

}])
.factory('AttachTokens', ['$window', function($window) {
  // this is an $httpInterceptor
  // its job is to stop all out going request
  // then look in local storage and find the user's token
  // then add it to the header so the server can validate the request
  var attach = {
    request: function(object) {
      var jwt = $window.localStorage.getItem('com.fudWize');
      if (jwt) {
        object.headers['x-access-token'] = jwt;
      }
      object.headers['Allow-Control-Allow-Origin'] = '*';
      return object;
    }
  };
  return attach;
}])



.run(['$rootScope', '$location', '$window', function($rootScope, $location, $window) {
  // here inside the run phase of angular, our services and controllers
  // have just been registered and our app is ready
  // however, we want to make sure the user is authorized
  // we listen for when angular is trying to change routes
  // when it does change routes, we then look for the token in localstorage
  // and send that token to the server to see if it is a real user or hasn't expired
  // if it's not valid, we then redirect back to login
  var isAuth = function () {
    return !!$window.localStorage.getItem('com.fudWize');
  };

  $rootScope.$on('$routeChangeStart', function(evt, next, current) {
    if (next.$$route && !isAuth()) {
      if (!(next.$$route.originalPath === '/signup/:type' || next.$$route.originalPath === '/login' || next.$$route.originalPath === '' || next.$$route.originalPath === '/')) {
        $location.path('/login');
      }
    }

    // console.log('route', next.$$route, 'auth', isAuth());
    // if (next.$$route && isAuth()) {
    //   if (next.$$route.originalPath === '/signup/:type' || next.$$route.originalPath === '/login' || next.$$route.originalPath === '' || next.$$route.originalPath === '/') {
    //    **how can you redirect someone to a path that depends on type params?
    //     $location.path('/profile');
    //   }
    // }
  });
}]);
