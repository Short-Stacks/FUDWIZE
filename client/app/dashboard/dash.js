angular.module('myApp.dashboard', [])

.controller('DashboardCtrl', ['$routeParams', 'AjaxService', function($routeParams, AjaxService) {
  var vm = this;
  vm.username = $routeParams.username;

  AjaxService.getDashboardData(vm.username)
    .then(function(data){
      //dashboard for foodbank so far
      vm.data = data;
      console.log(vm.data);
      // { rst: [{},{},{},{}],
 // fbk: {name: }
    });
}]);

(function(){
  angular.module('myApp.dashboard').directive('scrolling', scrolling);

  function scrolling(){
    return{
      scope:{
        shouldScroll: '=scrolling',
        direction: '@direction'
      },
      link: function(scope, element, attrs)
    }
  }
})