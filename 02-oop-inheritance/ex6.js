
class EventEmitter {
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
			console.log(`Calling '${event}' listenters`);
		try{
			for(let value of this.listeners.get(event)){
				value();
			}
		} catch (ex){
			console.log(`EXCEPTION thrown by 'emit()'. (${ex}).`);
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

let matrix = new Movie("The Matrix",1999,'2h 30m');6
Object.assign(matrix, Social);
matrix.share("John Johnson");
matrix.like("John Johnson");
