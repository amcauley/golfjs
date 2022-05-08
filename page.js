// Convert a pixel page coordinate to an x, y coordinate using character position indices.
// Allow fractional indices, i.e. 1.5. The caller can cast to int if needed.
// Return a list of the index values [x, y].
function pxToPos(pxX, pxY) {
	var c = document.getElementById('canvasDiv');
	var r = c.getBoundingClientRect();
	console.log('t ' + r.top + ', b ' + r.bottom + ', l ' + r.left + ', r ' + r.right);

	// Adjust by 0.5 to account for any char padding. The center char is considered the integer idx.
	var x = (pxX - r.left) / (r.right - r.left) * WIDTH - 0.5;
	x = Math.min(WIDTH - 0.5, Math.max(-0.5, x));

	var y = (pxY - r.top) / (r.bottom - r.top) * HEIGHT - 0.5;
	y = Math.min(HEIGHT - 0.5, Math.max(-0.5, y));

	console.log('px ' + pxX + ', ' + pxY + ' -> idx ' + x + ', ' + y);
	return [x, y];
}

function draw(c, s) {
	var c = document.getElementById('canvasDiv');
	c.innerHTML = gc.getHTML();
}