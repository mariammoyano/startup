// REMOVE IMPORT LINE BEFORE BUNDLING
import {EventEmitter} from "./classEventEmitter.js"
// ------------------------------------------------

export class Movie extends EventEmitter{
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