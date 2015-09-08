angular.module('myApp.restaurants', [])

.controller('RestaurantsCtrl', ['$scope','AjaxService', '$routeParams', function($scope, AjaxService, $routeParams) {
  var vm = this;
  var userId = $routeParams.type;
  $scope.rstInfo = { };
  $scope.counter = { count: 0 };

  function getRstData(userId) {
    return AjaxService.getRstData(userId).success(function(data){
      $scope.rstInfo = data; //expect data to be {username: 1, restaurantname: 'in n out'}
    })
  };  

  getRstData(userId);

}])
