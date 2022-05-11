function get2dArray(w, h, c='') {
	arr = [];
	for (let hh = 0; hh < h; hh++) {
		let a = [];
		for (let ww = 0; ww < w; ww++) {
			a.push(c);
		}
		arr.push(a);
	}
	return arr;
}

class Array2d {
	constructor(w, h, c='') {
		this.a = get2dArray(w, h, c);
	}

	getCharAtPos(x, y) {
		return this.a[y][x];
	}

	// TODO: use data structure and record what we're overwriting.
	// Will come into play when non-padded shape overlaps padded shape,
	// ex. line overlapping circle. The padded portions of the non-padded line
	// should let the underlying circle color through.
	// Also, rename to something like setSymbolAtPos.
	setCharAtPos(c, x, y) {
		if (x >= 0 && y >= 0 && x < WIDTH && y < HEIGHT) {
			this.a[y][x] = c;
		}
	}
}