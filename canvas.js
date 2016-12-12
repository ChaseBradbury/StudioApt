var c=document.getElementById("canvas");
var ctx=c.getContext("2d");
ctx.font = "32px Georgia";

var movingObject = null;

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

	if (chair.isClicked(x, y)) {
		movingObject = chair;
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
			movingObject.reset();
			movingObject.clicked = false;
			movingObject = null;
			return;
		}
		movingObject.x = grid[x][y].x;
		movingObject.y = grid[x][y].y;
		if (movingObject.isSafe()) {
			grid[x][y].isFurnitureOnCell(true);
			movingObject.currentGridSpace = grid[x][y];
			movingObject.clicked = false;
			movingObject = null;
		} else {
			movingObject.reset();
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
		var gx = Math.floor(x/cellSize);
		var gy = Math.floor(y/cellSize);
		if (grid[gx] != null && grid[gx][gy] != null) {
			movingObject.x = grid[gx][gy].x;
			movingObject.y = grid[gx][gy].y;
		} else {
			movingObject.x = x - movingObject.sizeX/2;
			movingObject.y = y - movingObject.sizeY/2;
		}
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

var couch = new furniture(grid.length * cellSize + 10, 10, 2, 1, "#0000ff", "#ccccff");
var chair = new furniture(grid.length * cellSize + 10, 10, 3, 1, "#0000ff", "#ccccff");

setInterval(draw, 30);

function draw() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	for (var i = 0; i < gridLength; ++i) {
		for (var j = 0; j < gridHeight; ++j) {
			grid[i][j].draw();
		}
	}
	couch.draw();
	chair.draw();
}