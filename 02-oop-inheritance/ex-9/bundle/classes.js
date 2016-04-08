export class Actor {
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
export class EventEmitter {
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
export class Logger {
	log(eventType = 'play', movie) {
		let msg = `The '${ eventType }' event has been emitted`;
		if (movie !== undefined) msg += `by "${ movie.name }" movie`;
		console.log(msg);
	}
}

export class Movie extends EventEmitter {
	constructor(name, year, duration) {
		super();
		this.name = name;
		this.year = year;
		this.duration = duration;
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
export const Social = {
	share(friendName) {
		console.log(`Share ${ this.name } with ${ friendName }`);
	},
	like(friendName) {
		console.log(`${ friendName } likes ${ this.name }`);
	}
};
