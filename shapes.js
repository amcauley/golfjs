// TODO: Pass via data struct
var SHAPE_PREFIX_NO_PAD = '_n';

class Shape {
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}

	drawOn2dArray(a, startX, startY) {
		console.log('Base clase Object has no drawOn2dArray implementation.');
	}
}

class Circle extends Shape {
	constructor (x, y, r, color='black', bPad=true) {
		super(x, y);
		this.r = r;
		this.color = color;
		this.bPad = bPad;
	}

	drawOn2dArray(a, startX, startY) {
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
						this.x - startX + x, this.y - startY + y
					);
				}
			}
		}
	}
}

function normalize(x, y) {
	var d2 = x * x + y * y;

	if (d2 == 0) {
		return [0, 0];
	}

	var norm = Math.sqrt(d2)

	return [x / norm, y / norm];
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

		var norm = normalize(xDelta, yDelta);
		var xDirNorm = norm[0];
		var yDirNorm = norm[1];

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

	drawOn2dArray(a, startX, startY) {
		// TODO: Pass symbols in data struct instead of as a string prefix
		var LINE_SYMBOL = SHAPE_PREFIX_NO_PAD + 'L';

		for (let pos of this.getPath()) {
			a.setSymbolAtPos(LINE_SYMBOL, pos[0] - startX, pos[1] - startY);
		}
	}
}

class Curve extends Shape {
	constructor(x, y, vx, vy, g=2, n=5) {
		super(x, y);
		this.vx = vx;
		this.vy = vy;
		this.g = g;
		this.n = n;
	}

	getPath() {
		var x = this.x;
		var y = this.y;
		var vy = this.vy;

		var path = [];

		for (let i = 0; i < this.n ; i++) {
			var d2 = this.vx * this.vx + vy * vy;

			var xx = x;
			var yy = y;

			var vNorm = normalize(this.vx, vy);
			var vnx = vNorm[0];
			var vny = vNorm[1];

			if ((vnx == 0) && (vny == 0)){
				vy += this.g;
				continue;
			}

			path.push([Math.round(xx), Math.round(yy)]);


			while (true) {
				xx += vnx;
				yy += vny;

				var xxr = Math.round(xx);
				var yyr = Math.round(yy);

				path.push([xxr, yyr]);

				// Current line distance
				var xd = x - xx;
				var yd = y - yy;
				// (s)hort distance, i.e. interpolated between main arc points.
				var sd2 = xd * xd + yd * yd;

				if (sd2 > d2) {
					x = xxr;
					y = yyr;
					break;
				}
			}

			vy += this.g;
		}

		return path;
	}

	drawOn2dArray(a, startX, startY) {
		var CURVE_SYMBOL = SHAPE_PREFIX_NO_PAD + 'x';
		for (let pos of this.getPath()) {
			a.setSymbolAtPos(CURVE_SYMBOL, pos[0] - startX, pos[1] - startY);
		}
	}
}