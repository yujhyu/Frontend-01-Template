import {TimeLine, Animation, ColorAnimation} from './animation'
import {create, Text, Wrapper} from './createElement'
import {ease, linear} from './cubicBezier'
import {enableGesture} from './gesture' 


export class TabPanel {
	constructor(type) {
		this.children = [];
		this.attributes = new Map();
		this.properties = new Map();
		this.state = Object.create(null); 
	}

	setAttribute(name, value) { // attribute
		this[name] = value;
	}

	appendChild(child) { // children
		this.children.push(child);
	}

	select(i) {
		for (const view of this.childrenViews) {
			view.style.display = "";
		}
	}

	render() {
		let root = <div class="tab-panel" style="border: 1px solid pink;width:300px">
			<h1 style="background: pink;width:100%;margin: 0;">title</h1>
			<div>{ this.children.map(child => <div style="width:100%;min-height: 300px">{child}</div>) }</div>
		</div>
		return 	root;
	}

	mountTo(parent) {
		this.render().mountTo(parent)
	}
}