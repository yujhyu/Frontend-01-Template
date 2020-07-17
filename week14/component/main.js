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

	for (let child of children) {
		if (typeof child === 'string') 
			child = new Text(child);
		o.children.push(child);
	}

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

// let component = <div id="jhyu"  cls="b" style="width:100px;height:100px;background-color:lightgreen">
// 					<div>hey</div>
// 					<div>javascript</div>
// 					<div>component</div>
// 				</div>

let component = <MyComponent>
					<div>jhyu jhyu jhyu</div>
				</MyComponent>

component.mountTo(document.body)

console.log(component);
