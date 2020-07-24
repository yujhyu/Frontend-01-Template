function enableGesture(element) { 
	let contexts =  Object.create(null);
	let MOUSE_SYMBOL = Symbol("mouse"); // Symbol 防止重复

	// 判断是否支持鼠标
	if (document.ontouchstart !== null)
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
		// 定义事件
		element.dispatchEvent(new CustomEvent('start', {
			startX: point.startX,
			startY: point.startY,
			clientX: point.clientX,
			clientY: point.clientY
		}));
		context.startX = point.clientX;
		context.startY = point.clientY;
		
		context.moves = [];

		// 操作初始标记
		context.isTap = true;
		context.isPan = false;
		context.isPress = false;

		// 触发时间
		context.timeoutHandler = setTimeout(() => {
			if (context.isPan) return;

			context.isTap = false;
			context.isPan = false;
			context.isPress = true;

			// 定义事件
			element.dispatchEvent(new CustomEvent('pressStart', {}));
		}, 500);

		// console.log(point);
	}

	let move = (point, context) => {
		let dx = point.clientX - context.startX, dy = point.clientY - context.startY;

		// 判断距离超过100，触发 panStart
		if (dx ** 2 + dy ** 2 > 100 && !context.isPan) {
			if (context.isPress)
				// 定义事件
				element.dispatchEvent(new CustomEvent('presscancel', {}));

			context.isTap = false;
			context.isPan = true;
			context.isPress = false;

			// 定义事件
			element.dispatchEvent(new CustomEvent('panStart', {
				startX: context.startX,
				startY: context.startY,
				clientX: point.clientX,
				clientY: point.clientY
			}));
		}

		if (context.isPan) {
			// 记录 移动 数据
			context.moves.push({
				dx, 
				dy,
				t: Date.now()
			});

			context.moves = context.moves.filter(record => Date.now() - record.t < 300);
			// 定义事件
			element.dispatchEvent(Object.assign(new CustomEvent('pan'), {
				startX: context.startX,
				startY: context.startY,
				clientX: point.clientX,
				clientY: point.clientY
			}));
		}
	}

	let end = (point, context) => {
		if (context.isPan) {
			let dx = point.clientX - context.startX, 
				dy = point.clientY - context.startY;

			let record = context.moves[0];
			let speed = Math.sqrt((record.dx - dx) ** 2 + (record.dy - dy) ** 2) / (Date.now() - record.t);
			
			let isFlick = speed > 2.5;
			if (isFlick) {
				// 定义事件
				element.dispatchEvent(new CustomEvent('flick', {
					startX: context.startX,
					startY: context.startY,
					clientX: point.clientX,
					clientY: point.clientY,
					speed
				}));
			}

			// 定义事件
			element.dispatchEvent(Object.assign(new CustomEvent('panend'), {
				startX: context.startX,
				startY: context.startY,
				clientX: point.clientX,
				clientY: point.clientY,
				speed,
				isFlick
			}));
		}

		if (context.isTap) {
			// 定义事件
			element.dispatchEvent(new CustomEvent('tap', {
				
			}));
			console.log("tap");
		}

		if (context.isPress) {
			// 定义事件
			element.dispatchEvent(new CustomEvent('pressend', {
				
			}));
		}

		// 移除定时
		clearTimeout(context.timeoutHandler);
	}

	let cancel = (point, context) => {
		// 定义事件
		element.dispatchEvent(new CustomEvent('cancelend', {
			
		}));
		clearTimeout(context.timeoutHandler);
	}
}



