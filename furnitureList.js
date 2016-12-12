function furnitureList (){
	var couch = new furniture("couch", grid.length * cellSize + 10, 10, 2, 4, "#0000ff", "#ccccff", couchImage,
		[new bonusListItem("table", -2), new bonusListItem("chair", 1)]
		);
	allFurniture.push(couch);
	var table = new furniture("table", grid.length * cellSize + 10 * 2 + cellSize, 10, 2, 6, "#0000ff", "#ccccff", tableImage,
		[]
		);
	allFurniture.push(table);
	var chair = new furniture("chair", grid.length * cellSize + 10, 10 * 2 + cellSize * 2, 2, 2, "#0000ff", "#ccccff", chairImage,
		[]
		);
	allFurniture.push(chair);
}