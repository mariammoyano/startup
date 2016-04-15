'use strict';

describe('movieApp controllers', function() {

  describe('MovieListCtrl', function(){
    var scope, ctrl;

    beforeEach(module('movieApp'));

    beforeEach(inject(function($controller) {
      scope = {};
      ctrl = $controller('MovieListCtrl', {$scope:scope});
    }));

    it('should list at least 3 movies', function() {
      expect(scope.movies.length >= 3).toBeTruthy();
    });

    it('should be able to add a new movie', function(){
      let len = angular.copy(scope.movies.length);
      ctrl.persistNewMovie(new Movie("zxc",1998));
      expect(scope.movies.length).toEqual((len + 1));
    });

    it('should be able to remove a movie', function(){
      let len = angular.copy(scope.movies.length);
      ctrl.removeMovie(0);
      expect(scope.movies.length).toEqual((len - 1));
    });

    it('should be able to edit a movie', function(){
      let oldValue = angular.copy(scope.movies[0]);
      ctrl.editMovie(0);
      scope.formMovie.name = "zxc";
      scope.formMovie.year = 0;
      ctrl.saveMovieChanges();
      expect(scope.movies[0]).not.toEqual(oldValue);
    });

    it('should be able to add an actor to a movie', function(){
      let oldCastLen = angular.copy(scope.movies[0].cast.length);
      ctrl.addActor(new Actor("zzz", new Date()), scope.movies[0]);
      expect(scope.movies[0].cast.length).toEqual(oldCastLen + 1);
    });

    it('should be able to remove an actor from a movie', function(){
      ctrl.addActor(new Actor("zzz", new Date()), scope.movies[0]);
      let oldCastLen = angular.copy(scope.movies[0].cast.length);
      ctrl.removeActor(0, scope.movies[0]);
      expect(scope.movies[0].cast.length).toEqual(oldCastLen - 1);
    });
  });

  describe('MovieDetailCtrl', function(){
    var scope, ctrl;

    beforeEach(module('movieApp'));

    beforeEach(inject(function($controller, $rootScope, $routeParams) {
      scope = {};
      $routeParams.movieIndex = 0;
      $rootScope.movies = [new Movie("zxc",1999)];
      ctrl = $controller('MovieDetailCtrl', {$scope:scope});
    }));

    it('should contain the details of a movie', function() {
      expect(scope.movie).toBeDefined();
      expect(scope.movie.name).toEqual("zxc");
      expect(scope.movie.year).toEqual(1999);
      expect(scope.movie.cast).toEqual([]);
    });

  });
});