var c=document.getElementById("canvas");
var ctx=c.getContext("2d");
ctx.font = "32px Georgia";

var loaded = false;
window.onload = function () {
	loaded = true;
};
var couchImage = new Image();
couchImage.src = "CouchBad.png";
var tableImage = new Image();
tableImage.src = "TableBad.png";
var chairImage = new Image();
chairImage.src = "ChairBad.png";

var allFurniture = [];
furnitureList();
for (var i = 0; i < allFurniture.length; i++){
		console.log(allFurniture[i].name);
}
var playerPoints = 0;

var movingObject = null;

c.addEventListener("mousedown", mouseDown, false);

function mouseDown(event) {
	if (movingObject != null) return;

	var x = event.x;
	var y = event.y;

	x -= c.offsetLeft;
	y -= c.offsetTop;

	for (var i = 0; i < allFurniture.length; i++){
		if (allFurniture[i].isClicked(x,y)){
			movingObject = allFurniture[i];
			return;
		} 
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
			movingObject.place(x, y);
			movingObject.clicked = false;
			movingObject = null;
		} else {
			grid[x][y].putFurnitureOnCell(false, null);
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
		case 103:
			printGrid();
			break;
	}
}

setInterval(draw, 30);

function draw() {
	if (loaded) {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		for (var i = 0; i < gridLength; ++i) {
			for (var j = 0; j < gridHeight; ++j) {
				grid[i][j].draw();
			}
		}
		for (var i = 0; i < allFurniture.length; i++){
			allFurniture[i].draw();
		}

		if (movingObject != null) {
			movingObject.draw();
		}
	}
}