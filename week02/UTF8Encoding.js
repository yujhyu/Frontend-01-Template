/**
 * @param {*} str 
 * @returns {String}
 */
function UTF8Encoding(str) {
	return Array.from(str).map(s => toUnicode(s));
}

/**
 * @param {*} str 
 * @returns {String}
 */
function toUnicode(str) {

	return console.log(str.charCodeAt().toString(2));
}

UTF8Encoding('严')