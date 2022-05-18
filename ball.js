class Ball {
	constructor(x, y) {
		this.x = x;
		this.y = y;

		this.shape = new Circle(x, y, 0, 'black', true);
		this.pathQueue = [];
	}

	setPath(path) {
		this.pathQueue = path.reverse();
	}

	isMoving() {
		return this.pathQueue.length > 0;
	}

	update() {
		if (0 == this.pathQueue.length) {
			return [this.x, this.y];
		}

		var pos = this.pathQueue.pop();
		this.x = pos[0];
		this.y = pos[1];

		this.shape.x = this.x;
		this.shape.y = this.y;
	}

	drawOn2dArray(a, startX, startY) {
		this.shape.drawOn2dArray(a, startX, startY);
	}
}