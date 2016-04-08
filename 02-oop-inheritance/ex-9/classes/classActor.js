export class Actor {
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