class Ball {
	constructor(x, y) {
		this.x = x;
		this.y = y;

		this.shape = new Circle(x, y, 0, 'black', true);

		this.targetX = this.x;
		this.targetY = this.y;

		this.queue = [];
	}

	setDestination(x, y) {
		this.targetX = x;
		this.targetY = y;

		var l = new Line(this.x, this.y, x, y);
		this.queue = l.getPath().reverse();
	}

	update() {
		if (0 == this.queue.length) {
			return [this.x, this.y];
		}

		var pos = this.queue.pop();
		this.x = pos[0];
		this.y = pos[1];

		this.shape.x = this.x;
		this.shape.y = this.y;
	}

	drawOn2dArray(a, startX, startY) {
		this.shape.drawOn2dArray(a, startX, startY);
	}
}