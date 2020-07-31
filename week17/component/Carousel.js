
import {TimeLine, Animation, ColorAnimation} from './animation'
import {create, Text, Wrapper} from './createElement'
import {ease, linear} from './cubicBezier'
import {enableGesture} from './gesture' 


export class Carousel {
	constructor(type) {
		this.children = [];
		this.attributes = new Map();
		this.properties = new Map();
	}

	setAttribute(name, value) { // attribute
		this[name] = value;
	}

	appendChild(child) { // children
		this.children.push(child);
	}

	render() {
		let timeline = new TimeLine;
		timeline.start();
		let position = 0;
		let nextPicStopHandler = null;

		let children = this.data.map((url, currentPosition) => {
			let nextPosition = (currentPosition + 1) % this.data.length;
			let lastPosition = (currentPosition - 1 + this.data.length) % this.data.length;
			let offset = 0;

			let onStart = () => {
				timeline.pause();
				clearTimeout(nextPicStopHandler);
				let currentElement = children[currentPosition];
				let currentTransformValue = Number(currentElement.style.transform.match(/translateX\(([\s\S]+)px\)/)[1]);
				offset = currentTransformValue + 500 * currentPosition;
				// console.log(offset)
			};

			// 捡起
			let onPan = event => {
				let dx = event.clientX - event.startX;

				let currentElement = children[currentPosition];
				let nextElement = children[nextPosition];
				let lastElement = children[lastPosition];

				let currentTransformValue = - 500 * currentPosition + offset + dx;
				let nextTransformValue = 500 - 500 * nextPosition + offset + dx;
				let lastTransformValue = - 500 - 500 * lastPosition + offset + dx;

				currentElement.style.transform = `translateX(${currentTransformValue}px)`;
				nextElement.style.transform = `translateX(${nextTransformValue}px)`;
				lastElement.style.transform = `translateX(${lastTransformValue}px)`;
			};

			let onPanend = event => {
				let direction = 0;
				let dx = event.clientX - event.startX;

				// console.log("flick", event.isFlick);

				if (dx + offset > 250 || dx > 0 && event.isFlick) {
					direction = 1;
				} else if (dx + offset < -250 || dx < 0 && event.isFlick) {
					direction = -1;
				}

				timeline.reset();
				timeline.start();

				let currentElement = children[currentPosition];
				let nextElement = children[nextPosition];
				let lastElement = children[lastPosition];

				let currentAnimation = new Animation(currentElement.style,  "transform", v => `translateX(${v}px)`, 
						- 500 * currentPosition + offset + dx,  - 500 - 500 * currentPosition + direction * 500, 500, 0, ease);

				let nextAnimation = new Animation(nextElement.style,  "transform", v => `translateX(${v}px)`, 
					500 - 500 * nextPosition + offset + dx, 500 - 500 * nextPosition + direction * 500, 500, 0, ease);
					
				let lastAnimation = new Animation(lastElement.style,  "transform", v => `translateX(${v}px)`, 
					- 500 - 500 * lastPosition + offset + dx, - 500 - 500 * lastPosition + direction * 500, 500, 0, ease);

				timeline.add(currentAnimation);
				timeline.add(nextAnimation);
				timeline.add(lastAnimation);

				position = (position - direction + this.data.length) % this.data.length;

				nextPicStopHandler = setTimeout(nextPic, 3000);
			}

			let element = <img src={url} alt="cat" onStart={onStart} onPan={onPan} onPanend={onPanend} enableGesture={true} />;
			element.style.transform = 'translateX(0px)';
			element.addEventListener("dragstart", event => event.preventDefault());
			return element;
		});

		let root = <div class="carousel">{ children }</div>

		let nextPic = () => {  
			let nextPosition = (position + 1) % this.data.length;
			let current = children[position];
			let next = children[nextPosition];

			// 使用animation
			let currentAnimation = new Animation(current.style,  "transform", v => `translateX(${5 * v}px)`, 
				- 100 * position,  - 100 - 100 * position, 500, 0, ease);

			let nextAnimation = new Animation(next.style,  "transform", v => `translateX(${5 * v}px)`, 
				100 - 100 * nextPosition, - 100 * nextPosition, 500, 0, ease);

			timeline.add(currentAnimation);
			timeline.add(nextAnimation);

			position = nextPosition;

			nextPicStopHandler = setTimeout(nextPic, 3000);
		}
		nextPicStopHandler = setTimeout(nextPic, 3000);

		return 	root;
	}

	mountTo(parent) {
		this.render().mountTo(parent)
	}
}