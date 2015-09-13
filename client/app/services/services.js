angular.module('myApp.services', [])

.factory('AjaxService', ['$http', function($http){
  var obj = {};

  var serverUrl = 'http://127.0.0.1:3000';

  //invoking this method will perform a POST ajax and return a promise
  obj.postSignupData = function(data, param){
    return $http({
      method: 'POST',
      url: '/signup/' + param,
      data: JSON.stringify(data)
    })
    .then(function (resp) {
      return resp.data;
    });
  };

  obj.postLoginData = function(data) {
    return $http({
      method: 'POST',
      url: '/login',
      data: JSON.stringify(data)
    })
    .then(function (resp) {
      return resp.data;
    });
  };

//getProfileData passes in user type (fbk or rst) and username and returns user data from database.
  obj.getProfileData = function(type, username) {
    return $http({
      method: 'GET',
      url: '/profile/'+ type + '/' + username
    })
    .then(function (resp) {
      return resp.data;
    });
  };

  obj.getDashboardData = function(username) {
    return $http({
      method: 'GET',
      url: '/dash/'+ username
    })
    .then(function (resp) {
      return resp.data;
    });
  };

  obj.updateProfileData = function(data, type, username) {
    return $http({
      method: 'POST',
      url: 'profile/' + type + '/' + username,
      data: JSON.stringify(data)
    })
  };

  obj.getConnectionsData = function(type, username) {
    return $http({
      method: 'GET',
      url: 'profile/' + type + '/' + username + '/connections'
    })
  };

  obj.postNewConnection = function(fbkUsername, rstUsername) {
    return $http({
      method: 'POST',
      url: 'dash/' + username + '/connections',
      data: JSON.stringify(data)
    })
  }

  return obj;

}])

//will need to update and understand this --> currently copied from shortly.js

.factory('AuthService',['$http', '$location', '$window', function ($http, $location, $window) {
  // Don't touch this Auth service!!!
  // it is responsible for authenticating our user
  // by exchanging the user's username and password
  // for a JWT from the server
  // that JWT is then stored in localStorage as 'com.shortly'
  // after you signin/signup open devtools, click resources,
  // then localStorage and you'll see your token from the server
  var signin = function (user) {
    return $http({
      method: 'POST',
      url: '/api/users/signin',
      data: user
    })
    .then(function (resp) {
      return resp.data.token;
    });
  };

  var signup = function (user) {
    return $http({
      method: 'POST',
      url: '/api/users/signup',
      data: user
    })
    .then(function (resp) {
      return resp.data.token;
    });
  };

  var isAuth = function () {
    return !!$window.localStorage.getItem('com.shortly');
  };

  var signout = function () {
    $window.localStorage.removeItem('com.shortly');
    $location.path('/signin');
  };


  return {
    signin: signin,
    signup: signup,
    isAuth: isAuth,
    signout: signout
  };
}]);
