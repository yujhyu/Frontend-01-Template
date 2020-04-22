/**
 * @param {*} str 
 * @returns {String}
 */
function UTF8Encoding(str) {
	return Array.from(str).map(s => toUtf8(s));
}

/**
 * @param {*} str 
 * @returns {String}
 */
function toUtf8(str) {
	let binary = str.charCodeAt().toString(2);

	if (binary.length < 8) {
		return binary.padStart(8, '0');
	}

	const headers = ['0', '110', '1110', '11110'];
  const arr = [];
  for (let end = binary.length; end > 0; end -= 6) {
    const sub = binary.slice(Math.max(end - 6, 0), end);

    if (sub.length === 6) {
      arr.unshift(`10${sub}`);
    } else {
      const header = headers[arr.length];
      arr.unshift(`${header}${sub.padStart(8 - header.length, '0')}`);
    }
  }
  return arr.join(' ');
}

console.log(UTF8Encoding('严'))