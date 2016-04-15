'use strict';

/* Controllers */

var movieApp = angular.module('movieApp', ['ngRoute','movieAppControllers']);

movieApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/movies', {
        templateUrl: 'views/movieList.html',
        controller: 'MovieListCtrl as l'
      }).
      when('/movies/:movieIndex', {
        templateUrl: 'views/movieDetails.html',
        controller: 'MovieDetailCtrl'
      }).
      otherwise({
        redirectTo: '/movies'
      });
  }]);
