class Scene {
	constructor(drawManager=null) {
		this.dm = drawManager || new DrawManager();
		this.ball = new Ball(Math.ceil(WIDTH / 2), Math.ceil(HEIGHT / 2));

		this.map = new Map();

		this.cursorX = 0;
		this.cursorY = 0;
	}

	setDrawManager(dm) {
		this.dm = dm;
	}

	setCursorPos(x, y) {
		var screenPos = this.dm.getScreenPos();
		this.cursorX = x + screenPos[0];
		this.cursorY = y + screenPos[1];
	}

	onClick(x, y) {
		// Set the ball destination in global coords.
		var screenPos = this.dm.getScreenPos();
		this.ball.setDestination(x + screenPos[0], y + screenPos[1]);
	}

	update() {
		this.ball.update();
	}

	drawOnCanvas(c) {
		this.dm.clearTag('B');
		this.dm.add(this.ball, 'B', 0);

		var l = new Line(this.ball.x, this.ball.y, this.cursorX, this.cursorY);
		this.dm.clearTag('L');
		this.dm.add(l, 'L', 1);

		this.dm.clearTag('M');
		for (let o of this.map.getObjectsAtPos(0, 0)) {
			this.dm.add(o, 'M', 2);
		}

		// Inform the draw manager of the top left global position
		// corresponding to the (0, 0) screen position.
		this.dm.setScreenPos(
			this.ball.x - Math.ceil(WIDTH / 2),
			this.ball.y - Math.ceil(HEIGHT / 2)
		);

		this.dm.drawOnCanvas(c);
	}
}

var gs = new Scene();