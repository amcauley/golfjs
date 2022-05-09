function onClick(e) {
    console.log("c x " + e.pageX + ", y " + e.pageY);
	pos = pxToPos(e.pageX, e.pageY);
	cPos = gc.posToCharIdx(pos[0], pos[1]);

	//var r = new Rectangle(cPos[0], cPos[1], 10, 20);
	//r.drawOnCanvas(gc);

	var c = new Circle(cPos[0], cPos[1], 5);
	gom.add(c, 'C', 1);
	gom.drawOnCanvas(gc);
}

document.addEventListener("click", onClick);

function onMove(e) {
	//console.log("m x " + e.pageX + ", y " + e.pageY);
	pos = pxToPos(e.pageX, e.pageY);
	cPos = gc.posToCharIdx(pos[0], pos[1]);

	var l = new Line(0, 0, cPos[0], cPos[1]);
	gom.clearTag('L');
	gom.add(l, 'L');
	gom.drawOnCanvas(gc);
}

document.addEventListener("mousemove", onMove);

function draw(c, s) {
	var c = document.getElementById('canvasDiv');
	c.innerHTML = gc.getHTML();
}

function init() {
	var c = document.getElementById('canvasDiv');
	c.style.width = '' + (WIDTH * (2 * CHAR_PAD_H + 1)) + 'ch';
	draw();

	setInterval(draw, REFRESH_MS);
}

window.onload = init;