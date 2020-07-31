import {TimeLine, Animation, ColorAnimation} from './animation'
import {create, Text, Wrapper} from './createElement'
import {ease, linear} from './cubicBezier'
import {enableGesture} from './gesture' 


export class Panel {
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
		let root = <div class="panel" style="border: 1px solid pink;width:300px">
			<h1 style="background: pink;width:100%;margin: 0;">{this.title}</h1>
			<div style="min-height: 300px">{ this.children }</div>
		</div>
		return 	root;
	}

	mountTo(parent) {
		this.render().mountTo(parent)
	}
}