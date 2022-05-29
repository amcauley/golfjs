class Map {
	constructor(filename=null) {
		// TODO: Init from some config file
		this.objects = [
			new BgGrid(0, 3, 'testMonochrome'),
		];
	}

	// Get a list of objects around upper left coordinate (x, y).
	// Objects use global coordinates.
	getObjectsAtPos(x, y, width=0, height=0) {
		// TODO: Don't just hardcode the entire map
		return this.objects;
	}

	getObstacleMapAtPos(x, y, width, height) {
		var a = new Array2d(width, height, 0);
		for (let o of this.objects) {
			// This draws a display string, but can be refactored (or not) later
			// when "drawing" populates with a data struct instead of a string.
			o.drawOn2dArray(a, x, y);
		}

		// Convert to binary instead of a display string.
		for (let h = 0; h < height; h++) {
			for (let w = 0; w < width; w++) {
				if (0 != a.getSymbolAtPos(w, h)) {
					a.setSymbolAtPos(1, w, h);
				}
			}
		}

		return a.a;
	}
}