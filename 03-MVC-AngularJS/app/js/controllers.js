'use strict';

/* Controllers */

var movieAppControllers = angular.module('movieAppControllers', ['movieAppServices']);

movieAppControllers.controller('MovieListCtrl', ['$scope','LStorage','DefaultMovies', function($scope, LStorage, DefaultMovies) {

  $scope.movies  = LStorage.getData();
  
  this.populate = function() {
    $scope.movies = DefaultMovies.populate();
  };

  this.save = function() {
  	return LStorage.setData($scope.movies);
  }

  if($scope.movies === [] || $scope.movies === null){
  	this.populate();
  	this.save();
  }
}]);