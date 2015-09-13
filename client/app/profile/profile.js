angular.module('myApp.profile', [])

  .controller('ProfileCtrl', ['$routeParams', 'AjaxService', function($routeParams, AjaxService) {
    var vm = this;
    vm.type = $routeParams.type;
    vm.username = $routeParams.username;

    vm.connectionData = [];

    AjaxService.getProfileData(vm.type, vm.username)
      .then(function(data){
        console.log(data);
        vm.data = data;
      })
      .then(function() {
        if (vm.type == 'fbk') {
          //make AJAX request for each username in user's connections array
          //push each of these results in the connectionData array
          for (var i = 0; i < vm.data.connections.length; i++) {
            AjaxService.getConnectionData(connections[i])
              .then(function(data) {
                vm.connectionData.push(data);
              })
            console.log(vm.connectionData);
          }; 
        };
      })



    vm.updateProfile = function() {
      console.log(vm.data);
      AjaxService.updateProfileData(vm.data, vm.type, vm.username)
        .then(function() {
          // $route.reload();
        });
    };


}]);
