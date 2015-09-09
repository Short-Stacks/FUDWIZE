angular.module('myApp.dashboard', [])

.controller('DashboardCtrl', ['$routeParams', 'AjaxService', function($routeParams, AjaxService) {
  var vm = this;
  vm.username = $routeParams.username;
  AjaxService.getDashboardData(vm.username)
    .then(function(data){
      vm.data = data[0];
      console.log('dashboard data', vm.data);
    });
}]);
