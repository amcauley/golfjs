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

class Canvas {
	constructor(w, h) {
		this.w = w;
		this.h = h;
		this.arr = get2dArray(w, h, ' ');
	}

	clear() {
		for (let h = 0; h < this.h; h++) {
			for (let w = 0; w < this.w; w++) {
				this.arr[h][w] = ' ';
			}
		}
	}

	getCharAtPos(x, y) {
		return this.arr[y][x];
	}

	// TODO: use data structure and record what we're overwriting.
	// Will come into play when non-padded shape overlaps padded shape,
	// ex. line overlapping circle. The padded portions of the non-padded line
	// should let the underlying circle color through.
	// Also, rename to something like setSymbolAtPos.
	setCharAtPos(c, x, y) {
		if (x >= 0 && y >= 0 && x < WIDTH && y < HEIGHT) {
			this.arr[y][x] = c;
		}
	}

	// Convert possibly-fractional x, y indices to an index for the closest character
	posToCharIdx(x, y) {
		var cx = Math.max(0, Math.min(WIDTH - 1, Math.round(x)));
		var cy = Math.max(0, Math.min(HEIGHT - 1, Math.round(y)));

		return [cx, cy];
	}

	getHTML() {
		// First transfer the characters from the nominal grid
		// onto a padded grid.
		var wPadded = WIDTH * (1 + 2 * CHAR_PAD_H);
		var hPadded = HEIGHT * (1 + 2 * CHAR_PAD_V);

		var padGrid = get2dArray(wPadded, hPadded, ' ');

		for (let y = 0; y < HEIGHT; y++) {
			for (let x = 0; x < WIDTH; x++) {
				let c = this.getCharAtPos(x, y);

				let bNoPad = c.startsWith(SHAPE_PREFIX_NO_PAD);

				let xCenter = x * (1 + 2 * CHAR_PAD_H) + CHAR_PAD_H;
				let yCenter = y * (1 + 2 * CHAR_PAD_V) + CHAR_PAD_V;

				if (bNoPad) {
					padGrid[yCenter][xCenter] = c.substring(SHAPE_PREFIX_NO_PAD.length);
				}
				else {
					for (let dy = -CHAR_PAD_V; dy <= CHAR_PAD_V; dy++) {
						for (let dx = -CHAR_PAD_H; dx <= CHAR_PAD_H; dx++) {
							padGrid[yCenter + dy][xCenter + dx] = c;
						}
					}
				}
			}
		}

		// Serialize the full padded grid
		var d = '';

		for (let y = 0; y < hPadded; y++) {
			for (let x = 0; x < wPadded; x++) {
				let c = padGrid[y][x];
				if (c == ' ') {
					c = '&nbsp;';
				}
				d += c;
			}
			d += '<br/>';
		}

		return d;
	}
}

var gc = new Canvas(WIDTH, HEIGHT);