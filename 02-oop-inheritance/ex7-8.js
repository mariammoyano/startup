
export class EventEmitter {
	constructor(){
		this.listeners = new Map();
	}

	on(event, callback){
		if(!this.listeners.has(event)){
			this.listeners.set(event, []);
		}
		this.listeners.get(event).push(callback);
		console.log(`"${event}" listener added`);
	}

	emit(event){
		if(this.listeners.has(event)){
			console.log(`Calling '${event}' listenters`);
			try{
				for(let value of this.listeners.get(event)){
					value();
				}
			} catch (ex){
				console.log(`EXCEPTION thrown by 'emit()'. (${ex}).`);
			}			
		}
	}

	off(event){
		this.listeners.delete(event);
		console.log(`'${event}' listener(s) removed`);
	}
}

class Movie extends EventEmitter{
	constructor (name, year, duration){
		super();
		this.name = name;
		this.year = year;
		this.duration = duration;
		this.cast = [];
	}

	play(){
		console.log(`Now playing "${this.name}"`);
		this.emit('play');
	}

	pause(){
		console.log(`"${this.name}" is now paused`);
		this.emit('pause');
	}

	resume(){
		console.log(`"${this.name}" has resumed playing`);
		this.emit('resume');
	}

	addCast(actors){
		if(Array.isArray(actors)){
			for(let actor of actors){
				this.cast.push(actor);				
			}
		} else {
			this.cast.push(actors);
		}
	}
}

class Logger {
	log(eventType = 'play', movie){
		let msg = `The '${eventType}' event has been emitted`;
		if (movie !== undefined)
			msg += `by "${movie.name}" movie`;
		console.log(msg);
	}
}

const Social = {
	share(friendName){
		console.log(`Share ${this.name} with ${friendName}`);
	},
	like(friendName){
		console.log(`${friendName} likes ${this.name}`);
	}
}

function calcAge(dob){
	let diff = new Date(Date.now() - dob);
	return Math.abs(diff.getUTCFullYear() - 1970);
}

class Actor {
	constructor(name, dateOfBirth, dateOfDeath){
		this.name = name;
		this.dateOfBirth = dateOfBirth;		
		if(dateOfDeath !== undefined){
			this.dateOfDeath = dateOfDeath;
			this.age = calcAge(this.dateOfBirth, this.dateOfDeath);;
		}
	}
	get age() {
		if(this._age == undefined){
			return calcAge(this.dateOfBirth);
		} else {
			return this._age;
		}
	}
	set age(newAge){
		this._age = newAge;
	}
}

function calcAge(dob, dod = Date.now()){
	let diff = new Date(dod - dob);
	return Math.abs(diff.getUTCFullYear() - 1970);
}

let matrix = new Movie("The Matrix",1999,'2h 30m');
let crystal = new Movie("The Dark Crystal",1982,'1h 30m');
let logger = new Logger();

let reeves = new Actor("Keanu Reeves", new Date(1964,8,2));
let moss = new Actor("Carrie-Ann Moss", new Date(1967,7,21));
let fishburne = new Actor("Laurence Fishburne", new Date(1961,6,30));
let weaving = new Actor("Hugo Weaving", new Date(1960,3,4));

matrix.on('play', v => logger.log('play', matrix));
crystal.on('play', logger.log);
Object.assign(matrix, Social);
matrix.share("John Johnson");
matrix.like("John Johnson");

let otherCast = [moss,fishburne,weaving];
matrix.addCast(reeves);
matrix.addCast(otherCast);