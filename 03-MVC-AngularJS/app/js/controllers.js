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

  this.persistNewMovie = function(movie) {
    $rootScope.movies.push(movie);
    this.save();
    $scope.showForm = false;
  }

  this.saveMovieChanges = function(){
    this.save();
    $scope.showForm = false;
  }

  this.editMovie = function(index) {
    $scope.formMode = "edit";
    $scope.showForm = true;
    $scope.formMovie = $rootScope.movies[index];
  }

  this.removeMovie = function(index){
    $rootScope.movies.splice(index, 1);
    this.save();
  }

  this.newMovie = function(){
    $scope.formMode = "new";
    $scope.showForm = true;
    $scope.formMovie = MovieFactory.emptyMovie();
  }

  if($rootScope.movies === undefined) {
    let self = this;
    let lhpromise = LStorage.getData();
    lhpromise.then(function(succesdata){
      console.log("Data retrieved from localhost");
      $rootScope.movies  = MovieFactory.moviesFromArray(succesdata);
    },
    function(errorMsg){
      console.log(errorMsg);
      console.log("Populating movie array programatically");
      self.populate();
      self.save();
    });
  	// let data = LStorage.getData();
  	// data == null ? (this.populate(), this.save()) : $rootScope.movies  = MovieFactory.moviesFromArray(data);
  }
  
}]);

movieAppControllers.controller('MovieDetailCtrl', ['$scope', '$rootScope', '$routeParams', 'LStorage', 'MovieFactory', function($scope, $rootScope, $routeParams, LStorage, MovieFactory) {
	$scope.movie = $rootScope.movies[$routeParams.movieIndex];
}]);