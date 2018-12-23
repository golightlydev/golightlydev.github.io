var resize = false;
var setup = false;
var imgStart = [0];
var canvas = undefined;
var context = undefined;
var img = undefined;
window.setInterval(program, 1000);

function program() {
	if(setup) {
		if(resize) {
			canvas.setAttribute('width', window.innerWidth);
			canvas.setAttribute('height', window.innerHeight);
			resize = false;
		}
		context.fillStyle = 'white';
		context.fillRect(0, 0, canvas.width, canvas.height);
		imgStart[0] += 10;
		context.drawImage(img[0], imgStart, 0);
		context.drawImage(img[1], 20, 20);
	}
}

function createContext() {
	context = canvas.getContext('2d');
	setup = true;
}

function createCanvas() {
	canvas = document.createElement('canvas');
	canvas.id = 'canvas';
	canvas.setAttribute('id', 'canvas');
	canvas.setAttribute('width', window.innerWidth);
	canvas.setAttribute('height', window.innerHeight);
	var parentElement = document.getElementById('body');
	parentElement.appendChild(canvas);
	if(canvas.getContext) {
		createContext();
	}
}

function removeElement(childID, parentID) {
	var childElement = document.getElementById(childID);
	var parentElement = document.getElementById(parentID);
	parentElement.removeChild(childElement);
}

function imageLoad(index, imagePath) {
	if(index != 0) {
		img.push(new Image());
	}
	img[index].onload = function() {
		if(index < (imagePath.length - 1)) {
			++index;
			imageLoad(index, imagePath);
		}
		else {
			createCanvas();
		}
	}
	img[index].src = imagePath[index];
}

function buttonFunction() {
	removeElement('button1', 'body');
	var imagePath = ['img.png', 'img2.png'];
	img = [new Image()];
	imageLoad(0, imagePath);
}

function resizeFunction() {
	resize = true;
}