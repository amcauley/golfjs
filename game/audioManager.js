class AudioManager {
	constructor() {
		// Maps names to Audio elements
		this.audioMap = {};

		// TODO: Preload audio files to avoid stutter when first playing them
	}

	play(name) {
		if (name in this.audioMap) {
			this.audioMap[name].play();
		}
		else {
			console.log('Unregistered audio name', name);
			var mp3FileName = 'audio/' + name + '.mp3';
			this.audioMap[name] = new Audio(mp3FileName);
			console.log('Added', mp3FileName);
			this.audioMap[name].play();
		}
	}
}

var gam = new AudioManager();