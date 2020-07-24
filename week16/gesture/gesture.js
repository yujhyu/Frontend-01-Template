let element = document.body;
let contexts =  Object.create(null);
let MOUSE_SYMBOL = Symbol("mouse"); // Symbol 防止重复

/*********  监听鼠标事件  ********/
element.addEventListener('mousedown', (event) => {
	// 向contexts添加唯一的mouse
	contexts[MOUSE_SYMBOL] = Object.create(null);

	start(event, contexts[MOUSE_SYMBOL]);

	let mousemove = event => {
		move(event, contexts[MOUSE_SYMBOL]);
	}

	// 结束移除监听事件
	let mouseend = event => {
		end(event, contexts[MOUSE_SYMBOL]);
		// 鼠标移动事件
		element.removeEventListener("mousemove", mousemove);
		// 鼠标
		element.removeEventListener("mouseup", mouseend);
	}

	// 鼠标移动事件
	element.addEventListener("mousemove",mousemove);
	// 鼠标
	element.addEventListener("mouseup", mouseend);
});

/*********  监听触屏手势事件  ********/
element.addEventListener('touchstart', (event) => {
	for (let touch of event.changedTouches) {
		contexts[touch.identifier] = Object.create(null);
		start(touch, contexts[touch.identifier]);
	}
});

element.addEventListener('touchmove', (event) => {
	for (let touch of event.changedTouches) {
		move(touch, contexts[touch.identifier]);
	}
});

element.addEventListener('touchend', (event) => {
	for (let touch of event.changedTouches) {
		end(touch, contexts[touch.identifier]);
		delete contexts[touch.identifier];
	}
});

// 系统提示触发
element.addEventListener('touchcancel', (event) => {
	for (let touch of event.changedTouches) {
		cancel(touch, contexts[touch.identifier]);
		delete contexts[touch.identifier];
	}
});

/*********  鼠标、触屏抽象事件  ********/
let start = (point, context) => {
	context.startX = point.clientX;
	context.startY = point.clientY;

	// 操作初始标记
	context.isTop = true;
	context.isPan = false;
	context.isPress = false;

	console.log(point);
}

let move = (point, context) => {
	let dx = point.clientX - context.startX,
		dy = point.clientY - context.startY;

	console.log("move", dx, dy);
}

let end = (point, context) => {
	console.log(point);
}

let cancel = (point, context) => {
	console.log(point);
}

