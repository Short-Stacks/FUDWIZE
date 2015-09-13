angular.module('myApp.login', [])

.controller('LoginCtrl', ['$scope', '$window', '$location', 'AjaxService', function($scope, $window, $location, AjaxService) {
  var vm = this;

  vm.postData = {};
  vm.incorrectLogin = false;

  vm.submitLoginForm = function() {
    AjaxService.postLoginData(vm.postData)
      .success(function(data, status, headers, config){
        $window.localStorage.setItem('com.fudWize', JSON.stringify(data));
        $location.path('/profile/' + data.type + '/' + data.username);
        //if the post request is successful, evaluate this code
        //usually we bind something to our view (via vm) in this situation
      })
      .error(function(data, status, headers, config){
        if(status === 401){
          vm.incorrectLogin = true;
        }
      });
  };
}]);
