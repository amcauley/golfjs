class Ball {
	constructor(x, y) {
		this.x = x;
		this.y = y;

		this.shape = new Circle(x, y, 0, 'black', true);
		this.trajectory = null;
		this.bMoving = false;
	}

	setTrajectory(t) {
		this.trajectory = t;
	}

	setMoving(bMoving) {
		this.bMoving = bMoving;
	}

	isMoving() {
		return this.bMoving;
	}

	update() {
		if ((this.trajectory == null) || !this.isMoving()) {
			return;
		}

		var pos = this.trajectory.nextPos();
		this.x = pos[0];
		this.y = pos[1];

		this.shape.x = this.x;
		this.shape.y = this.y;
	}

	drawOn2dArray(a, startX, startY) {
		this.shape.drawOn2dArray(a, startX, startY);
	}
}