//greenfiled app

angular.module('myApp', [
  'myApp.foodbanks',
  'myApp.index',
  'myApp.login',
  'myApp.restaurants',
  'myApp.services',
  'myApp.singup',
  'ngRoute'
])

.constant('MY_CONSTANTS', {
  "SERVER": "http://127.0.0.1:3000"
})

.config(['$routeProvider', '$httpProvider', function($routeProvider, $httpProvider) {
  $routeProvider
    .when('/', {
      templateUrl: './index/main.html',
      controller: 'MainCtrl',
      controllerAs: 'vm'
    })
    .when('/signup:type', {
      templateUrl: './signup/signup.html',
      controller: 'SignupCtrl',
      controllerAs: 'vm'
    })
    .when('/login:type', {
      templateUrl: './login/login.html',
      controller: 'LoginCtrl',
      controllerAs: 'vm'
    })
    .when('/rst:userId', {
      templateUrl: './restaurants/rst.html',
      controller: 'RestaurantCtrl',
      controllerAs: 'vm'
    })
    .when('/fbk:userId', {
      templateUrl: './foodbanks/fbk.html',
      controller: 'FoodbankCtrl',
      controllerAs: 'vm'
    })
    .when('/dash:userId', {
      templateUrl: './dashboard/dash.html',
      controller: 'DashboardCtrl',
      controllerAs: 'vm'
    })
    .otherwise({
      redirectTo: '/'
    });

  // Your code here

  // We add our $httpInterceptor into the array
  // of interceptors. Think of it like middleware for your ajax calls
  $httpProvider.interceptors.push('AttachTokens');

}])



//will need to update and understand this --> currently copied from shortly.js

.factory('AttachTokens', ['$window', function($window) {
  // this is an $httpInterceptor
  // its job is to stop all out going request
  // then look in local storage and find the user's token
  // then add it to the header so the server can validate the request
  var attach = {
    request: function(object) {
      var jwt = $window.localStorage.getItem('com.shortly');
      if (jwt) {
        object.headers['x-access-token'] = jwt;
      }
      object.headers['Allow-Control-Allow-Origin'] = '*';
      return object;
    }
  };
  return attach;
}])

.run(['$rootScope', '$location', 'AuthService', function($rootScope, $location, AuthService) {
  // here inside the run phase of angular, our services and controllers
  // have just been registered and our app is ready
  // however, we want to make sure the user is authorized
  // we listen for when angular is trying to change routes
  // when it does change routes, we then look for the token in localstorage
  // and send that token to the server to see if it is a real user or hasn't expired
  // if it's not valid, we then redirect back to signin/signup
  $rootScope.$on('$routeChangeStart', function(evt, next, current) {
    if (next.$$route && next.$$route.authenticate && !Auth.isAuth()) {
      $location.path('/signin');
    }
  });
}]);