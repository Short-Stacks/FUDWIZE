angular.module('myApp.login', [])

.controller('LoginCtrl', ['$scope', '$window', '$location', 'AjaxService', function($scope, $window, $location, AjaxService) {
  var vm = this;

  vm.postData = {};

  vm.submitLoginForm = function() {
    console.log(vm.postData);
    AjaxService.postLoginData(vm.postData)
      .then(function(data){
        console.log('login success', data);
        $window.localStorage.setItem('com.fudWize', data.token);
        $location.path('/profile/' + data.type + '/' + data.username);
        //if the post request is successful, evaluate this code
        //usually we bind something to our view (via vm) in this situation

      })
      // .error(function(data, status, headers, config){
      //   console.log('signup error', status);
        //if the post request fails, evaluate this code
      // });
  }

}]);
