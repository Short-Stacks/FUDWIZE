angular.module('myApp.foodbanks', [])

.controller('FoodbanksCtrl', '$scope', 'AjaxService', '$routeParams', [function ($scope, AjaxService, $routeParams) {
  var vm = this;
  var userId = $routeParams.type;
  $scope.fbkInfo = { };

  function getFbkData(userId) {
    return AjaxService.getFbkData(userId).success(function(data){
      $scope.fbkInfo = data; //expect data to be {username: 1, restaurantname: 'in n out'}
    })
  };

  getFbkData(userId);
  
}])
