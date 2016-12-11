var dangerColor = "#ff0000";

function furniture(name, x, y, length, height, color, highlightColor, image, bonusList) {
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
	this.bonusList = bonusList; // a list of bonusListItems, each of which says what side it can be on
	this.toxicList; // a list of items, each of which says what side it can be on
	this.image = image;
	this.rotation = 0;
	this.pointsEarning = 0;

	this.isClicked = function(x, y) {
		if (x > this.x && x < this.x + this.sizeX && y > this.y && y < this.y + this.sizeY) {
			this.clicked = !this.clicked;
			var gx = Math.floor(this.x/cellSize);
			var gy = Math.floor(this.y/cellSize);
			for (var i = gx; i < this.length + gx; ++i) {
				for (var j = gy; j < this.height + gy; ++j) {
					if (grid[i] != null && grid[i][j] != null){
						grid[i][j].putFurnitureOnCell(false,null);
						this.pointsEarning = 0;
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
		this.rotation = (this.rotation + 1)%4;
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
					this.checkNeighbors(i,j);
				}
			}
		}
	}

	this.reset = function() {
		this.x = this.initX;
		this.y = this.initY;
		this.pointsEarning = 0;
	}

	this.draw = function() {
		ctx.strokeStyle="#000000";
		ctx.strokeRect(this.x, this.y, this.sizeX, this.sizeY);
		ctx.save();
		if(!this.isSafe()) {
			ctx.globalAlpha = 0.5;
			ctx.fillStyle=dangerColor;
			ctx.fillRect(this.x, this.y, this.sizeX, this.sizeY);
		}
		ctx.translate(this.x, this.y);
		ctx.rotate(this.rotation*90*Math.PI/180);
		ctx.translate(-this.x, -this.y);
		if (this.clicked) {
			ctx.globalAlpha = 0.25;
		}
		var xMod = 0;
		var yMod = 0;
		switch(this.rotation) {
			case 1:
				yMod = this.sizeX;
				break;
			case 2:
				yMod = this.sizeY;
				xMod = this.sizeX;
				break;
			case 3:
				xMod = this.sizeY;
				break;
		}
		ctx.drawImage(this.image, this.x - xMod, this.y - yMod);
		ctx.restore();
	}

	this.checkNeighbors = function(x, y) {
		if (grid[x-1][y].hasFurniture && grid[x-1][y].currFurniture.name != this.name){
			console.log("LEFT is " + grid[x-1][y].currFurniture.name);
			this.checkBonusList(grid[x-1][y].currFurniture);
		}
		if (grid[x+1][y].hasFurniture && grid[x+1][y].currFurniture.name != this.name){
			console.log("RIGHT is " + grid[x+1][y].currFurniture.name);
			this.checkBonusList(grid[x+1][y].currFurniture);
		}
		if (grid[x][y+1].hasFurniture && grid[x][y+1].currFurniture.name != this.name){
			console.log("BOTTOM is " + grid[x][y+1].currFurniture.name);
			this.checkBonusList(grid[x][y+1].currFurniture);
		}
		if (grid[x][y-1].hasFurniture && grid[x][y-1].currFurniture.name != this.name){
			console.log("TOP is " + grid[x][y-1].currFurniture.name);
			this.checkBonusList(grid[x][y-1].currFurniture);
		}
	}

	this.checkBonusList = function(furniture) {
		for (var i = 0; i < this.bonusList.length; i++){
			if (furniture.name == this.bonusList[i].name){
				this.pointsEarning += this.bonusList[i].points;
			}
		}
		console.log("pointsEarning after: " + this.pointsEarning);
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