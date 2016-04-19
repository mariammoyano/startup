class Coord {
	constructor(x = 0, y = 0){
		this.x = x;
		this.y = y;
	}

	add(otherCoord){
		this.x += otherCoord.x;
		this.y += otherCoord.y;
	}
}

class Poly {
	constructor(...coords){
		this.points = [];
		for (let coord of coords) {
			this.points.push(coord);
		}
	}
}

class animatableRectangle {
	constructor(width = 0, height = 0, position = new Coord()){
		this.width = width;
		this.height = height;
		this.position = position;
		this.course = new Coord();
		this.speed = 100;
		this.dirX = 1;
		this.dirY = 1;
	}

	updatePosition(canvas, delta){

		if (this.position.x < 0) {
			this.dirX = Math.abs(this.dirX);
		} else if (this.position.x + this.width >= canvas.width) {
			this.dirX = -(Math.abs(this.dirX));
		}

		if (this.position.y < 0) {
			this.dirY = Math.abs(this.dirY);
		} else if (this.position.y + this.height >= canvas.height) {
			this.dirY = -(Math.abs(this.dirY));
		}

		this.course.x = this.dirX * delta * this.speed;
		this.course.y = this.dirY * delta * this.speed;

		this.position.add(this.course);
	}

	draw(context){
		context.fillRect(this.position.x, this.position.y, this.width, this.height);
	}
}

let polygonCanvas, polygonContext;
let animationCanvas, animationContext;

// Polygon Related Variables
// *********************************
let polygon, offset = new Coord(), scale = 1;
let triangle = new Poly(new Coord(50,0), new Coord(100,100), new Coord(0,100));
let rhombus = new Poly(new Coord(50,0), new Coord(100,25), new Coord(50,100), new Coord(0,25));
let square = new Poly(new Coord(0,0), new Coord(100,0), new Coord(100,100), new Coord(0,100));
let rectangle = new Poly(new Coord(0,0), new Coord(100,0), new Coord(100,50), new Coord(0,50));
let pentagon = new Poly(new Coord(50,0), new Coord(100,38), new Coord(81,100), new Coord(19,100), new Coord(0,38));
let hexagon = new Poly(new Coord(50,0), new Coord(100,25), new Coord(100,75), new Coord(50,100), new Coord(0,75), new Coord(0,25));

let polys = [triangle, rhombus, square, rectangle, pentagon, hexagon];
let colors = ['#897BE5','#B8AEF9','#A093F1','#7465D2','#6052B7','#FF9377','#FFB9A6','#FFA48C','#FF8767','#FF7F5D','#6CE7A1','#A3FAC9','#85F2B4','#56D58E','#45BC79','#FFE377','#FFEDA6','#FFE78C','#FFDF67','#FFDD5D'];
// ***************************************

// Animation Related Variables
// ***************************************
let aniRect = new animatableRectangle(50, 25);
let paused = true;
// ***************************************


function randomElement(array){
	return array[Math.floor((Math.random() * array.length))];
}

function randomize(){
	polygonContext.strokeStyle = randomElement(colors);
	polygonContext.fillStyle = randomElement(colors);
	if(Math.floor((Math.random() * (polys.length + 1))) >= polys.length){
		polygon = 'circle';
	} else {
		polygon = randomElement(polys);
	}
	offset.x = Math.floor((Math.random() * polygonCanvas.width));
	offset.y = Math.floor((Math.random() * polygonCanvas.height));
	scale = Math.floor((Math.random() * 100 + 1)) / 100;
}

function offsetPoint(point, offset){
	point.x += offset.x;
	point.y += offset.y;
}

function scalePoint(point, scale){
	point.x *= scale;
	point.y *= scale;	
}

function drawPoly(poly, offset = 0, scale){
	polygonContext.beginPath();
	if(poly != 'circle'){
		let points = [];
		if (offset !== {x:0, y:0} || scale != 1) {
			for(let point of poly.points){
				let auxPoint = new Coord(point.x, point.y);
				if (scale != 1) { scalePoint(auxPoint, scale); }
				if (offset !== {x:0, y:0}) { offsetPoint(auxPoint, offset); }
				points.push(auxPoint);
			}
		} else {
			points = poly.points;
		}

		polygonContext.moveTo(points[0].x, points[0].y);
		for (let i = 1; i < points.length; i++) {
			let point = points[i];
			polygonContext.lineTo(point.x, point.y);
		}		
	} else {
		polygonContext.arc(offset.x, offset.y, 50 * scale, 0, Math.PI * 2, false);
	}
	polygonContext.closePath();
	polygonContext.stroke();
	polygonContext.fill();
}

function drawRandomPoly(){
	randomize();
	drawPoly(polygon, offset, scale);
}

function drawPolygons(){
	polygonContext.clearRect(0, 0, polygonCanvas.width, polygonCanvas.height);
	for (var i = 0; i < 50; i++) {
		drawRandomPoly();
	}
}

function animateRectangle(startTime){
	let time = (new Date()).getTime();
	let delta = (time - startTime) / 1000;

	animationContext.fillStyle = '#FF1DA3';
	animationContext.clearRect(0, 0, animationCanvas.width, animationCanvas.height);
	aniRect.updatePosition(animationCanvas, delta);
	aniRect.draw(animationContext);

	if (!paused) {
		requestAnimationFrame(function() {
	      animateRectangle(time);
	    });				
	}
}

function initCanvases(){
	polygonCanvas = initCanvas('polygonCanvas');
	polygonContext = polygonCanvas.getContext("2d");

	animationCanvas = initCanvas('animationCanvas');
	animationContext = animationCanvas.getContext("2d");

	initAnimFrame();
}

function initCanvas(id){
	return document.getElementById(id);
}

function initAnimFrame(){
	window.requestAnimationFrame = (function(callback) {
	    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
	    function(callback) {
	      window.setTimeout(callback, 1000 / 60);
	    };
  	})();
}

function startAnimation(){
	paused = false;
	animateRectangle(new Date().getTime());
}

function stopAnimation(){
	paused = true;
}

function toggleAnimation() {
	if (paused) { 
		startAnimation();
	} else {
		paused = true;
	}
}
