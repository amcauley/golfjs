class Canvas {
	constructor(w, h) {
		this.w = w;
		this.h = h;
		this.arr = [];

		for (let hh = 0; hh < h; hh++) {
			let a = [];
			for (let ww = 0; ww < w; ww++) {
				a.push(' ');
			}
			this.arr.push(a);
		}
	}

	getCharAtPos(x, y) {
		return this.arr[y][x];
	}

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
		var d = '';
		for (let hh = 0; hh < HEIGHT; hh++) {
			d += '<br/>'.repeat(CHAR_PAD_V);
			for (let ww = 0; ww < WIDTH; ww++) {
				let c = this.getCharAtPos(ww, hh);
				if (c == ' ') {
					c = '&nbsp;';
				}
				d += '&nbsp;'.repeat(CHAR_PAD_H) + c + '&nbsp;'.repeat(CHAR_PAD_H);
			}
			d += '<br/>'.repeat(CHAR_PAD_V);
			d += '<br/>';
		}
		return d;
	}
}

var gc = new Canvas(WIDTH, HEIGHT);