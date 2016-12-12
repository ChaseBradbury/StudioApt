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
	//Sides of furniture for bonus
	this.front;
	this.back;
	this.side; 
	this.bonusList = bonusList; // a list of bonusListItems, each of which says what side it can be on
	this.readableBonusList = "";
	//this.readableBonusList = this.makeBonusListReadable();
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
						playerPoints -= this.pointsEarning;
						this.pointsEarning = 0;
					}
				}
			}
			if (this.readableBonusList == ""){
				this.readableBonusList = this.readableBonusList.concat(this.makeBonusListReadable());
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
		console.log(this.rotation);
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
		// update player points after placing furniture
		playerPoints += this.pointsEarning;
		console.log("playerPoints = " + playerPoints);
	}

	this.reset = function() {
		this.x = this.initX;
		this.y = this.initY;
		playerPoints -= this.pointsEarning;
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
			//while holding object, draw bonus list
			this.drawBonusList();
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
		//check left
		var leftNeighbor = this.getLeftNeighbor(x,y);
		// if (leftNeighbor != null) {
		// 	console.log(leftNeighbor);
		// 	leftNeighbor.getRightNeighbor(leftNeighbor.x,leftNeighbor.y);
		// }
		//check right
		var rightNeighbor = this.getRightNeighbor(x,y);
		//if (rightNeighbor != null) rightNeighbor.getLeftNeighbor(x-1,y);
		//check bottom
		var bottomNeighbor = this.getBottomNeighbor(x,y);
		//if (bottomNeighbor != null) bottomNeighbor.getTopNeighbor(x,y+1);
		//check top
		var topNeighbor = this.getTopNeighbor(x,y);
		//if (topNeighbor != null) topNeighbor.getBottomNeighbor(x,y-1);
	}

	this.getTopNeighbor = function (x,y) {
		if (grid[x][y-1].hasFurniture && grid[x][y-1].currFurniture.name != this.name){
			if (this.rotation == 0){
				this.checkBonusList(grid[x][y-1].currFurniture, side);
			}
			else if (this.rotation == 1){
				this.checkBonusList(grid[x][y-1].currFurniture, back);
			}
			else if (this.rotation == 2){
				this.checkBonusList(grid[x][y-1].currFurniture, side);
			}
			else if (this.rotation == 3){
				this.checkBonusList(grid[x][y-1].currFurniture, front);
			}
			else {
				console.log("BIG ROTATION ERROR");
			}
			return grid[x][y-1].currFurniture;
		}
	}

	this.getBottomNeighbor = function (x,y) {
		if (grid[x][y+1].hasFurniture && grid[x][y+1].currFurniture.name != this.name){
			if (this.rotation == 0){
				this.checkBonusList(grid[x][y+1].currFurniture, side);
			}
			else if (this.rotation == 1){
				this.checkBonusList(grid[x][y+1].currFurniture, front);
			}
			else if (this.rotation == 2){
				this.checkBonusList(grid[x][y+1].currFurniture, side);
			}
			else if (this.rotation == 3){
				this.checkBonusList(grid[x][y+1].currFurniture, back);
			}
			else {
				console.log("BIG ROTATION ERROR");
			}
			return grid[x][y+1].currFurniture;
		}
	}

	this.getLeftNeighbor = function (x,y) {
		if (grid[x-1][y].hasFurniture && grid[x-1][y].currFurniture.name != this.name){
			if (this.rotation == 0){
				this.checkBonusList(grid[x-1][y].currFurniture, back);
			}
			else if (this.rotation == 1){
				this.checkBonusList(grid[x-1][y].currFurniture, side);
			}
			else if (this.rotation == 2){
				this.checkBonusList(grid[x-1][y].currFurniture, front);
			}
			else if (this.rotation == 3){
				this.checkBonusList(grid[x-1][y].currFurniture, side);
			}
			else {
				console.log("BIG ROTATION ERROR");
			}
			return grid[x-1][y].currFurniture;
		}
	}

	this.getRightNeighbor = function (x,y) {
		if (grid[x+1][y].hasFurniture && grid[x+1][y].currFurniture.name != this.name){
			if (this.rotation == 0){
				this.checkBonusList(grid[x+1][y].currFurniture, front);
			}
			else if (this.rotation == 1){
				this.checkBonusList(grid[x+1][y].currFurniture, side);
			}
			else if (this.rotation == 2){
				this.checkBonusList(grid[x+1][y].currFurniture, back);
			}
			else if (this.rotation == 3){
				this.checkBonusList(grid[x+1][y].currFurniture, side);
			}
			else {
				console.log("BIG ROTATION ERROR");
			}
			return grid[x+1][y].currFurniture;
		}
	}

	this.checkBonusList = function(furniture, bonusSide) {
		for (var i = 0; i < this.bonusList.length; i++){
			// if bonusSide is "all", applying bonusPoints no matter what
			if (furniture.name == this.bonusList[i].name && this.bonusList[i].bonusSide == all){
				this.pointsEarning += this.bonusList[i].points;
			} 
			else if (furniture.name == this.bonusList[i].name && bonusSide == this.bonusList[i].bonusSide){
				this.pointsEarning += this.bonusList[i].points;
			}
		}
		console.log("pointsEarning from "+ furniture.name+ ": " + this.pointsEarning);
	}

	this.makeBonusListReadable = function() {
		var readableList = "";
		for (var i = 0; i < this.bonusList.length; i++){
			if(this.bonusList[i] != null){
				var textForAll = "any side";
				if (this.bonusList[i].name == ""){
					readableList = readableList.concat(" no bonuses");
				}
				else if (this.bonusList[i].bonusSide == all){
					readableList = readableList.concat(this.bonusList[i].name + " by " + textForAll + "(" + this.bonusList[i].points + ") , ");

				} else {
					readableList = readableList.concat(this.bonusList[i].name + " by " + this.bonusList[i].bonusSide + "(" + this.bonusList[i].points + ") , ");
				}
			}
		}
		return readableList;
	}

	this.drawBonusList = function(){
		var listToDisplay = "hello";
		ctx.font = "18px Arial";
    	ctx.fillStyle = "000000";
    	ctx.fillText("Bonus Furniture: "+ this.readableBonusList, 8, 725)
	}
}