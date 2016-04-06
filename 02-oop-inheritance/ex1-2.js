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

let matrix = new Movie("The Matrix",1999,'2h 30m');
let lotr = new Movie("The Lord of the Rings",2001,'3h 48m');
let pilgrim = new Movie("Scott Pilgrim vs. The World",2010,'1h 53m');
let guardians = new Movie("Guardians of the Galaxy",2014,'2h 2m');