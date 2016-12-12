var c=document.getElementById("canvas");
var ctx=c.getContext("2d");
ctx.font = "32px Georgia";

var grid = [];
var gridLength = 12;
var gridHeight = 8;
var cellSize = 64;
var movingObject = null;
var dangerColor = "#ff0000";

for (var i = 0; i < gridLength; ++i) {
	grid[i] = [];
	for (var j = 0; j < gridHeight; ++j) {
		grid[i][j] = new cell(i, j, (i > 0 && i < gridLength-1) && (j > 0 && j < gridHeight-1));
	}
}

function cell(x, y, usable) {

	this.x = x * cellSize;
	this.y = y * cellSize;
	this.size = cellSize;
	this.usable = usable;

	this.draw = function() {
		ctx.strokeStyle="#000000";
		ctx.strokeRect(this.x, this.y, this.size, this.size);
		
		if(this.usable) ctx.fillStyle="#ffffff";
		else ctx.fillStyle="#000000";
		ctx.fillRect(this.x, this.y, this.size, this.size);
	}
}

c.addEventListener("mousedown", mouseDown, false);

function mouseDown(event) {
	if (movingObject != null) return;

	var x = event.x;
	var y = event.y;

	x -= c.offsetLeft;
	y -= c.offsetTop;

	if (couch.isClicked(x, y)) {
		movingObject = couch;
		return;
	}

	x = Math.floor(x/cellSize);
	y = Math.floor(y/cellSize);

	if (grid[x] == null || grid[x][y] == null) return;

	grid[x][y].usable = !grid[x][y].usable;
}

c.addEventListener("mouseup", mouseUp, false);

function mouseUp(event) {

	var x = event.x;
	var y = event.y;

	x -= c.offsetLeft;
	y -= c.offsetTop;

	if (movingObject != null) {
		x = Math.floor(x/cellSize);
		y = Math.floor(y/cellSize);
		if (grid[x] == null || grid[x][y] == null) {
			movingObject.clicked = false;
			movingObject = null;
			return;
		}
		movingObject.x = grid[x][y].x;
		movingObject.y = grid[x][y].y;
		if (movingObject.isSafe()) {
			movingObject.clicked = false;
			movingObject = null;
		}
	}
}

c.addEventListener("mousemove", moveMouse, false);

function moveMouse(event) {

	var x = event.x;
	var y = event.y;

	x -= c.offsetLeft;
	y -= c.offsetTop;

	if (movingObject != null) {
		movingObject.x = x - movingObject.sizeX/2;
		movingObject.y = y - movingObject.sizeY/2;
	}
}

document.addEventListener("keypress", keyPress, true);

function keyPress(event) {

	console.log(event.keyCode);
	switch(event.keyCode) {
		case 114:
			if(movingObject != null) {
				movingObject.rotate();
			}
			break;
	}
}

var couch = new roomObject(grid.length * cellSize + 10, 10, 2, 1, "#0000ff", "#ccccff");

function roomObject(x, y, length, height, color, highlightColor) {
	this.x = x;
	this.y = y;
	this.initX = x;
	this.initY = y;
	this.length = length;
	this.height = height;
	this.sizeX = cellSize*length;
	this.sizeY = cellSize*height;
	this.color = color;
	this.highlightColor = highlightColor;
	this.clicked = false;

	this.isClicked = function(x, y) {
		if (x > this.x && x < this.x + this.sizeX && y > this.y && y < this.y + this.sizeY) {
			this.clicked = !this.clicked;
			return true;
		}
	}

	this.rotate = function() {
		var tmpl = this.length;
		var tmpx = this.sizeX;
		this.length = this.height;
		this.sizeX = this.sizeY;
		this.height = tmpl;
		this.sizeY = tmpx;
	}

	this.isSafe = function() {
		var gx = Math.floor(this.x/cellSize);
		var gy = Math.floor(this.y/cellSize);
		for (var i = gx; i < this.length + gx; ++i) {
			for (var j = gy; j < this.height + gy; ++j) {
				if (grid[i] == null || grid[i][j] == null || !grid[i][j].usable) return false; 
			}
		}
		return true;
	}

	this.draw = function() {
		ctx.strokeStyle="#000000";
		ctx.strokeRect(this.x, this.y, this.sizeX, this.sizeY);
		
		if(!this.isSafe()) ctx.fillStyle=dangerColor;
		else if(this.clicked) ctx.fillStyle=this.highlightColor;
		else ctx.fillStyle=this.color;
		ctx.fillRect(this.x, this.y, this.sizeX, this.sizeY);
	}
}

setInterval(draw, 30);

function draw() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	for (var i = 0; i < gridLength; ++i) {
		for (var j = 0; j < gridHeight; ++j) {
			grid[i][j].draw();
		}
	}
	couch.draw();
}