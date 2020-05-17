// 在一个字符串中，找到字符”abcdef” 代码改进
function match(string) {
	let state = start;
		
	for (let str of string) {
		state = state(str);
	}

	return state === end;
}

function start(str) {
	if (str === "a")
		return foundA;
	else 
		return start;
}

function end(str) {
	return end;
}

function foundA(str) {
	if (str === "b")
		return foundB;
	else 
		return start;
}

function foundB(str) {
	if (str === 'c')
		return foundC;
	else 
		return start;
}

function foundC(str) {
	if (str === "d")
		return foundD;
	else 
		return start;
}

function foundD(str) {
	if (str === "e")
		return foundE;
	else 
		return start;
}

function foundE(str) {
	if (str === "f")
		return end;
	else 
		return start;
}

console.log(match("I abcdefm jhyu"))