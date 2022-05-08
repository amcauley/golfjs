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
		var LINE_SYMBOL = 'L';

		var xLow = Math.min(this.x, this.x2);
		var xHigh = Math.max(this.x, this.x2);
		var yLow = Math.min(this.y, this.y2);
		var yHigh = Math.max(this.y, this.y2);

		var xDelta = xHigh - xLow;
		var yDelta = yHigh - yLow;
		var d2 = xDelta * xDelta + yDelta * yDelta;

		console.log("l xl " + xLow + ", xh " + xHigh + ", yl " + yLow + ", yh " + yHigh + ", d2 " + d2);

		if (d2 == 0) {
			return;
		}

		var norm = Math.sqrt(d2);
		var xDirNorm = xDelta / norm;
		var yDirNorm = yDelta / norm;

		console.log("xN " + xDirNorm + ", yN " + yDirNorm);

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

			c.setCharAtPos(LINE_SYMBOL, Math.round(x), Math.round(y));

			x += xDirNorm;
			y += yDirNorm;
		}

		// Add back in the final position to account for rounding / truncation
		c.setCharAtPos(LINE_SYMBOL, xHigh, yHigh);
	}
}

class Rectangle extends Shape {
	constructor (x, y, w, h) {
		super(x, y);
		this.w = w;
		this.h = h;
	}

	drawOnCanvas(c) {
		for (let h = 0; h < this.h; h++) {
			for (let w = 0; w < this.w; w++) {
				c.setCharAtPos('R', this.x + w, this.y + h);
			}
		}
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
					c.setCharAtPos('C', this.x + x, this.y + y);
				}
			}
		}
	}
}