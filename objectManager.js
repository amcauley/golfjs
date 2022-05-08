class ObjectManager {
	constructor() {
		this.objectsByTag = {};
		// Map depth to a list of tags at that depth.
		this.tagsByDepth = {};
	}

	add(o, tag, depth=0) {
		if (tag in this.objectsByTag) {
			this.objectsByTag[tag].push(o);
		}
		else {
			this.objectsByTag[tag] = [o];
		}

		if (depth in this.tagsByDepth) {
			if (!this.tagsByDepth[depth].includes(tag)) {
				this.tagsByDepth[depth].push(tag);
			}
		}
		else {
			this.tagsByDepth[depth] = [tag];
		}
	}

	clearTag(tag) {
		this.objectsByTag[tag] = [];
	}

	// Get all drawable objects in order of decreasing depth
	getAll() {
		var l = [];

		var depths = Object.keys(this.tagsByDepth).sort().reverse();
		for (const d of depths) {
			for (const tag of this.tagsByDepth[d]) {
				for (const o of this.objectsByTag[tag]) {
					l.push(o);
				}
			}
		}

		return l;
	}

	drawOnCanvas(c, bClear=true) {
		if (bClear) {
			c.clear();
		}

		var objects = this.getAll();
		for (const o of objects) {
			o.drawOnCanvas(c);
		}
	}
}

var gom = new ObjectManager();