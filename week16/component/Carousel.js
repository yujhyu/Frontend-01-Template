
import {create, Text, Wrapper} from './createElement'
import {ease, linear} from './cubicBezier'
import {TimeLine, Animation, ColorAnimation} from './animation'

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
		let position = 0;
		let children = this.data.map(url => {
					let element = <img src={url} alt="cat" />;
					element.addEventListener("dragstart", event => event.preventDefault());
					return element;
				});
		let root = <div class="carousel">{ children }</div>

		let timeline = new TimeLine;
		// window.xtimeline = timeline;
		timeline.start();

		let nextPic = () => {  
			let nextPosition = (position + 1) % this.data.length;
			let current = children[position];
			let next = children[nextPosition];

			// 使用animation
			let currentAnimation = new Animation(current.style,  "transform", v => `translateX(${v}%)`, 
				- 100 * position,  - 100 - 100 * position, 500, 0, ease);

			let nextAnimation = new Animation(next.style,  "transform", v => `translateX(${v}%)`, 
				100 - 100 * nextPosition, - 100 * nextPosition, 500, 0, ease);

			timeline.add(currentAnimation);
			timeline.add(nextAnimation);

			position = nextPosition;

			// window.xtopHandler = setTimeout(nextPic, 3000);
			setTimeout(nextPic, 3000);
		}
		setTimeout(nextPic, 3000);

		// 鼠标移动
		// root.addEventListener("mousedown", (event) => {
		// 	let startX = event.clientX, 
		// 		startY = event.clientY;
		// 	let nextPosition = (position + 1) % this.data.length;
		// 	let lastPosition = (position - 1 + this.data.length) % this.data.length;
			
		// 	let current = children[position];
		// 	let next = children[nextPosition];
		// 	let last = children[lastPosition];

		// 	current.style.transition = "ease 0s";
		// 	next.style.transition = "ease 0s";
		// 	last.style.transition = "ease 0s";

		// 	current.style.transform = `translateX(${ - 500 * position}px)`;
		// 	next.style.transform = `translateX(${500 - 500 * lastPosition}px)`;  
		// 	last.style.transform = `translateX(${- 500 - 500 * nextPosition}px)`;

		// 	let move = (event) => {
		// 		current.style.transform = `translateX(${ event.clientX - startX - 500 * position}px)`;
		// 		next.style.transform = `translateX(${ event.clientX - startX - 500 - 500 * nextPosition}px)`;
		// 		last.style.transform = `translateX(${ event.clientX - startX + 500 - 500 * lastPosition}px)`;
		// 	};

		// 	let up = (event) => {
		// 		let offset = 0;

		// 		if (event.clientX - startX > 250) {
		// 			offset = 1;
		// 		} else if (event.clientX - startX < -250) {
		// 			offset = -1;
		// 		}

		// 		// 打开 transition
		// 		current.style.transition = "";
		// 		next.style.transition = "";
		// 		last.style.transition = "";

		// 		current.style.transform = `translateX(${ offset * 500 - 500 * position}px)`;
		// 		next.style.transform = `translateX(${ offset * 500 - 500 - 500 * nextPosition}px)`;
		// 		last.style.transform = `translateX(${ offset * 500 + 500 - 500 * lastPosition}px)`;

		// 		position =  (position - offset + this.data.length) % this.data.length;
		// 		document.removeEventListener("mousemove", move);
		// 		document.removeEventListener("mouseup", up);
		// 	};

		// 	document.addEventListener("mousemove", move);
		// 	document.addEventListener("mouseup", up);
		// });

		return 	root;
	}

	mountTo(parent) {
		this.render().mountTo(parent)
	}
}