"use strict";

var _classes = require("./bundle/classes.js");

// Movies
// *******************************************************
var matrix = new _classes.Movie("The Matrix", 1999, '2h 30m');
var crystal = new _classes.Movie("The Dark Crystal", 1982, '1h 30m');
var guardians = new _classes.Movie("Guardians of the Galaxy", 2014, '2h 2m');
// Actors
// *******************************************************
var reeves = new _classes.Actor("Keanu Reeves", new Date(1964, 8, 2));
var moss = new _classes.Actor("Carrie-Ann Moss", new Date(1967, 7, 21));
var fishburne = new _classes.Actor("Laurence Fishburne", new Date(1961, 6, 30));
var weaving = new _classes.Actor("Hugo Weaving", new Date(1960, 3, 4));

var henson = new _classes.Actor("Jim Henson", new Date(1936, 8, 24), new Date(1990, 4, 16));
var mullen = new _classes.Actor("Kathryn Mullen", new Date(1940, 1, 10));
var oz = new _classes.Actor("Frank Oz", new Date(1944, 4, 25));
var goelz = new _classes.Actor("Dave Goelz", new Date(1946, 6, 16));

var pratt = new _classes.Actor("Chris Pratt", new Date(1979, 5, 21));
var saldana = new _classes.Actor("Zoe Saldana", new Date(1978, 5, 19));
var bautista = new _classes.Actor("Dave Bautista", new Date(1969, 0, 18));
var diesel = new _classes.Actor("Vin Diesel", new Date(1967, 6, 18));
var cooper = new _classes.Actor("Bradley Cooper", new Date(1975, 0, 5));

// Adding Cast to movies
// *******************************************************
matrix.addCast([reeves, moss, fishburne, weaving]);
crystal.addCast([henson, mullen, oz, goelz]);
guardians.addCast([pratt, saldana, bautista, diesel, cooper]);

// Adding Logger to movies
// *******************************************************
var logger = new _classes.Logger();
matrix.on('play', function (v) {
  return logger.log('play', matrix);
});
crystal.on('play', logger.log);
guardians.on('play', function (v) {
  return logger.log('play', guardians);
});

// Adding Social behavior to Movie class
// *******************************************************
Object.assign(_classes.Movie.prototype, _classes.Social);

matrix.play();
matrix.pause();
matrix.resume();
matrix.like("Sam Samson");
matrix.share("John Johnson");

crystal.play();
crystal.pause();
crystal.resume();
crystal.like("Sam Samson");
crystal.share("John Johnson");

guardians.play();
guardians.pause();
guardians.resume();
guardians.like("Sam Samson");
guardians.share("John Johnson");
