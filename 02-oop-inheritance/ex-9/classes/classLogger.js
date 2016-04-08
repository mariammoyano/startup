export class Logger {
	log(eventType = 'play', movie){
		let msg = `The '${eventType}' event has been emitted`;
		if (movie !== undefined)
			msg += `by "${movie.name}" movie`;
		console.log(msg);
	}
}
