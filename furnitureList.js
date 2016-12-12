function furnitureList (){

	//list of all furniture
	var couch = new furniture("couch", grid.length * cellSize + 10, 10, 2, 4, "#0000ff", "#ccccff", couchImage,
		[new bonusListItem("table", -1, all)]
		);
	allFurniture.push(couch);
	var table = new furniture("table", grid.length * cellSize + 10 * 2 + cellSize, 10, 2, 6, "#0000ff", "#ccccff", tableImage,
		[new bonusListItem("couch", -1, all), new bonusListItem("chair",1, side)]
		);
	allFurniture.push(table);
	var chair = new furniture("chair", grid.length * cellSize + 10, 10 * 2 + cellSize * 2, 2, 2, "#0000ff", "#ccccff", chairImage,
		[new bonusListItem("", 0, all)]
		);
	allFurniture.push(chair);
}