var dangerColor = "#ff0000";

function furniture(name, x, y, length, height, color, highlightColor) {
	this.name = name;
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
	//adding stuff here
	this.currentGridSpace = null;
	this.name;
	this.front;
	this.back;
	this.left;
	this.right;
	//this.bonusList = bonusListItems[]; // a list of bonusListItems, each of which says what side it can be on
	this.toxicList; // a list of items, each of which says what side it can be on

	this.isClicked = function(x, y) {
		if (x > this.x && x < this.x + this.sizeX && y > this.y && y < this.y + this.sizeY) {
			this.clicked = !this.clicked;
			var gx = Math.floor(this.x/cellSize);
			var gy = Math.floor(this.y/cellSize);
			for (var i = gx; i < this.length + gx; ++i) {
				for (var j = gy; j < this.height + gy; ++j) {
					if (grid[i] != null && grid[i][j] != null){
						grid[i][j].putFurnitureOnCell(false,null);
					}
				}
			}
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
				if (grid[i] == null || grid[i][j] == null || !grid[i][j].usable || (grid[i][j].hasFurniture && grid[i][j].currFurniture != this)) {
					return false; 
				}
			}
		}
		return true;
	}

	this.place = function(x, y) {
		var gx = Math.floor(this.x/cellSize);
		var gy = Math.floor(this.y/cellSize);
		for (var i = gx; i < this.length + gx; ++i) {
			for (var j = gy; j < this.height + gy; ++j) {
				if (grid[i] != null && grid[i][j] != null){
					grid[i][j].putFurnitureOnCell(true, movingObject);
				}
			}
		}
	}

	this.reset = function() {
		this.x = this.initX;
		this.y = this.initY;
	}

	this.draw = function() {
		ctx.strokeStyle="#000000";
		ctx.strokeRect(this.x, this.y, this.sizeX, this.sizeY);
		
		if(!this.isSafe()) ctx.fillStyle=dangerColor;
		else if(this.clicked) ctx.fillStyle=this.highlightColor;
		else ctx.fillStyle=this.color;
		ctx.fillRect(this.x, this.y, this.sizeX, this.sizeY);
	}

	this.checkNeighbors = function(x, y) {
		if (grid[x-1][y].hasFurniture){
			console.log("LEFT is " + grid[x-1][y].currFurniture.name);
		}
		if (grid[x+1][y].hasFurniture){
			console.log("RIGHT is " + grid[x+1][y].currFurniture.name);
		}
		if (grid[x][y+1].hasFurniture){
			console.log("BOTTOM is " + grid[x][y+1].currFurniture.name);
		}
		if (grid[x][y-1].hasFurniture){
			console.log("TOP is " + grid[x][y-1].currFurniture.name);
		}
	}

	this.checkBonusList = function() {
		// for (var i = 0; i < bonusList.length; i++){
		// 	if ()
		// }
	}

	this.getFrontNeighbor = function () {
		return false;
	}

	this.getBackNeighbor = function () {
		return false;
	}

	this.getLeftNeighbor = function () {
		return false;
	}

	this.getRightNeighbor = function () {
		return false;
	}
}