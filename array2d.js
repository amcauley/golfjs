function get2dArray(w, h, s='') {
	arr = [];
	for (let y = 0; y < h; y++) {
		let a = [];
		for (let x = 0; x < w; x++) {
			a.push(s);
		}
		arr.push(a);
	}
	return arr;
}

class Array2d {
	constructor(w, h, s='') {
		this.a = get2dArray(w, h, s);
	}

	getSymbolAtPos(x, y) {
		return this.a[y][x];
	}

	// TODO: use data structure and record what we're overwriting.
	// Will come into play when non-padded shape overlaps padded shape,
	// ex. line overlapping circle. The padded portions of the non-padded line
	// should let the underlying circle color through.
	// Also, rename to something like setSymbolAtPos.
	setSymbolAtPos(s, x, y) {
		if (x >= 0 && y >= 0 && x < WIDTH && y < HEIGHT) {
			this.a[y][x] = s;
		}
	}
}