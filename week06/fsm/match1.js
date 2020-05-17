// 在一个字符串中，找到字符”a”
function match(string) {
	for (let str of string) {
		if (str == "a")
			return true;
	}
}
match("I am jhyu")
