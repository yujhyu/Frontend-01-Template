function create(Cls, attributes, ...children) { 
	let o;

	if (typeof Cls === 'string') {
		o = new Wrapper(Cls);
	} else {
		o = new Cls({
			timer: {}
		});
	}

	for (let name in attributes) {
		o.setAttribute(name, attributes[name]);
	}

	let visit = (children) => {
		for (let child of children) {
			if (typeof child === 'string') 
				child = new Text(child);
			if (typeof child === 'object' && child instanceof Array) {
				visit(child);
				continue;
			}
			o.children.push(child);
		}
	}

	visit(children);

	return o;
}

class Text {
	constructor(text) {
		this.children = [];
		this.root = document.createTextNode(text);
	}

	mountTo(parent) {
		parent.appendChild(this.root);
	}
}

class Wrapper {
	constructor(type) {
		this.children = [];
		this.root = document.createElement(type);
	}

	setAttribute(name, value) { // attribute
		this.root.setAttribute(name, value);
	}

	appendChild(child) { // children
		this.children.push(child);
	}

	addEventListener(type, handler, config) {
		this.root.addEventListener(...arguments);
	}

	mountTo(parent) {
		parent.appendChild(this.root);
		for (let child of this.children) {
			child.mountTo(this.root);
		}
	}
}

class MyComponent {
	constructor(type) {
		this.children = [];
		// this.root = document.createElement("div");
	}

	setAttribute(name, value) { // attribute
		this.root.setAttribute(name, value);
	}

	appendChild(child) { // children
		this.children.push(child);
	}

	render() {
		
		return <article>
			<header>I'm header</header>
			{this.slot}
			<footer>I'm footer</footer>
		</article>	
	}

	mountTo(parent) {
		this.slot = <div></div>;
		
		for (let child of this.children) {
			this.slot.appendChild(child);
		}

		this.render().mountTo(parent)
	}
}

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
		return 	<div class="carousel">
			{
				this.data.map(url => {
					let element = <img src={url} alt="cat" />;
					element.addEventListener("dragstart", event => event.preventDefault());
					return element;
				})
			}
		</div>
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

console.log(component);