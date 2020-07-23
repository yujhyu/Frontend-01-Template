export class TimeLine {
	constructor() {
		this.animations = [];
		this.requestID = null;
		this.state = "inited";
		this.tick = () => {
			let t = Date.now() - this.startTime;
			let animations = this.animations.filter(animation => !animation.finished); // 管理animations
			console.log(t)
			for (let animation of animations) {
				let {object, property, template, start, end, duration, delay, addTime, timingFunction} = animation;

				let progression = timingFunction((t - delay - addTime) / duration); // 百分比 0-1之间的数

				if (t > duration + delay + addTime) {
					progression = 1;
					animation.finished = true;
				}

				let value = animation.valueFromProgression(progression); // value 是根据progression计算出来的当前值

				object[property] = template(value);
			}

			// 停止 requestAnimationFrame
			if (animations.length) {
				this.requestID = requestAnimationFrame(this.tick);
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
	restart() {
		if (this.state === "playing")
			this.pause();
		this.animations = [];
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
		this.requestID && cancelAnimationFrame(this.requestID);
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
		animation.finished = false;
		if (this.state === "playing") {
			animation.addTime = addTime !== void 0 ? addTime : Date.now() - this.startTime;
		} else {
			animation.addTime = addTime !== void 0 ? addTime : 0;
		}
		this.animations.push(animation);
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