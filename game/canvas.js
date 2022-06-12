class Canvas {
	constructor(w, h) {
		this.w = w;
		this.h = h;
		this.arr = new Array2d(w, h, ' ');
	}

	clear() {
		for (let h = 0; h < this.h; h++) {
			for (let w = 0; w < this.w; w++) {
				this.arr.setSymbolAtPos(' ', w, h);
			}
		}
	}

	setSymbolAtPos(s, x, y) {
		this.arr.setSymbolAtPos(s, x, y);
	}

	// Clamp possibly-fractional x, y indices to the max width & height range
	posToFractionalIdx(x, y) {
		var cx = Math.max(0, Math.min(WIDTH - 1, x));
		var cy = Math.max(0, Math.min(HEIGHT - 1, y));

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
				let s = this.arr.getSymbolAtPos(x, y);

				let bNoPad = s.startsWith(SHAPE_PREFIX_NO_PAD);

				let xCenter = x * (1 + 2 * CHAR_PAD_H) + CHAR_PAD_H;
				let yCenter = y * (1 + 2 * CHAR_PAD_V) + CHAR_PAD_V;

				if (bNoPad) {
					padGrid[yCenter][xCenter] = s.substring(SHAPE_PREFIX_NO_PAD.length);
				}
				else {
					for (let dy = -CHAR_PAD_V; dy <= CHAR_PAD_V; dy++) {
						for (let dx = -CHAR_PAD_H; dx <= CHAR_PAD_H; dx++) {
							padGrid[yCenter + dy][xCenter + dx] = s;
						}
					}
				}
			}
		}

		// Serialize the full padded grid
		var d = '';

		for (let y = 0; y < hPadded; y++) {
			for (let x = 0; x < wPadded; x++) {
				let s = padGrid[y][x];
				if (s == ' ') {
					s = '&nbsp;';
				}
				d += s;
			}
			d += '<br/>';
		}

		return d;
	}
}

var gc = new Canvas(WIDTH, HEIGHT);