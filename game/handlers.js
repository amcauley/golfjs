function onClick(e) {
    console.log("c x " + e.pageX + ", y " + e.pageY);
	pos = pxToPos(e.pageX, e.pageY);
	cPos = gc.posToFractionalIdx(pos[0], pos[1]);

	gs.onClick(cPos[0], cPos[1]);
}

document.addEventListener("click", onClick);

function onMove(e) {
	//console.log("m x " + e.pageX + ", y " + e.pageY);
	pos = pxToPos(e.pageX, e.pageY);
	//cPos = gc.posToIdx(pos[0], pos[1]);
	cPos = gc.posToFractionalIdx(pos[0], pos[1]);

	gs.setCursorPos(cPos[0], cPos[1]);
	gs.drawOnCanvas(gc);
}

document.addEventListener("mousemove", onMove);

function update() {
	gs.update();
	gs.drawOnCanvas(gc);

	var c = document.getElementById('canvasDiv');
	c.innerHTML = gc.getHTML();
}

function init() {
	var c = document.getElementById('canvasDiv');
	c.style.width = '' + (WIDTH * (2 * CHAR_PAD_H + 1)) + 'ch';
	gs.setDrawManager(gdm);
	gs.drawOnCanvas(gc);

	//update();
	setInterval(update, REFRESH_MS);
}

window.onload = init;