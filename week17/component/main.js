import {create, Text, Wrapper} from './createElement'
import {Carousel} from './Carousel'
import {Panel} from './Panel'
import {TabPanel} from './TabPanel'
import {ListView} from './ListView'

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

// let panel = <Panel title="this is my panel"><span>this is content</span></Panel>;

// let tabPanel = <TabPanel>
// 		<span title="title1">this is content1</span>
// 		<span title="title2">this is content2</span>
// 		<span title="title3">this is content3</span>
// 		<span title="title4">this is content4</span>
// 	</TabPanel>

// let data = [{
// 	url: "https://static001.geekbang.org/resource/image/bb/21/bb38fb7c1073eaee1755f81131f11d21.jpg",
// 	title: '蓝猫'
// },{
// 	url: "https://static001.geekbang.org/resource/image/1b/21/1b809d9a2bdf3ecc481322d7c9223c21.jpg",
// 	title: '橘白猫'
// },{
// 	url: "https://static001.geekbang.org/resource/image/b6/4f/b6d65b2f12646a9fd6b8cb2b020d754f.jpg",
// 	title: '狸花白猫'
// },{
// 	url: "https://static001.geekbang.org/resource/image/73/e4/730ea9c393def7975deceb48b3eb6fe4.jpg",
// 	title: '橘猫'
// }];

// let list = <ListView data={data}>
// 	{record => <figure>
// 		<img src={record.url} />
// 		<figcaption>{record.title}</figcaption>
// 	</figure>}
// </ListView>

component.mountTo(document.body);

// window.tabPanel = tabPanel;