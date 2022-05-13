// TODO: Pass via data struct
var SHAPE_PREFIX_NO_PAD = '_n';

class Shape {
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}

	drawOn2dArray(a) {
		console.log('Base clase Object has no drawOn2dArray implementation.');
	}
}

class Line extends Shape {
	constructor (x1, y1, x2, y2) {
		super(x1, y1);
		this.x2 = x2;
		this.y2 = y2;
	}

	getPath() {
		var xDelta = this.x2 - this.x;
		var yDelta = this.y2 - this.y;
		var d2 = xDelta * xDelta + yDelta * yDelta;

		if (d2 == 0) {
			return [this.x, this.y];
		}

		var norm = Math.sqrt(d2);
		var xDirNorm = xDelta / norm;
		var yDirNorm = yDelta / norm;

		var x = this.x;
		var y = this.y;

		var path = [];
		while (true) {
			// Current line distance
			var xld = x - this.x;
			var yld = y - this.y;
			var ld2 = xld * xld + yld * yld;

			if (ld2 > d2) {
				break;
			}

			path.push([Math.round(x), Math.round(y)]);

			x += xDirNorm;
			y += yDirNorm;
		}

		var last = path[path.length - 1];
		var x2Round = Math.round(this.x2);
		var y2Round = Math.round(this.y2);
		if ((last[0] != x2Round) || (last[1] != y2Round)) {
			path.push([x2Round, y2Round]);
		}

		return path;
	}

	drawOn2dArray(a) {
		// TODO: Pass symbols in data struct instead of as a string prefix
		var LINE_SYMBOL = SHAPE_PREFIX_NO_PAD + 'L';

		var xDelta = this.x2 - this.x;
		var yDelta = this.y2 - this.y;
		var d2 = xDelta * xDelta + yDelta * yDelta;

		if (d2 == 0) {
			return;
		}

		var norm = Math.sqrt(d2);
		var xDirNorm = xDelta / norm;
		var yDirNorm = yDelta / norm;

		//console.log("xN " + xDirNorm + ", yN " + yDirNorm);

		var x = this.x;
		var y = this.y;

		for (let pos of this.getPath()) {
			a.setSymbolAtPos(LINE_SYMBOL, pos[0], pos[1]);
		}
	}
}

class Circle extends Shape {
	constructor (x, y, r, color='black', bPad=true) {
		super(x, y);
		this.r = r;
		this.color = color;
		this.bPad = bPad;
	}

	drawOn2dArray(a) {
		var padPrefix = '';
		if (!this.bPad) {
			padPrefix = SHAPE_PREFIX_NO_PAD;
		}

		for (let x = -this.r; x <= this.r; x++) {
			for (let y = -this.r; y <= this.r; y++) {
				var d2 = x * x + y * y;
				if (d2 <= this.r * this.r) {
					// TODO: Set dictionary / class instead of combining control and representation in a string.
					a.setSymbolAtPos(
						padPrefix +
						'<font style="background-color:' + this.color + ';">&nbsp;</font>',
						this.x + x, this.y + y
					);
				}
			}
		}
	}
}