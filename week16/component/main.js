import {create, Text, Wrapper} from './createElement'
import {ease, linear} from './cubicBezier'
import {TimeLine, Animation, ColorAnimation} from './animation'

// import {Carousel} from './carousel.view'

// class MyComponent {
// 	constructor(type) {
// 		this.children = [];
// 		// this.root = document.createElement("div");
// 	}

// 	setAttribute(name, value) { // attribute
// 		this.root.setAttribute(name, value);
// 	}

// 	appendChild(child) { // children
// 		this.children.push(child);
// 	}

// 	render() {
		
// 		return <article>
// 			<header>I'm header</header>
// 			{this.slot}
// 			<footer>I'm footer</footer>
// 		</article>	
// 	}

// 	mountTo(parent) {
// 		this.slot = <div></div>;
		
// 		for (let child of this.children) {
// 			this.slot.appendChild(child);
// 		}

// 		this.render().mountTo(parent)
// 	}
// }

class Carousel {
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
		window.xtimeline = timeline;
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

			window.xtopHandler = setTimeout(nextPic, 3000);
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

// let component = <div id="jhyu"  cls="b" style="width:100px;height:100px;background-color:lightgreen">
// 					<div>hey</div>
// 					<div>javascript</div>
// 					<div>component</div>
// 				</div>

// let component = <MyComponent>
// 					<div>jhyu jhyu jhyu</div>
// 				</MyComponent>

let component = <Carousel data={ [
                    "https://static001.geekbang.org/resource/image/bb/21/bb38fb7c1073eaee1755f81131f11d21.jpg",
                    "https://static001.geekbang.org/resource/image/1b/21/1b809d9a2bdf3ecc481322d7c9223c21.jpg",
                    "https://static001.geekbang.org/resource/image/b6/4f/b6d65b2f12646a9fd6b8cb2b020d754f.jpg",
                    "https://static001.geekbang.org/resource/image/73/e4/730ea9c393def7975deceb48b3eb6fe4.jpg",
                ]}></Carousel>

component.mountTo(document.body)

// console.log(component);
