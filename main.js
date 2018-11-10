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

var Circle = {
	x: 0,
	y: 0,
	radius: 0,
	growing: true,
	update: function(deltTime){
		this.radius += 1 * deltTime;
	},
	render: function(){
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.radius, 0, 2*PI);
		ctx.lineWidth = 1;
		ctx.stroke();
	}
};

var CIRLES = [];

function setup(){
	for(let i=0; i<100; i++){
		let c = Object.create(Circle);
		c.x = Math.random() * resolution.x;
		c.y = Math.random() * resolution.y;

		c.radius = Math.random() * 50;

		CIRLES.push(c);
	}
}

function update(deltaTime){

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
