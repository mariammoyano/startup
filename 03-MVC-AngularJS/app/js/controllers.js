'use strict';

/* Controllers */

var movieAppControllers = angular.module('movieAppControllers', ['movieAppServices']);

movieAppControllers.controller('MovieListCtrl', ['$scope', '$rootScope', 'LStorage', 'MovieFactory', function($scope, $rootScope, LStorage, MovieFactory) {
  
  this.populate = function() {
    $rootScope.movies = MovieFactory.populate();
  }

  this.save = function() {
  	return LStorage.setData($rootScope.movies);
  }

  if($rootScope.movies === undefined) {
  	let data = LStorage.getData();
  	data == null ? (this.populate(), this.save()) : $rootScope.movies  = MovieFactory.moviesFromArray(data);
  }
  
}]);

movieAppControllers.controller('MovieDetailCtrl', ['$scope', '$rootScope', '$routeParams', 'LStorage', 'MovieFactory', function($scope, $rootScope, $routeParams, LStorage, MovieFactory) {
	$scope.movie = $rootScope.movies[$routeParams.movieIndex];
}]);