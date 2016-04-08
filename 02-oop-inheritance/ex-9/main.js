import  {Movie}  from "./bundle/classes.js";
import  {Logger}  from "./bundle/classes.js";
import  {Actor}  from "./bundle/classes.js";
import  {Social}  from "./bundle/classes.js";

// Movies
// *******************************************************
let matrix = new Movie("The Matrix",1999,'2h 30m');
let crystal = new Movie("The Dark Crystal",1982,'1h 30m');
let guardians = new Movie("Guardians of the Galaxy",2014,'2h 2m');
// Actors
// *******************************************************
let reeves = new Actor("Keanu Reeves", new Date(1964,8,2));
let moss = new Actor("Carrie-Ann Moss", new Date(1967,7,21));
let fishburne = new Actor("Laurence Fishburne", new Date(1961,6,30));
let weaving = new Actor("Hugo Weaving", new Date(1960,3,4));

let henson = new Actor("Jim Henson", new Date(1936,8,24), new Date(1990,4,16));
let mullen = new Actor("Kathryn Mullen", new Date(1940,1,10));
let oz = new Actor("Frank Oz", new Date(1944,4,25));
let goelz = new Actor("Dave Goelz", new Date(1946,6,16));

let pratt = new Actor("Chris Pratt", new Date(1979,5,21));
let saldana = new Actor("Zoe Saldana", new Date(1978,5,19));
let bautista = new Actor("Dave Bautista", new Date(1969,0,18));
let diesel = new Actor("Vin Diesel", new Date(1967,6,18));
let cooper = new Actor("Bradley Cooper", new Date(1975,0,5));

// Adding Cast to movies
// *******************************************************
matrix.addCast([reeves,moss,fishburne,weaving]);
crystal.addCast([henson,mullen,oz,goelz]);
guardians.addCast([pratt,saldana,bautista,diesel,cooper]);

// Adding Logger to movies
// *******************************************************
let logger = new Logger();
matrix.on('play', v => logger.log('play', matrix));
crystal.on('play', logger.log);
guardians.on('play', v => logger.log('play', guardians));

// Adding Social behavior to Movie class
// *******************************************************
Object.assign(Movie.prototype, Social);

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
