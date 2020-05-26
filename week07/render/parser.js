let currentToken = null;
let currentAttribute = null;

let stack = [{type: "document", children: []}];
let currentTextNode = null;

const css = require('css');
const layout = require('./layout.js');

// 加入一个新的函数addCSSRules,将CSS规则暂存入数组
let rules = [];
function addCSSRules(text) {
	let ast = css.parse(text);
	rules.push(...ast.stylesheet.rules);
}

function match(element, selector) {
	if (!selector || !element.attributes) {
		return false;
	}

	// id元素，可选作业（实现复合选择器，实现支持空格的class选择器）01：15
	if (selector.charAt(0) == "#") {
		let attr = element.attributes.filter(attr => attr.name === "id")[0]
		if (attr && attr.value === selector.replace("#", '')) {
			return true;
		}
	} else if (selector.charAt(0) == ".") {
		let attr = element.attributes.filter(attr => attr.name === "class")[0]
		if (attr && attr.value === selector.replace(".", '')) {
			return true;
		}
	} else {
		if (element.tagName === selector) {
			return true;
		}
	}
}

function specificity(selector) {
	let p = [0, 0, 0, 0];
	let selectorParts = selector.split(" ");
	for(let part of selectorParts) {
		if (part.charAt(0) == "#") {
			p[1] += 1;
		} else if(part.charAt(0) == ".") {
			p[2] += 1;
		} else {
			p[3] += 1;
		}
	}

	return p;
}

function compare(sp1, sp2) {
	if (sp1[0] - sp2[0]) {
		return sp1[0] - sp2[0];
	}
	if (sp1[1] - sp2[1]) {
		return sp1[1] - sp2[1];
	}
	if (sp1[2] - sp2[2]) {
		return sp1[2] - sp2[2];
	}

	return sp1[3] - sp2[3];
}

function computeCss(element) {
	let elements = stack.slice().reverse();

	if (!element.computedStyle) {
		element.computedStyle = {};
	}

	for(let rule of rules) {
		let selectorParts = rule.selectors[0].split(" ").reverse();

		if (!match(element, selectorParts[0])) {
			continue;
		}

		// let matched = false;

		let j = 1;
		for (let i = 0; i < elements.length; i++) {
			if (match(elements[i], selectorParts[j])) {
				j++;
			}
		}

		if (j => selectorParts.length) {
			matched = true;
			// 匹配后加入
			if (matched) {
				// console.log("element", element, "matched rule", rule);
				let computedStyle = element.computedStyle;
				let sp = specificity(rule.selectors[0]);
				for(let declaration of rule.declarations) {
					if (!computedStyle[declaration.property]) {
						computedStyle[declaration.property] = {};
						computedStyle[declaration.property].value = declaration.value;
						computedStyle[declaration.property].specificity = sp;

						// console.log(element.computedStyle);
					} else if(compare(computedStyle[declaration.property].specificity, sp) < 0) {
						for (let k = 0; k < 4; k++) {
							computedStyle[declaration.property][declaration.value][k] += sp[k];
						}
					}
				}
			}
		}
	}
}

function emit(token) {
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

		// css 计算
		computeCss(element);
		top.children.push(element);
		// element.parent = top;

		if (!token.isSelfClosing) {
			stack.push(element);
		}

		currentTextNode = null;
	} else if(token.type == "endTag") {
		if (top.tagName != token.tagName) {
			throw new Error("Tag start end doesn't match!");
		} else {
			/******* style标签执行添加css规则操作 ********/
			if (top.tagName === "style") {
				addCSSRules(top.children[0].content);
			}
			stack.pop();
		}
		layout(top);
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
	if (c == '\"') {
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
	if (c == '\'') {
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
	// console.log(html)
	for (let c of html) {
		state = state(c);
	}
	state = state(EOF);
	// console.log(JSON.stringify(stack[0], null, " "))
	return stack[0];
}