angular.module('myApp.profile', [])

  .controller('ProfileCtrl', ['$routeParams', 'AjaxService', function($routeParams, AjaxService) {
    var vm = this;
    vm.type = $routeParams.type;
    vm.username = $routeParams.username;

    vm.updated = null;

    AjaxService.getProfileData(vm.type, vm.username)
      .then(function(data){
        console.log(data);
        vm.data = data;
      });

    vm.updateProfile = function() {
      console.log(vm.data);
      AjaxService.updateProfileData(vm.data, vm.type, vm.username)
        .then(function() {
          vm.updated = 'updated';
          // $route.reload();
        });
    };


}]);
