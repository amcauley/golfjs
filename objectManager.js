class ObjectManager {
	constructor() {
		this.objectsByTag = {};
	}

	add(o, tag) {
		if (tag in this.objectsByTag) {
			this.objectsByTag[tag].push(o);
		}
		else {
			this.objectsByTag[tag] = [o];
		}
	}

	clearTag(tag) {
		this.objectsByTag[tag] = [];
	}

	getAll() {
		var l = [];
		for (const [tag, objects] of Object.entries(this.objectsByTag)) {
			for (const o of objects) {
				l.push(o);
			}
		}
		return l;
	}

	drawOnCanvas(c) {
		var objects = this.getAll();
		for (const o of objects) {
			o.drawOnCanvas(c);
		}
	}
}

var gom = new ObjectManager();