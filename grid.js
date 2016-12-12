var grid = [];
var gridLength = 12;
var gridHeight = 8;
var cellSize = 64;

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