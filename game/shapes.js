// TODO: Pass via data struct
var SHAPE_PREFIX_NO_PAD = '_n';

class Shape {
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}

	getPath() {
		console.log('No getPath implementation'); 
	}

	drawOn2dArray(a, startX, startY) {
		console.log('No drawOn2dArray implementation');
	}
}

class BgGrid extends Shape {
	constructor(x, y) {
		super(x, y);
	}

	drawOn2dArray(a, startX, startY) {
		var blockWidth = gBlockSizeXY[0];
		var blockHeight = gBlockSizeXY[1];

		var blockX = Math.floor((startX - this.x) / blockWidth);
		var blockY = Math.floor((startY - this.y) / blockHeight);

		// If out of bounds, act as if the closes grid point is active.
		// This'll prevent the map from disappearing.
		blockX = Math.min(Math.max(blockX, 0), blockWidth - 1);
		blockY = Math.min(Math.max(blockY, 0), blockHeight - 1);

		var blockKey = blockX + ',' + blockY;
		var blockIds = gBlockMap[blockKey];
		//console.log('block key:', blockKey, 'ids:', blockIds);

		if (blockIds == undefined) {
			return;
		}

		for (let blockId of blockIds) {
			var block = gMapData[blockId];
			if (block == undefined) {
				continue;
			}

			for (let x = 0; x < blockWidth; x++) {
				for (let y = 0; y < blockHeight; y++) {
					var sample = block['data'][y][x];
					if (sample in gColorSymbolMap) {
						var symbol = gColorSymbolMap[sample];
						a.setSymbolAtPos(
							symbol,
							this.x + x - startX + blockWidth * block['blockXY'][0],
							this.y + y - startY + blockHeight * block['blockXY'][1],
						);
					}
				}
			}
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
	constructor(x, y, vx, vy, g=GRAVITY, n=CURVE_PREVIEW_N) {
		super(x, y);
		this.vx = vx;
		this.vy = vy;
		this.g = g;
		this.n = n;

		this.currX = x;
		this.currY = y;
		this.currVy = vy;
		this.segStartX = x;
		this.segStartY = y;
	}

	nextPos() {
		var vNorm = normalize(this.vx, this.currVy);
		var vnx = vNorm[0];
		var vny = vNorm[1];

		this.currX += vnx;
		this.currY += vny;

		var xr = Math.round(this.currX);
		var yr = Math.round(this.currY);

		// Current segment distance
		var xd = this.currX - this.segStartX;
		var yd = this.currY - this.segStartY;

		var d2 = this.vx * this.vx + this.currVy * this.currVy;
		// (s)hort distance, i.e. interpolated between main arc points.
		var sd2 = xd * xd + yd * yd;

		if (sd2 >= d2) {
			this.segStartX = this.currX;
			this.segStartY = this.currY;
			this.currVy += this.g;
		}

		return [xr, yr];
	}

	getPath(n=null) {
		var n = n || this.n;

		// Save current state
		var segStartX = this.segStartX;
		var segStartY = this.segStartY;
		var currX = this.currX;
		var currY = this.currY;
		var currVy = this.currVy;

		// Reinit state
		this.segStartX = this.x;
		this.segStartY = this.y;
		this.currX = this.x;
		this.currY = this.y;
		this.currVy = this.vy;

		var path = [];
		for (let i = 0; i < this.n; i++) {
			path.push(this.nextPos());
		}

		// Restore state
		this.segStartX = segStartX;
		this.segStartY = segStartY;
		this.currX = currX;
		this.currY = currY;
		this.currVy = currVy;

		return path;
	}

	drawOn2dArray(a, startX, startY) {
		var CURVE_SYMBOL = SHAPE_PREFIX_NO_PAD + 'x';
		for (let pos of this.getPath()) {
			a.setSymbolAtPos(CURVE_SYMBOL, pos[0] - startX, pos[1] - startY);
		}
	}
}

class Trajectory {
	constructor(x1, y1, x2, y2) {
		this.line = new Line(x1, y1, x2, y2);

		this.curve = new Curve(
			x2, y2,
			x2 - x1,
			y2 - y1
		);

		// Current index within the trajectory path.
		// 0 represents the starting/no-movement point.
		// -1 is invalid in the sense it ignores all precomputed points,
		// instead computing a new point based on velocity/gravity each time.
		this.stepIdx = 0;
	}

	getPath() {
		return [...this.line.getPath(), ...this.curve.getPath()];
	}

	nextPos() {
		if (this.stepIdx >= 0) {
			this.stepIdx += 1;
		}

		var linePath = this.line.getPath();
		if ((this.stepIdx >= 0) && (this.stepIdx < linePath.length)) {
			return linePath[this.stepIdx];
		}
		return this.curve.nextPos();
	}

	drawOn2dArray(a, startX, startY) {
		var TRAJECTORY_SYMBOL = SHAPE_PREFIX_NO_PAD + '*';

		for (let pos of this.getPath()) {
			a.setSymbolAtPos(TRAJECTORY_SYMBOL, pos[0] - startX, pos[1] - startY);
		}
	}
}
