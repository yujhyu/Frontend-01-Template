// 在一个字符串中，找到字符”abcdef”
function match(string) {
	let foundA = false,
        foundB = false,
        foundC = false,
        foundD = false,
        foundE = false;
    
	for (let str of string) {
		if (str == "a")
			foundA = true;
		else if (str == "b")
			foundB = true;
        else if (str == "c")
			foundC = true;
        else if (str == "d")
			foundD = true;
        else if (str == "e")
			foundE = true;
        else if (str == "f")
			return true;
        else 
            foundA = false;
            foundB = false;
            foundC = false;
            foundD = false;
            foundE = false;
            foundF = false;
	}
}
console.log(match("I abcdef jhyu"))