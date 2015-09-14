angular.module('myApp.services', [])

.factory('AjaxService', ['$http', function($http){
  
  //creating an object and attaching methods to it makes it easier to export (by returning object)
  var obj = {};

  var serverUrl = 'http://127.0.0.1:3000';

  //invoking this method will perform a POST ajax and return a promise
  obj.postSignupData = function(data, param){
    return $http({
      method: 'POST',
      url: '/signup/' + param,
      data: JSON.stringify(data)
    });
  };

  //post username/password to server to login
  obj.postLoginData = function(data) {
    return $http({
      method: 'POST',
      url: '/login',
      data: JSON.stringify(data)
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
      console.log('resp', resp);
      return resp.data;
    });
  };

  //will send post request with user's updated profile data (changed via checkboxes and edited fields)
  obj.updateProfileData = function(data, type, username) {
    return $http({
      method: 'POST',
      url: 'profile/' + type + '/' + username,
      data: JSON.stringify(data)
    });
  };

  //retrieves fbk's connections to be displayed on profile page
  obj.getConnectionsData = function(type, username) {
    return $http({
      method: 'GET',
      url: 'profile/' + type + '/' + username + '/connections'
    });
  };

  //creates new connection via the fbk's dashboard
  obj.postNewConnection = function(fbkUsername, postData) {
    return $http({
      method: 'POST',
      url: 'dash/' + fbkUsername + '/connections',
      data: JSON.stringify(postData)
    });
  };

  return obj;

}]);
