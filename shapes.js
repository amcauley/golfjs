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

		while (true) {
			// Current line distance
			var xld = x - this.x;
			var yld = y - this.y;
			var ld2 = xld * xld + yld * yld;

			if (ld2 > d2) {
				break;
			}

			a.setSymbolAtPos(LINE_SYMBOL, Math.round(x), Math.round(y));

			x += xDirNorm;
			y += yDirNorm;
		}

		// Add back in the final position to account for rounding / truncation
		a.setSymbolAtPos(LINE_SYMBOL, this.x2, this.y2);
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