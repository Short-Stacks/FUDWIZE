angular.module('myApp.profile', [])

  .controller('ProfileCtrl', ['$routeParams', function($routeParams) {
    var vm = this;
    vm.type = $routeParams.type;
    vm.username = $routeParams.username;

}]);
