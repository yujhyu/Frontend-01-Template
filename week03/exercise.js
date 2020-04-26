// 二进制 123、八进制 0x1011、十进制 0b1011、16进制 0o1011、1e1 科学计数法
/**
 * 字符串转数字
 * @param {*} string 传入字符串
 * @param {*} x 转换位数
 */
function converStringToNumber(string, x) {
	// 不传换位数，默认为进制
	if (arguments.length < 2) {
		x = 10;
	}

	var chars = string.split(''); // 先拆分为数组
	var number = 0;
	var i = 0;

	// 整数
	while (i < chars.length && chars[i] != '.') {
		number = number * x;
		number += chars[i].codePointAt(0) - '0'.codePointAt(0);
		i++;
	}

	// 小数
	if (chars[i] === '.') {
		i++;
	}

	var fraction = 1;
	while (i < chars.length) {
		fraction = fraction / x;
		number += (chars[i].codePointAt(0) - '0'.codePointAt(0)) * fraction;
		i++;
	}

	return number;
}

// console.log(converStringToNumber('100.0123'));

/**
 * 数字转字符串
 * @param {*} number 数字
 * @param {*} x 进制
 */
function converNumberToString(number, x) {
	// 不传换位数，默认为进制
	if (arguments.length < 2) {
		x = 10;
	}

	// 整数
	var integer = Math.floor(number);
	var fraction = number - integer;
	var str = '';

	// 整数部分不为0取最后一位
	while (integer > 0) {
		str = String(integer % x) + str; 
		integer = Math.floor(integer / x);
	}

	return str;
}

console.log(converNumberToString(100.0123));