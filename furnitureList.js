function furnitureList (){

	//list of all furniture
	var couch = new furniture("couch", grid.length * cellSize + 10, 10, 2, 4, "#0000ff", "#ccccff", couchImage,
		[new bonusListItem("table", -2, all), new bonusListItem("chair", 1, side)]
		);
	allFurniture.push(couch);
	var table = new furniture("table", grid.length * cellSize + 10 * 2 + cellSize, 10, 2, 6, "#0000ff", "#ccccff", tableImage,
		[new bonusListItem("couch", -2, all), new bonusListItem("chair",3, side)]
		);
	allFurniture.push(table);
	var chair = new furniture("chair", grid.length * cellSize + 10, 10 * 2 + cellSize * 2, 2, 2, "#0000ff", "#ccccff", chairImage,
		[]
		);
	allFurniture.push(chair);
}