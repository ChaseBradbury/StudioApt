var grid = [];
var gridLength = 24;
var gridHeight = 20;
var cellSize = 32;

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
	this.hasFurniture = false;
	this.currFurniture;

	this.draw = function() {
		ctx.strokeStyle="#000000";
		ctx.strokeRect(this.x, this.y, this.size, this.size);
		
		if(this.usable) ctx.fillStyle="#ffffff";
		else ctx.fillStyle="#000000";
		ctx.fillRect(this.x, this.y, this.size, this.size);
	}

	this.putFurnitureOnCell = function (hasFurniture, furniture) {
		this.hasFurniture = hasFurniture;
		this.currFurniture = furniture;
	}
}

function printGrid() {
	var gridSerialize = "[";
	for (var i = 0; i < gridLength; ++i) {
		gridSerialize += gridSerialize = "[";
		for (var j = 0; j < gridHeight; ++j) {
			gridSerialize += grid[i][j].usable;
			if(j < gridHeight-1) {
				gridSerialize += ",";
			} else {
				gridSerialize += "]";
			}
		}
		if(i < gridLength -1){
			gridSerialize += ",\n";
		}
	}
	gridSerialize += "];";

	console.log("serialized: " + gridSerialize);
	gridSerialize = "";
}

function SetGrid(level) {
	for (var i = 0; i < gridLength; ++i) {
		grid[i] = [];
		for (var j = 0; j < gridHeight; ++j) {
			grid[i][j] = new cell(i, j, level[i][j]);
		}
	}
}