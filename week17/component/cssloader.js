let css = require("css");

module.exports = function (source, map) {
	let styleSheet = css.parse(source);
	let name = this.resourcePath.match(/([^/]+).css$/)[1];

	for (let rule of styleSheet.stylesheet.rules) {
		rule.selectors = rule.selectors.map(selector => 
			selector.match(new RegExp(`^.${name}`)) ? selector : `.${name} ${selector}`
		);
	}

	// console.log(JSON.stringify(css.stringify(styleSheet)))

	// 插入css
	return `
	let style = document.createElement("style");
	style.innerHTML = ${JSON.stringify(css.stringify(styleSheet))};
	document.documentElement.appendChild(style);
	`;
}