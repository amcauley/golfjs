function onClick(e) {
    console.log("c x " + e.pageX + ", y " + e.pageY);
	pos = pxToPos(e.pageX, e.pageY);
	cPos = gc.posToIdx(pos[0], pos[1]);

	var c = new Circle(cPos[0], cPos[1], Math.ceil(WIDTH / 12), 'red');
	gdm.add(c, 'C', 2);
	gs.drawOnCanvas(gc);

	gs.onClick(cPos[0], cPos[1]);
}

document.addEventListener("click", onClick);

function onMove(e) {
	//console.log("m x " + e.pageX + ", y " + e.pageY);
	pos = pxToPos(e.pageX, e.pageY);
	cPos = gc.posToIdx(pos[0], pos[1]);

	var c = new Curve(gs.ball.x, gs.ball.y, cPos[0] - gs.ball.x, cPos[1] - gs.ball.y);
	gdm.clearTag('x');
	gdm.add(c, 'x', 1);

	//gs.setCursorPos(cPos[0], cPos[1]);
	gs.drawOnCanvas(gc);
}

document.addEventListener("mousemove", onMove);

function update(c, s) {
	//gs.update();
	//gs.drawOnCanvas(gc);

	var c = document.getElementById('canvasDiv');
	c.innerHTML = gc.getHTML();
}

function init() {
	var c = document.getElementById('canvasDiv');
	c.style.width = '' + (WIDTH * (2 * CHAR_PAD_H + 1)) + 'ch';
	gs.setDrawManager(gdm);
	gs.drawOnCanvas(gc);

	setInterval(update, REFRESH_MS);
}

window.onload = init;