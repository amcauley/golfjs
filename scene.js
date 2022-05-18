class Scene {
	constructor(drawManager=null) {
		this.dm = drawManager || new DrawManager();
		this.ball = new Ball(Math.ceil(WIDTH / 2), Math.ceil(HEIGHT / 2));

		this.map = new Map();

		this.rawCursorX = 0;
		this.rawCursorY = 0;
		this.cursorX = 0;
		this.cursorY = 0;
	}

	setDrawManager(dm) {
		this.dm = dm;
	}

	setCursorPos(x, y) {
		var screenPos = this.dm.getScreenPos();
		this.rawCursorX = x;
		this.rawCursorY = y;
		this.cursorX = x + screenPos[0];
		this.cursorY = y + screenPos[1];
	}

	onClick(x, y) {
		// Set the ball destination in global coords.
		var screenPos = this.dm.getScreenPos();

		var t = new Trajectory(this.ball.x, this.ball.y, this.cursorX, this.cursorY);
		this.ball.setPath(t.getPath());
	}

	update() {
		this.ball.update();
	}

	drawOnCanvas(c) {
		this.dm.clearTag('B');
		this.dm.add(this.ball, 'B', 0);

		this.dm.clearTag('M');
		for (let o of this.map.getObjectsAtPos(0, 0)) {
			this.dm.add(o, 'M', 2);
		}

		// Inform the draw manager of the top left global position
		// corresponding to the (0, 0) screen position.
		this.dm.setScreenPos(
			this.ball.x - Math.ceil(WIDTH / 2),
			this.ball.y - Math.ceil(HEIGHT / 2 + HEIGHT / 4),
		);

		// Handle trajectory updates after setting screen position since
		// the trajectory depends on the screen pos via setCursorPos().
		this.dm.clearTag('T');
		if (!this.ball.isMoving()) {
			// If ball was previously in flight and the cursor hasn't moved,
			// the cursor coordinates are out of date.
			// Recompute them based on the last known raw position.
			this.setCursorPos(this.rawCursorX, this.rawCursorY);

			var t = new Trajectory(this.ball.x, this.ball.y, this.cursorX, this.cursorY);
			this.dm.add(t, 'T', 1);
		}

		this.dm.drawOnCanvas(c);
	}
}

var gs = new Scene();