export class TimeLine {
	constructor() {
		this.animations = [];
	}

	tick() {
		let t = Date.now() - this.startTime;
		for (let animation of this.animations) {
			if (t > animation.duration + animation.delay)
				continue;

			let {object, property, template, start, end, duration, delay, timingFunction} = animation;

			let progression = timingFunction((t - delay) / duration); // 百分比 0-1之间的数

			let value = start + progression * (end - start);

			object[property] = template(value);
		}
		
		requestAnimationFrame(() => this.tick());
	}

	start() {
		this.startTime = Date.now();
		this.tick();
	}

	add(animation) {
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
		this.timingFunction = timingFunction
	}
}