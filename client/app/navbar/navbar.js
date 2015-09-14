angular.module("myApp").directive("navBar", ['$window', '$location', '$routeParams', function($window, $location, $routeParams){
  return {
    restrict: 'E',
    templateUrl: 'app/navbar/navbar.html',
    link: function(scope, elem, attrs){
      console.log($location.$$path);
      scope.logout = function(){
        $window.localStorage.removeItem('com.fudWize');
        $location.path('/');
      };

      scope.isFoodbank = function(){
        if($routeParams.type === 'fbk'){
          return true;
        }
        return false;
      };

      scope.login = function(){
        $location.path('/login');
      };

      scope.goToDashboard = function(){
        $location.path('/dash/' + $routeParams.username );
      };

      scope.goToProfile = function(){
        $location.path('/profile/' + $routeParams.type + '/' + $routeParams.username);
      };

      scope.atProfileView = function(){
        var path = $location.$$path.slice(1);
        if(path.match(/^profile/) !== null){
          return true;
        }
        return false;
      };

      scope.atDashView = function(){
        var path = $location.$$path.slice(1);
        if(path.match(/^dash/) !== null){
          return true;
        }
        return false;
      };

      scope.atHomeView = function(){
        if($location.$$path === '/'){
          return true;
        }
        return false;
      };

      scope.goToHome = function(){
        $location.path('/');
      };

      scope.loggedIn = function(){
       return scope.atProfileView() || scope.atDashView();
      };

    }
  };

}]);
