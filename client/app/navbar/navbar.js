angular.module("myApp").directive("navBar", ['$window', '$location', '$routeParams', function($window, $location, $routeParams) {
  return {
    restrict: 'E',
    templateUrl: 'app/navbar/navbar.html',
    link: function(scope, elem, attrs) {
      /*
      The below methods are used to modify the navbar routes available to a
      specific user based on their privilege and current url path
      */

      //return true if user is a 'fbk'
      scope.isFoodbank = function() {
        if ($routeParams.type === 'fbk') {
          return true;
        }
        return false;
      };

      //**"at" methods return true if the user is currently at that view
      scope.atProfileView = function() {
        var path = $location.$$path.slice(1);
        if (path.match(/^profile/) !== null) {
          return true;
        }
        return false;
      };

      scope.atDashView = function() {
        var path = $location.$$path.slice(1);
        if (path.match(/^dash/) !== null) {
          return true;
        }
        return false;
      };

      scope.atHomeView = function() {
        if ($location.$$path === '/') {
          return true;
        }
        return false;
      };

      //**"goTo" methods are ran on button click, directing us to a different path
      scope.goToLogin = function() {
        $location.path('/login');
      };

      scope.goToLogout = function() {
        $window.localStorage.removeItem('com.fudWize');
        $location.path('/');
      };

      scope.goToDashboard = function() {
        $location.path('/dash/' + $routeParams.username);
      };

      scope.goToProfile = function() {
        $location.path('/profile/' + $routeParams.type + '/' + $routeParams.username);
      };


      scope.goToHome = function() {
        $location.path('/');
      };

      //returns true if user is logged in to either profile or dash view
      scope.loggedIn = function() {
        return scope.atProfileView() || scope.atDashView();
      };

    }
  };
}]);
