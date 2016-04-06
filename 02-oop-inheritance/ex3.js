class Movie {
	constructor (name, year, duration){
		this.name = name;
		this.year = year;
		this.duration = duration;
	}

	play(){
		console.log(`Now playing "${this.name}"`);
	}

	pause(){
		console.log(`"${this.name}" is now paused`);
	}

	resume(){
		console.log(`"${this.name}" has resumed playing`);	
	}

}

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
