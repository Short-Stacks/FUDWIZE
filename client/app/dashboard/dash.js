angular.module('myApp.dashboard', [])

.controller('DashboardCtrl', ['$routeParams', 'AjaxService', function($routeParams, AjaxService) {
  var vm = this;
  vm.username = $routeParams.username;

  AjaxService.getDashboardData(vm.username)
    .then(function(data) {
      console.log('data', data);
      vm.rst = data.rst;
      console.log('vm.rst', vm.rst);
      // on each vm.rst object element, it contains foodData object
      // under foodData, it contains all foodType, mealType..etc, for example:
      // foodData: { foodType:{canned Goods: true, bakedGoods: false..etc}}
      // if I only used ng-repeat to print out all the info on the html, if will cause some 
      // issues for the filter 
      // therefore, I declare the property under foodData directly under the vm.rst object
      for( var i = 0; i < vm.rst.length; i++ ) {
        console.log('i', vm.rst[i]);
        var foodType = objectForloop(vm.rst[i].foodData.foodType);
        var mealType = objectForloop(vm.rst[i].foodData.mealType);
        var pickupTime = objectForloop(vm.rst[i].foodData.pickupTime);
        var pickupDay = objectForloop(vm.rst[i].foodData.pickupDay);

        vm.rst[i].foodType = foodType;
        vm.rst[i].mealType = mealType;
        vm.rst[i].pickupTime = pickupTime;
        vm.rst[i].pickupDay = pickupDay;
      }
    });
  var objectForloop = function(obj) {
    var array = [];
    for( var key in obj ) {
      if( obj[key] ){
        array.push(key);
        array.push(", ");
      }
    }
    array.pop();
    return array.join("");
  }
}])
