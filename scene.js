class Scene {
	constructor(drawManager=null) {
		this.dm = drawManager || new DrawManager();
		this.ball = new Ball(Math.ceil(WIDTH / 2), Math.ceil(HEIGHT / 2));

		this.cursorX = 0;
		this.cursorY = 0;
	}

	setDrawManager(dm) {
		this.dm = dm;
	}

	setCursorPos(x, y) {
		this.cursorX = x;
		this.cursorY = y;
	}

	onClick(x, y) {
		this.ball.setDestination(x, y);
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

		this.dm.drawOnCanvas(c);
	}
}

var gs = new Scene();