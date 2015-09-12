angular.module('myApp.dashboard', [])

.controller('DashboardCtrl', ['$routeParams', 'AjaxService', function($routeParams, AjaxService) {
  var vm = this;
  vm.username = $routeParams.username;

  AjaxService.getDashboardData(vm.username)
    .then(function(data){
      console.log('dashboard data', data);
    });
}]);
