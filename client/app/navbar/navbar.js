angular.module("myApp").directive("navBar", ['$window', '$location', function($window, $location){
  return {
    restrict: 'E',
    templateUrl: 'app/navbar/navbar.html',
    link: function(scope, elem, attrs){
      scope.logout = function(){
        $window.localStorage.removeItem('com.fudWize');
        $location.path('/');
      };
    }
  };

}]);
