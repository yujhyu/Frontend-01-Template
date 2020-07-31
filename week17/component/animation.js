export class TimeLine {
	constructor() {
		this.animations = new Set();
		this.finisedAnimations = new Set();
		this.addTimes = new Map();
		this.requestID = null;
		this.state = "inited";
		this.tick = () => {
			let t = Date.now() - this.startTime;

			for (let animation of this.animations) {
				let {object, property, template, start, end, duration, delay, timingFunction} = animation;
				let addTime = this.addTimes.get(animation);

				if (t < delay + addTime)
					continue;

				let progression = timingFunction((t - delay - addTime) / duration); // 百分比 0-1之间的数

				if (t > duration + delay + addTime) {
					progression = 1;
					this.animations.delete(animation);
					this.finisedAnimations.add(animation);
				}

				let value = animation.valueFromProgression(progression); // value 是根据progression计算出来的当前值

				object[property] = template(value);
			}

			// 停止 requestAnimationFrame
			if (this.animations.size) {
				this.requestID = requestAnimationFrame(this.tick);
			} else {
				this.requestID = null;
			}
		}
	}

	start() {
		if (this.state !== "inited") return;
		this.state = "playing";
		// 记录开始时间
		this.startTime = Date.now();
		this.tick();
	}

	// 重新开始
	reset() {
		if (this.state === "playing")
			this.pause();
		this.animations = new Set();
		this.finisedAnimations = new Set();
		this.addTimes = new Map();
		this.requestID = null;
		this.startTime = Date.now();
		this.pauseTime = null;
		this.state === "inited";
	}

	// 重新开始
	restart() {
		if (this.state === "playing")
			this.pause();
		for (let animation of this.finisedAnimations) {
			this.animations.add(animation);
		}
		this.finisedAnimations = new Set();
		this.requestID = null;
		this.state = "playing";
		this.startTime = Date.now();
		this.pauseTime = null;
		this.tick();
	}

	// 暂停
	pause() {
		if (this.state !== "playing") return;
		this.state = "paused";
		// 记录停止时间
		this.pauseTime = Date.now();
		// 移除动画
		if (this.requestID !== null)
			cancelAnimationFrame(this.requestID);
			this.requestID = null;
	}

	// 重启
	resume() {
		if (this.state !== "paused") return;
		this.state = "playing";
		// 当前时间减去停止时间
		this.startTime += Date.now() - this.pauseTime;
		this.tick();
	}

	add(animation, addTime) {
		// 启动动画
		if (this.state === "playing" && this.requestID === null) {
			this.tick();
		}

		if (this.state === "playing") {
			this.addTimes.set(animation, addTime !== void 0 ? addTime : Date.now() - this.startTime);
		} else {
			this.addTimes.set(animation, animation.addTime = addTime !== void 0 ? addTime : 0);
		}
		this.animations.add(animation);
	}
}

export class Animation {
	constructor(object, property, template, start, end, duration, delay, timingFunction) {
		this.object = object;
		this.property = property;
		this.template = template;
		this.start = start;
		this.end = end;
		this.duration = duration;
		this.delay = delay;
		this.timingFunction = timingFunction;
	}

	valueFromProgression(progression) {
		return this.start + progression * (this.end - this.start);
	}
}

export class ColorAnimation {
	constructor(object, property, template, start, end, duration, delay, timingFunction) {
		this.object = object;
		this.property = property;
		this.template = template || (v => `rgba(${v.r}, ${v.g}, ${v.b}, ${v.a})`);
		this.start = start;
		this.end = end;
		this.duration = duration;
		this.delay = delay;
		this.timingFunction = timingFunction;
	}

	valueFromProgression(progression) { // 
		return {
			r: this.start.r + progression * (this.end.r - this.start.r),
			g: this.start.g + progression * (this.end.g - this.start.g),
			b: this.start.b + progression * (this.end.b - this.start.b),
			a: this.start.a + progression * (this.end.a - this.start.a)
		};
	}
}