class Ball {
	constructor(x, y, launchSpeed=1) {
		this.x = x;
		this.y = y;

		// Speed (squared) is a property of the ball, but the ball doesn't directly use it.
		this.launchSpeed2 = launchSpeed * launchSpeed;
		this.speed2 = launchSpeed * launchSpeed;

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

		var xStart = this.x;
		var yStart = this.y;

		var pos = this.trajectory.nextPos();
		this.x = Math.round(pos[0]);
		this.y = Math.round(pos[1]);

		this.shape.x = this.x;
		this.shape.y = this.y;

		var xDist = this.x - xStart;
		var yDist = this.y - yStart;
	}

	drawOn2dArray(a, startX, startY) {
		this.shape.drawOn2dArray(a, startX, startY);
	}
}