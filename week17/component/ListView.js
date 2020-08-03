import {TimeLine, Animation, ColorAnimation} from './animation'
import {create, Text, Wrapper} from './createElement'
import {ease, linear} from './cubicBezier'
import {enableGesture} from './gesture' 


export class ListView {
	constructor(type) {
		this.children = [];
		this.attributes = new Map();
		this.properties = new Map();
		this.state = Object.create(null); 
	}

	setAttribute(name, value) { // attribute
		this[name] = value;
	}

	getAttribute(name) { // attribute
		return this[name];
	}

	appendChild(child) { // children
		this.children.push(child);
	}

	render() {
		let data = this.getAttribute("data");
		let root = <div class="list-view" style="width:300px;">
			{data.map(this.children[0])}
		</div>
		return 	root;
	}

	mountTo(parent) {
		this.render().mountTo(parent)
	}
}