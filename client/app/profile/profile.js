angular.module('myApp.profile', [
  'ui.checkbox'
  ])

.controller('ProfileCtrl', ['$routeParams', '$window', '$timeout', 'AjaxService', function($routeParams, $window, $timeout, AjaxService) {
  var vm = this;
  vm.type = $routeParams.type;
  vm.username = $routeParams.username;

  AjaxService.getProfileData(vm.type, vm.username)
  .then(function(data){
    vm.data = data;
  })
  .then(function() {
    if (vm.type == 'fbk') {
      //make AJAX request for the data of the usernames in the foodbank's connections array
      AjaxService.getConnectionsData(vm.type, vm.username)
      .then(function(data) {
        vm.connections = data.data;
      });
    }
  });

  vm.updateProfile = function() {
    AjaxService.updateProfileData(vm.data, vm.type, vm.username);

    vm.updateConfirmation = "Profile Updated!";
    $timeout(function() {
      vm.updateConfirmation = "";
    }, 2000);
  };

  //Angular does not strictly allow links to outside URL's, so a function call must be made
  //this function still doesn't work though ...
  vm.goToLink = function(url) {
    $window.location.href = url;
  };

}]);

