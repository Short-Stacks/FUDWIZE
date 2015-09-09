angular.module('myApp.dashboard', [])

.controller('DashboardCtrl', ['$scope', 'AjaxService', '$routeParams', function($scope, AjaxService, $routeParams) {
  var vm = this;
  var userId = $routeParams.type;
  $scope.dashInfo = {};

  function getDashData(userId){
    return AjaxService.getDashData(userId).success(function(data){
      $scope.dashInfo = data.rst; 
      //data.rst is an array-object
      // data.rst[0].contactInfo ... blah blah
    });
  }
  getDashData(userId);
}])
