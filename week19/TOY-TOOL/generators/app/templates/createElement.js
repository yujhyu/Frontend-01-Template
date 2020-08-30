import {enableGesture} from './gesture' 
export function create(Cls, attributes, ...children) { 
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

export class Text {
	constructor(text) {
		this.children = [];
		this.root = document.createTextNode(text);
	}

	mountTo(parent) {
		parent.appendChild(this.root);
	}
}

export class Wrapper {
	constructor(type) {
		this.children = [];
		this.root = document.createElement(type);
	}

	setAttribute(name, value) { // attribute
		this.root.setAttribute(name, value);

		if (name.match(/^on([\s\S]+)$/)) {
			let eventName = RegExp.$1.replace(/^[\s\S]/, c => c.toLowerCase());
			this.addEventListener(eventName, value);
		}

		if (name === 'enableGesture') {
			enableGesture(this.root);
		}
	}

	getAttribute(name) { // attribute
		return this.root.getAttribute(name);
	}

	appendChild(child) { // children
		this.children.push(child);
	}

	addEventListener(type, handler, config) {
		this.root.addEventListener(...arguments);
	}

	get style() {
		return this.root.style;
	}

	get classList() {
		return this.root.classList;
	}

	set innerText(text) {
		return this.root.innerText = text;
	}

	mountTo(parent) {
		parent.appendChild(this.root);
		for (let child of this.children) {
			child.mountTo(this.root);
		}
	}
}