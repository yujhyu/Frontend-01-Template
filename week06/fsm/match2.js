// 在一个字符串中，找到字符”ab”
function match(string) {
	let foundA = false;
	for (let str of string) {
		if (str == "a")
			foundA =  true;
		else if (foundA == "b")
			return true;
	}
}
match("I abm jhyu")