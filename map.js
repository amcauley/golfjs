class Map {
	constructor(filename=null) {
		// TODO: Init from some config file
		this.objects = [
			new Circle(Math.ceil(WIDTH/4), Math.ceil(WIDTH/3), Math.ceil(WIDTH/10), 'blue'),
			new Circle(Math.ceil(WIDTH*4/5), Math.ceil(WIDTH/2), Math.ceil(WIDTH/6), 'green')
		];
	}

	// Get a list of objects around upper left coordinate (x, y).
	// Objects use global coordinates.
	getObjectsAtPos(x, y) {
		// TODO: Don't just hardcode the entire map
		return this.objects;
	}
}