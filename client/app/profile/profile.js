angular.module('myApp.profile', [])

  .controller('ProfileCtrl', ['$routeParams', 'AjaxService', function($routeParams, AjaxService) {
    var vm = this;
    vm.type = $routeParams.type;
    vm.username = $routeParams.username;
    vm.connections;

    AjaxService.getProfileData(vm.type, vm.username)
      .then(function(data){
        console.log(data);
        vm.data = data;
      })
      .then(function() {
        if (vm.type == 'fbk') {
          //make AJAX request for username's in foodbank's connections array
          AjaxService.getConnectionsData(vm.type, vm.username)
              .then(function(data) {
                vm.connections = data.data;
              })
          }; 
        });

    vm.updateProfile = function() {
      console.log(vm.data);
      AjaxService.updateProfileData(vm.data, vm.type, vm.username)
        .then(function() {
          // $route.reload();
        });
    };


}]);
