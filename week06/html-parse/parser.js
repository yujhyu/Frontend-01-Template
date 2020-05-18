let currentToken = null;
let currentAttribute = null;

let stack = [{type: "document", children: []}];
let currentTextNode = null;

function emit(token) {
	if (token.type === "text") {
		return;
	}
	// console.log(token)

	let top = stack[stack.length - 1];

	if (token.type == "startTag") {
		let element = {
			type: "element",
			children: [],
			attributes: []
		}

		element.tagName = token.tagName;

		for (let p in token) {
			if (p != "type" && p != "tagName") {
				element.attributes.push({
					name: p,
					value: token[p]
				})
			}
		}

		top.children.push(element);
		element.parent = top;

		if (!token.isSelfClosing) {
			stack.push(element);
		}

		currentTextNode = null;
	} else if(token.type == "endTag") {
		if (top.tagName != token.tagName) {
			throw new Error("Tag start end doesn't match!");
		} else {
			stack.pop();
		}

		currentTextNode = null;
	 } else if(token.type == "text") {
		if (currentTextNode == null) {
			currentTextNode = {
				type: 'text',
				content: ""
			}

			top.children.push(currentTextNode);
		}
		currentTextNode.content += token.content;
	}
}

const EOF = Symbol("EOF"); // EOF: end of file

function data(c) {
	if (c == "<") { // 标签
		return tagOpen;
	} else if (c == EOF) {
		emit({
			type: "EOF"
		});
		return ;
	} else {
		emit({
			type: "text",
			content: c
		});
		return data;
	}
};

function tagOpen(c) {
	if (c == "/") { // 如果是斜杠表示 结束标签
		return endTagOpen;
	} else if (c.match(/^[a-zA-Z]$/)) { // 接收正常标签
		currentToken = {
			type: "startTag",
			tagName: ""
		};
		return tagName(c); 
	} else {
		emit({
			type: "text",
			content: c
		});
		return ;
	}
}

function tagName(c) {
	if (c.match(/^[\t\n\f ]$/)) { // 空白
		return beforeAttributeName; // 属性
	} else if (c == "/") { // 自封闭标签--结束
		return selfClosingStartTag;
	} else if (c.match(/^[A-Z]$/)) { // 字母
		currentToken.tagName += c;
		return tagName;
	} else if (c == ">") {
		emit(currentToken);
		return data;
	} else {
		currentToken.tagName += c;
		return tagName;
	}
}

function beforeAttributeName(c) {
	if (c.match(/^[\t\n\f ]$/)) {
		return beforeAttributeName;
	} else if (c == "/" || c == ">" || c == EOF) {
		return afterAttributeName(c);
	} else if (c == "=") {
		
	} else {
		currentAttribute = {
			name: "",
			value: ""
		}
		return attributeName(c);
	}
}

function attributeName(c) {
	if (c.match(/^[\t\n\f ]$/) || c == "/" || c == ">" || c == EOF) {
		return afterAttributeName(c);
	} else if (c == "=") {
		return beforeAttributeValue;
	} else if (c == "\u0000") {
		// return ;
	} else if (c == "\"" || c == "'" || c == "<") {
		
	} else {
		currentAttribute.name += c;
		return attributeName;  
	}
}

function beforeAttributeValue(c) {
	if (c.match(/^[\t\n\f ]$/) || c == "/" || c == ">" || c == EOF) {
		return beforeAttributeValue;
	} else if (c == "\"") {
		return doubleQuotedAttributeValue;
	} else if (c == "\'") {
		return singleQuotedAttributeValue;
	} else if (c == ">") {
		// return;
	} else {
		return UnquotedAttributeValue(c);
	}
}

function doubleQuotedAttributeValue(c) {
	if (c == "\"") {
		currentToken[currentAttribute.name] = currentAttribute.value;
		return afterQuotedAttributeVaule;
	} else if (c == "\u0000") {
		// return ;
	} else if (c == EOF) {
		// return ;
 	} else {
		currentAttribute.value += c;
		return doubleQuotedAttributeValue;
	}
}

function singleQuotedAttributeValue(c) {
	if (c == "\'") {
		currentToken[currentAttribute.name] = currentAttribute.value;
		return afterQuotedAttributeVaule;
	} else if (c == "\u0000") {
		// return ;
	} else if (c == EOF) {
		// return ;
 	} else {
		currentAttribute.value += c;
		return doubleQuotedAttributeValue;
	}
}

function afterQuotedAttributeVaule(c) {
	if (c.match(/^[\t\n\f ]$/)) {
		return beforeAttributeName;
	} else if (c == "/") {
		return selfClosingStartTag;
	} else if (c == ">") {
		currentToken[currentAttribute.name] = currentAttribute.value;
		emit(currentToken);
		return data;
	} else if (c == EOF) {
		// return;
	} else {
		currentAttribute.value += c;
		return doubleQuotedAttributeValue;
	}
}

function UnquotedAttributeValue(c) {
	if (c.match(/^[\t\n\f ]$/)) {
		currentToken[currentAttribute.name] = currentAttribute.value;
		return beforeAttributeName;
	} else if (c == "/") {
		currentToken[currentAttribute.name] = currentAttribute.value;
		return selfClosingStartTag;
	} else if (c == ">") {
		currentToken[currentAttribute.name] = currentAttribute.value;
		emit(currentToken);
		return data;
	} else if (c == "\u0000") {
		
	} else if (c == "\"" || c == "'" || c == "<" || c == "=" ||  c == "`") {
		
		// return;
	} else if (c == EOF) {
		// return;
	} else {
		currentAttribute.value += c;
		return UnquotedAttributeValue;
	}
}

function selfClosingStartTag(c) {
	if (c == ">") {
		currentToken.isSelfClosing = true;
		emit(currentToken);
		return data;
	} else if (c == "EOF") {
		
	} else {
		
	}
}

function endTagOpen(c) {
	if (c.match(/^[a-zA-Z]$/)) {
		currentToken = {
			type: 'endTag',
			tagName: ""
		}
		return tagName(c);
	} else if (c == ">") {
		
	} else if (c == EOF) {
		
	} else {
		
	}
}

function afterAttributeName(c) {
	if (c.match(/^[\t\n\f ]$/)) {
		return afterAttributeName;
	} else if (c == "/") {
		return selfClosingStartTag;
	} else if (c == "=") {
		return beforeAttributeValue;
	} else if (c == ">") {
		currentToken[currentAttribute.name] = currentAttribute.value;
		emit(currentToken);
		return data;
	} else if (c == EOF) {
		// return ;
	} else {
		currentToken[currentAttribute.name] = currentAttribute.value;
		currentAttribute = {
			name: "",
			value: ""
		}
		return attributeName(c);
	}
}

/**
 * return 返回DOM树
 */
module.exports.parseHTML = function parseHTML(html) {
	let state = data;

	for (let c of html) {
		state = state(c);
	}
	state = state(EOF);
	console.log(stack[0]);
	return stack[0];
}