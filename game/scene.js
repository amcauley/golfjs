class Scene {
	constructor(drawManager=null) {
		this.dm = drawManager || new DrawManager();
		this.ball = new Ball(Math.ceil(WIDTH / 2), Math.ceil(HEIGHT / 2) + 20, BALL_LAUNCH_SPEED);

		this.map = new Map();

		this.rawCursorX = 0;
		this.rawCursorY = 0;
		this.cursorX = 0;
		this.cursorY = 0;

		// Old ball pos, ex. from 2 iterations in the past.
		this.queueX = [null, null];
		this.queueY = [null, null];
	}

	setDrawManager(dm) {
		this.dm = dm;
	}

	setCursorPos(x, y) {
		var screenPos = this.dm.getScreenPos();
		this.rawCursorX = x;
		this.rawCursorY = y;
		this.cursorX = x + screenPos[0];
		this.cursorY = y + screenPos[1];
	}

	onClick(x, y) {
		// Ignore input if the ball is already in flight.
		if (this.ball.isMoving()) {
			return;
		}

		// Set the ball destination in global coords.
		var screenPos = this.dm.getScreenPos();

		var t = new Trajectory(this.ball.x, this.ball.y, this.cursorX, this.cursorY);
		this.ball.setTrajectory(t);
		this.ball.setMoving(true);
		this.ball.speed2 = this.ball.launchSpeed2;

		var hitSounds = ['clap', 'snap'];
		gam.play(hitSounds[Math.floor(Math.random() * hitSounds.length)]);
	}

	handleCollisions(lastX, lastY, map) {
		var xIdx = this.ball.x - lastX + 1;
		var yIdx = this.ball.y - lastY + 1;

		if (this.ball.isMoving()) {
			console.log(lastX + ' ' + lastY + ' -> ' + this.ball.x + ' ' + this.ball.y);
		}

		if (map[yIdx][xIdx] != 0) {
			// For now just reset to the previous good position
			// and kill all horizontal velocity

			// TODO: Delegate these to methods within ball and trajectory
			this.ball.x = lastX;
			this.ball.y = lastY;
			this.ball.shape.x = lastX;
			this.ball.shape.y = lastY;
			this.ball.trajectory.curve.currX = lastX;
			this.ball.trajectory.curve.currY = lastY;
			this.ball.trajectory.curve.vx = 0;
			this.ball.trajectory.stepIdx = -1;
		}

		// No movement in the last 2 updates.
		// TODO: Look into cleaning trajectory to remove duplicate positions,
		// which could help simplify the checks here.
		if ((this.queueX[0] == this.ball.x) &&
			(this.queueY[0] == this.ball.y) &&
			(this.queueX[1] == this.ball.x) &&
			(this.queueY[1] == this.ball.y)) {
			this.ball.setMoving(false);
		}

		// update position queues.
		// TODO: Move into a separate queue class.
		this.queueX = [lastX, this.queueX[0]];
		this.queueY = [lastY, this.queueY[0]];
	}

	update() {
		// The ball knows which path it will take, but doesn't manage distance.
		// That's handled by the scene so that it can check collisions at every step.
		// Take a snapshot of the speed and use it to determine travel distance.
		// TODO: Compute based on height, i.e. energy conserved but converted to potential.
		var distLimit2 = this.ball.speed2;
		var dist2 = 0;

		while(this.ball.isMoving()) {
			//console.log('mvmt loop');
			var lastX = this.ball.x;
			var lastY = this.ball.y;

			this.ball.update();

			var m = this.map.getObstacleMapAtPos(
				lastX - 1,
				lastY - 1,
				3, 3);

			this.handleCollisions(lastX, lastY, m);

			var distX = this.ball.x - lastX;
			var distY = this.ball.y - lastY;
			dist2 += distX * distX + distY * distY;

			if (dist2 > distLimit2) {
				break;
			}
		}
	}

	drawOnCanvas(c) {
		this.dm.clearTag('B');
		this.dm.add(this.ball, 'B', 0);

		this.dm.clearTag('M');
		for (let o of this.map.getObjectsAtPos(0, 0)) {
			this.dm.add(o, 'M', 2);
		}

		// Inform the draw manager of the top left global position
		// corresponding to the (0, 0) screen position.
		this.dm.setScreenPos(
			this.ball.x - Math.ceil(WIDTH / 2),
			this.ball.y - Math.ceil(HEIGHT * 2 / 3),
		);

		// Handle trajectory updates after setting screen position since
		// the trajectory depends on the screen pos via setCursorPos().
		this.dm.clearTag('T');
		if (!this.ball.isMoving()) {
			// If ball was previously in flight and the cursor hasn't moved,
			// the cursor coordinates are out of date.
			// Recompute them based on the last known raw position.
			this.setCursorPos(this.rawCursorX, this.rawCursorY);

			var t = new Trajectory(this.ball.x, this.ball.y, this.cursorX, this.cursorY);
			this.dm.add(t, 'T', 1);
		}

		this.dm.drawOnCanvas(c);
	}
}

var gs = new Scene();