const PI = Math.PI;
const canvas = document.querySelector('#mainCanvas');
const ctx = canvas.getContext("2d");

var resolution = {x: 1920, y: 1080};

function clear(){
	ctx.fillStyle = "#FFFFFF";
	ctx.fillRect(0, 0, resolution.x, resolution.y);
}

function resizeCanvas() {
	canvas.width = resolution.x = window.innerWidth;
	canvas.height = resolution.y =  window.innerHeight;
}

window.addEventListener('resize', function(){
	resizeCanvas();
});

// Bubbles
const growSpeed = 50;
const lineWidth = 0.5;
const spawnRate = 5;	// [ms]
const circleLimit = 100;

function distance(p, q){
	let a = p.x - q.x;
	let b = p.y - q.y;
	return Math.sqrt( a*a + b*b );
}

var Circle = {
	id: 0,
	x: 0,
	y: 0,
	radius: 0,
	growing: true,
	isValid(){
		let valid = true;

		CIRLES.forEach((c) => {
			if( this.id != c.id
				&& (this.radius + c.radius) >= distance(this, c)
			){
				valid = false;
			}
		});

		return valid;
	},
	update: function(deltTime){
		if(this.growing){
			this.radius += growSpeed * deltTime;

			// Stop growing after touching screen borders
			if(
				this.x - this.radius <= 0
				|| this.x + this.radius >= resolution.x
				|| this.y - this.radius <= 0
				|| this.y + this.radius >= resolution.y
			){
				this.growing = false;
			}

			// Stop frowing after touching other Circle
			CIRLES.forEach((c) => {
				if( this.id != c.id
					&& (this.radius + c.radius) >= distance(this, c)
				){
					this.growing = false;
				}
			});
		}
	},
	render: function(){
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.radius, 0, 2*PI);
		ctx.lineWidth = lineWidth;
		ctx.stroke();
	}
};

var CIRLES = [];
var circlesAutoi = 0;
var lastCircleSpawnTime = 0;

function getCircle(){
	let c = Object.create(Circle);
	c.x = Math.random() * resolution.x;
	c.y = Math.random() * resolution.y;

	c.radius = Math.random() * 50;
	return c;
}

function setup(){
	//
}

function update(deltaTime){
	let deltaFromLastSpawn = performance.now() - lastCircleSpawnTime;

	if(CIRLES.length < circleLimit){
		if(deltaFromLastSpawn >= spawnRate){
			let c = getCircle();
			c.id = ++circlesAutoi;

			if(c.isValid()){
				CIRLES.push(c);
				lastCircleSpawnTime = performance.now();
			}
		}
	}

	CIRLES.forEach((c) => {
		c.update(deltaTime);
	});
}

function render(){
	clear();
	CIRLES.forEach((c) => {
		c.render();
	});

}

const requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || window.mozRequestAnimationFrame;

var then = performance.now();
var mainLoop = function () {
	var now = performance.now();
	var delta = now - then;
	update(delta / 1000);
	render();
	then = now;
	requestAnimationFrame(mainLoop);	
}

document.addEventListener('DOMContentLoaded', function(){
    resizeCanvas();
    clear();
    setup();
    mainLoop();
});
