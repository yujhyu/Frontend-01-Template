// 在一个字符串中，找到字符”abababx”
function match(string) {
	let state = start;
		
	for (let str of string) {
		console.log(str)
		state = state(str);
	}

	return state === end;
}

function start(str) {
	if (str === "a")
		return foundA1;
	else 
		return start;
}

function end(str) {
	return end;
}

function foundA1(str) {
	if (str === "b")
		return foundB1;
	else 
		return start(str);
}

function foundB1(str) {
	if (str === 'a')
		return foundA2;
	else 
		return start(str);
}

function foundA2(str) {
	if (str === "b")
		return foundB2;
	else 
		return start(str);
}

function foundB2(str) {
	if (str === "a")
		return foundA3;
	else 
		return start(str);
}

function foundA3(str) {
	if (str === "b")
		return foundB3;
	else 
		return start(str);
}

function foundB3(str) {
	if (str === "x")
		return end;
	else 
		return start(str);
}

console.log(match("abababx 999"))