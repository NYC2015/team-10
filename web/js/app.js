var mainApp = angular.module("mainApp", ['ngRoute']);
         
mainApp.controller("HelloController", function($scope) {
	$scope.helloTo = {};
	$scope.helloTo.title = "AngularJS";
});
/*
mainApp.config(['$routeProvider', function($routeProvider) {
   $routeProvider.
   when('/'. {
	   templateUrl: 'index.html', controller: 'homeController'
   }).
   when('/event', {
      templateUrl: 'event.html', controller: 'AddStudentController'
   }).
   when('/something', {
      templateUrl: 'something.html', controller: 'ViewStudentsController'
   }).
   otherwise({
      redirectTo: '/'
   });
	
}]);
*/