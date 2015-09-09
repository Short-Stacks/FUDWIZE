angular.module('myApp.profile', [])

  .controller('ProfileCtrl', ['$routeParams', 'AjaxService', function($routeParams, AjaxService) {
    var vm = this;
    vm.type = $routeParams.type;
    vm.username = $routeParams.username;

    AjaxService.getProfileData(vm.type, vm.username)
      .then(function(data){
        console.log(data);
      });



}]);
