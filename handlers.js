function onClick(e) {
    console.log("c x " + e.pageX + ", y " + e.pageY);
	pos = pxToPos(e.pageX, e.pageY);
	cPos = gc.posToCharIdx(pos[0], pos[1]);


	var c = new Circle(cPos[0], cPos[1], Math.ceil(WIDTH / 6));
	gdm.add(c, 'C', 1);
	gdm.drawOnCanvas(gc);
}

document.addEventListener("click", onClick);

function onMove(e) {
	//console.log("m x " + e.pageX + ", y " + e.pageY);
	pos = pxToPos(e.pageX, e.pageY);
	cPos = gc.posToCharIdx(pos[0], pos[1]);

	var l = new Line(0, 0, cPos[0], cPos[1]);
	gdm.clearTag('L');
	gdm.add(l, 'L', 0);
	gdm.drawOnCanvas(gc);
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