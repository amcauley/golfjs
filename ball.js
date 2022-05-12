class Ball {
	constructor(x, y) {
		this.x = x;
		this.y = y;

		this.shape = new Circle(x, y, 0, 'black', true);
	}

	drawOn2dArray(a) {
		this.shape.drawOn2dArray(a);
	}
}