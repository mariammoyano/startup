'use strict';

class Actor {
	constructor(name, dateOfBirth, dateOfDeath) {
		this.name = name;
		this.dateOfBirth = dateOfBirth;
		if (dateOfDeath !== undefined) {
			this.dateOfDeath = dateOfDeath;
			this.age = calcAge(this.dateOfBirth, this.dateOfDeath);;
		}
	}
	get age() {
		if (this._age == undefined) {
			return calcAge(this.dateOfBirth);
		} else {
			return this._age;
		}
	}
	set age(newAge) {
		this._age = newAge;
	}
}

function calcAge(dob, dod = Date.now()) {
	let diff = new Date(dod - dob);
	return Math.abs(diff.getUTCFullYear() - 1970);
}
class EventEmitter {
	constructor() {
		this.listeners = new Map();
	}

	on(event, callback) {
		if (!this.listeners.has(event)) {
			this.listeners.set(event, []);
		}
		this.listeners.get(event).push(callback);
		console.log(`"${ event }" listener added`);
	}

	emit(event) {
		if (this.listeners.has(event)) {
			console.log(`Calling '${ event }' listenters`);
			try {
				for (let value of this.listeners.get(event)) {
					value();
				}
			} catch (ex) {
				console.log(`EXCEPTION thrown by 'emit()'. (${ ex }).`);
			}
		}
	}

	off(event) {
		this.listeners.delete(event);
		console.log(`'${ event }' listener(s) removed`);
	}
}
class Logger {
	log(eventType = 'play', movie) {
		let msg = `The '${ eventType }' event has been emitted`;
		if (movie !== undefined) msg += `by "${ movie.name }" movie`;
		console.log(msg);
	}
}

class Movie extends EventEmitter {
	constructor(name, year, duration, description = "") {
		super();
		this.name = name;
		this.year = year;
		this.duration = duration;
		this.description = description;
		this.cast = [];
	}

	play() {
		console.log(`Now playing "${ this.name }"`);
		this.emit('play');
	}

	pause() {
		console.log(`"${ this.name }" is now paused`);
		this.emit('pause');
	}

	resume() {
		console.log(`"${ this.name }" has resumed playing`);
		this.emit('resume');
	}

	addCast(actors) {
		if (Array.isArray(actors)) {
			for (let actor of actors) {
				this.cast.push(actor);
			}
		} else {
			this.cast.push(actors);
		}
	}
}
const Social = {
	share(friendName) {
		console.log(`Share ${ this.name } with ${ friendName }`);
	},
	like(friendName) {
		console.log(`${ friendName } likes ${ this.name }`);
	}
};


/* Services */

var movieAppServices = angular.module('movieAppServices', []);

movieAppServices.factory('DefaultMovies',
  function(){
    return {
	    populate: function() {		    	
			// Movies
			// *******************************************************
			let matrix = new Movie("The Matrix",1999,'2h 30m',"A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.");
			let crystal = new Movie("The Dark Crystal",1982,'1h 30m',"On another planet in the distant past, a Gelfling embarks on a quest to find the missing shard of a magical crystal, and so restore order to his world.");
			let guardians = new Movie("Guardians of the Galaxy",2014,'2h 2m',"A group of intergalactic criminals are forced to work together to stop a fanatical warrior from taking control of the universe.");
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

	      return [matrix,crystal,guardians];
	    }
	  };
  });

movieAppServices.factory("LStorage", function($window, $rootScope) {
  return {
    setData: function(val) {
      $window.localStorage && $window.localStorage.setItem('movie-storage', JSON.stringify(val));
      return this;
    },
    getData: function() {
      return $window.localStorage && JSON.parse($window.localStorage.getItem('movie-storage'));
    }
  };
});