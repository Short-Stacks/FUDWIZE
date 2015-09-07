angular.module('myRst', []) 

.factory('RstService', ['$http', function($http){
  var obj = {};

  //getRstData passes in userId param and returns the userdata from database
  obj.getRstData = function(param){
    return $http({
      method: 'GET',
      url: SERVER + '/rst/',
      params: {userId: param} //potential bug- is it userId or username??? 
    });
  }

  return obj;

}])

.controller('rstCtrl',['$scope', 'RstService', function ($scope, RstService) {

  var userId = $routeParams.type;

  var $scope.rstInfo = {};

  function getRstData(userId){
    RstService.getRstData(userId).success(function(data){
      $scope.rstInfo = data; //expect data to be {username: 1, restaurantname: 'in n out'}
    })
  }

  getRstData();

}]);

