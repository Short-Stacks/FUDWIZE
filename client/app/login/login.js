angular.module('myApp.login', [])

.controller('LoginCtrl', ['$scope', 'AjaxService', function($scope, AjaxService) {
  var vm = this;

  vm.postData = {};

  vm.submitLoginForm = function() {
    console.log(vm.postData);
    AjaxService.postLoginData(vm.postData)
      .success(function(data, status){
        console.log('login success', status);

        //if the post request is successful, evaluate this code
        //usually we bind something to our view (via vm) in this situation

      }).error(function(data, status, headers, config){
        console.log('signup error', status);
        //if the post request fails, evaluate this code
      });
  };

}]);
