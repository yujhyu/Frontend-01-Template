const EOF = Symbol("EOF"); // EOF: end of file

function data(c) {
	if (c == "<") { // 标签
		return tagOpen;
	} else if (c == EOF) {
		return ;
	} else {
		return data;
	}
};

function tagOpen(c) {
	if (c == "/") { // 如果是斜杠表示 结束标签
		return endTagOpen;
	} else if (c.match(/^[a-zA-Z]$/)) { // 接收正常标签
		return tagName(c); 
	} else {
		return ;
	}
}

function endTagOpen(c) {
	if (c.match(/^[a-zA-Z]$/)) {
		currentToken = {
			type: 'endTag',
			tagName: ""
		}
		return tagName;
	} else if (c == ">") {
		
	} else if (c == EOF) {
		
	} else {
		
	}
}

function tagName(c) {
	if (c.match(/^[\t\n\f ]$/)) { // 空白
		return beforeAttributeName;
	} else if (c == "/") {
		return selfClosingStartTag;
	} else if (c.match(/^[a-zA-Z]$/)) { // 字母
		return tagName;
	} else if (c == ">") {
		return data;
	} else {
		return tagName;
	}
}

function beforeAttributeName(c) {
	if (c.match(/^[\t\n\f ]$/)) {
		return beforeAttributeName;
	} else if (c == ">") {
		return data;
	} else if (c == "=") {
		return beforeAttributeName;
	} else {
		return beforeAttributeName;
	}
}

function selfClosingStartTag(c) {
	if (c == ">") {
		currentToken.isSelfClosingStartTag = true;
		return data;
	} else if (c == "EOF") {
		
	} else {
		
	}
}

/**
 * return 返回DOM树
 */
module.exports.parseHTML = function parseHTML(html) {
	let state = data;
	for (let c of html) {
		console.log(c)
		state = state(c);
	}
	state = state(EOF);
	// console.log(html)
}