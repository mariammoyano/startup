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
    $scope.movies.push(movie);
    this.save();
    $scope.showForm = false;
  }

  this.saveMovieChanges = function(){
    $scope.movies[$scope.editIndex] = angular.copy($scope.formMovie);;
    this.save();
    $scope.showForm = false;
  }

  this.editMovie = function(index) {
    $scope.formMode = "edit";
    $scope.showForm = true;
    $scope.editIndex = index;
    $scope.formMovie = angular.copy($scope.movies[index]);
  }

  this.cancelEdit = function(){
    $scope.showForm = false;
  }

  this.removeMovie = function(index){
    $scope.movies.splice(index, 1);
    this.save();
  }

  this.newMovie = function(){
    $scope.formMode = "new";
    $scope.showForm = true;
    $scope.formMovie = MovieFactory.emptyMovie();
  }

  this.newActor = function(){
    $scope.showActor = true;
    $scope.formActor = new Actor();
  }

  this.addActor = function(actor, movie){
    movie.addCast(actor);
    $scope.showActor = false;
  }

  this.removeActor = function(index, movie) {
    movie.cast.splice(index,1);
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
    $scope.movies = $rootScope.movies;
  }
  
}]);

movieAppControllers.controller('MovieDetailCtrl', ['$scope', '$rootScope', '$routeParams', 'LStorage', 'MovieFactory', function($scope, $rootScope, $routeParams, LStorage, MovieFactory) {
	$scope.movie = $rootScope.movies[$routeParams.movieIndex];
}]);