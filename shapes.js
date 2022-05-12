// TODO: Pass via data struct
var SHAPE_PREFIX_NO_PAD = '_n';

class Shape {
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}

	drawOnCanvas(c) {
		console.log('Base clase Object has no drawOnCanvas implementation.');
	}
}

class Line extends Shape {
	constructor (x1, y1, x2, y2) {
		super(x1, y1);
		this.x2 = x2;
		this.y2 = y2;
	}

	drawOnCanvas(c) {
		// TODO: Pass symbols in data struct instead of as a string prefix
		var LINE_SYMBOL = SHAPE_PREFIX_NO_PAD + 'L';

		var xLow = Math.min(this.x, this.x2);
		var xHigh = Math.max(this.x, this.x2);
		var yLow = Math.min(this.y, this.y2);
		var yHigh = Math.max(this.y, this.y2);

		var xDelta = xHigh - xLow;
		var yDelta = yHigh - yLow;
		var d2 = xDelta * xDelta + yDelta * yDelta;

		//console.log("l xl " + xLow + ", xh " + xHigh + ", yl " + yLow + ", yh " + yHigh + ", d2 " + d2);

		if (d2 == 0) {
			return;
		}

		var norm = Math.sqrt(d2);
		var xDirNorm = xDelta / norm;
		var yDirNorm = yDelta / norm;

		//console.log("xN " + xDirNorm + ", yN " + yDirNorm);

		var x = xLow;
		var y = yLow;

		while (true) {
			// Current line distance
			var xld = x - xLow;
			var yld = y - yLow;
			var ld2 = xld * xld + yld * yld;

			if (ld2 > d2) {
				break;
			}

			c.setSymbolAtPos(LINE_SYMBOL, Math.round(x), Math.round(y));

			x += xDirNorm;
			y += yDirNorm;
		}

		// Add back in the final position to account for rounding / truncation
		c.setSymbolAtPos(LINE_SYMBOL, xHigh, yHigh);
	}
}

class Circle extends Shape {
	constructor (x, y, r) {
		super(x, y);
		this.r = r;
	}

	drawOnCanvas(c) {
		for (let x = -this.r; x <= this.r; x++) {
			for (let y = -this.r; y <= this.r; y++) {
				var d2 = x * x + y * y;
				if (d2 <= this.r * this.r) {
					// TODO: Set dictionary / class instead of combining control and representation in a string.
					c.setSymbolAtPos(
						'<font style="background-color:red;">&nbsp;</font>',
						this.x + x, this.y + y
					);
				}
			}
		}
	}
}