function getStyle(element) {
	if (!element.style) {
		element.style = {};
	}

	for (let prop in element.computedStyle) {
		let p = element.computedStyle.value;
		let _prop = element.style[prop] = element.computedStyle[prop].value;

		// 单位
		if (_prop.toString().match(/px$/) || _prop.toString().match(/^[0-9\.]+$/)) {
			_prop = parseInt(_prop);
		}
	}

	return element.style;
}

function layout(element) {
	if (!element.computedStyle) {
		return;
	}

	let elementStyle = getStyle(element);
	
	//  目前只处理flex
	if (elementStyle.display != 'flex') {
		return;
	}

	let items = element.children.filter(e => e.type === 'element');

	items.sort(function (a,b) {  
		return (a.order || 0) - (b.order || 0);
	})

	let style = elementStyle;

	['width', 'height'].forEach(size => {
		if (style[size] === 'auto' || style[size] === '') {
			return null;
		}
	});

	if (!style.flexDirection || style.flexDirection === 'auto') {
		style.flexDirection = 'row';
	}
	if (!style.alignItems || style.alignItems === 'auto') {
		style.alignItems = 'stretch';
	}
	if (!style.justifyContent || style.justifyContent === 'auto') {
		style.justifyContent = 'flex-start';
	}
	if (!style.flexWrap || style.flexWrap === 'auto') {
		style.flexWrap = 'nowrap';
	}
	if (!style.alignContent || style.alignContent === 'auto') {
		style.alignContent = 'stretch';
	}

	let mainSize, mainStart, mainEnd, mainSign, mainBase,
		crossSize, crossStart, crossEnd, crossSign, crossBase;

	const WIDTH = 'width', HEIGHT = 'height', LEFT = 'left', RIGHT = 'right', TOP = 'top', BOTTOM = 'bottom';

	if (style.flexDirection === 'row') {
		mainSize = WIDTH;
		mainStart = LEFT;
		mainEnd = RIGHT;
		mainSign = +1;
		mainBase = 0;

		crossSize = HEIGHT;
		crossStart = TOP;
		crossEnd = BOTTOM;
	}

	if (style.flexDirection === 'row-reverse') {
		mainSize = WIDTH;
		mainStart = LEFT;
		mainEnd = RIGHT;
		mainSign = -1;
		mainBase = style.width;

		crossSize = HEIGHT;
		crossStart = TOP;
		crossEnd = BOTTOM;
	}

	if (style.flexDirection === 'column') {
		mainSize = HEIGHT;
		mainStart = TOP;
		mainEnd = BOTTOM;
		mainSign = +1;
		mainBase = 0;

		crossSize = WIDTH;
		crossStart = LEFT;
		crossEnd = RIGHT;
	}

	if (style.flexDirection === 'column-reverse') {
		mainSize = HEIGHT;
		mainStart = TOP;
		mainEnd = BOTTOM;
		mainSign = -1;
		mainBase = style.height;

		crossSize = WIDTH;
		crossStart = LEFT;
		crossEnd = RIGHT;
	}

	if (style.flexWrap === 'wrap-reverse') {
		let tmp = crossStart;
		crossStart = crossEnd;
		crossEnd =  tmp;
		crossSign = -1;
	} else {
		crossBase = 0;
		crossSign = 1;
	}


	// 处理特殊元素，父元素没有属性，没有宽度。设置为自动撑开
	let isAutoMainSize = false; // 自动撑开
	if (!size[mainSize]) {
		size[mainSize] = 0;
		for (let i = 0; i < items.length; i++) {
			let item = items[i];
			if (itemStyle[mainSize] !== null || itemStyle[mainSize] !== (void(0))) {
				elementStyle[mainSize] = elementStyle[mainSize] + itemStyle[mainSize];
			}
		}
		isAutoMainSize = true;
		// style.flexWrap = 'nowrap';
	}

	let flexLine = [],
		flexLines = [flexLine];
	let	mainSpace = elementStyle[mainSize]; // 多余空间部分
	let crossSpace = 0;

	for (let i = 0; i < items.length; i++) {
		let item = items[i];
		let itemStyle = getStyle(item);

		// 没有主轴尺寸设置为0
		if (itemStyle[mainSize] === null) {
			itemStyle[mainSize] = 0;
		}

		 // 判断是否可伸缩
		if(itemStyle.flex) {
			flexLine.push(item);
		} else if(style.flexWrap === 'nowrap' && isAutoMainSize) { // nowrap超出部分按单行操作
			mainSpace -= itemStyle[mainSize];
			if (itemStyle[crossSize] !== null && itemStyle[crossSize] !== (void(0))) {
				crossSpace = Math.max(crossSpace, itemStyle[crossSize]);
			}

			flexLine.push(item);
		} else {
			// 如果大于1行宽度
			if (itemStyle[mainSize] > style[mainSize]) {
				itemStyle[mainSize] = style[mainSize]
			}

			// 剩余空间的item存储
			if (mainSpace < itemStyle[mainSize]) {
				flexLine.mainSpace = mainSpace;
				flexLine.crossSpace = crossSpace;

				flexLine = [item];
				flexLines.push(flexLine);

				// flexLine(item);

				mainSpace = style[mainSize];
				crossSpace = 0;
			} else {
				flexLine.push(item);
			}

			// 
			if (itemStyle[crossSize] !== null && itemStyle[crossSize] !== (void(0))) {
				crossSpace = Math.max(crossSpace, itemStyle[crossSize]);
			}

			mainSpace -= itemStyle[mainSize];
		}
	}

	flexLine.mainSpace = mainSpace;
	console.log(items);
}


module.exports = layout;