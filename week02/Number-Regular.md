# 题目：写一个正则表达式 匹配所有 Number 直接量

- 整数
``` 
var reg = /^-?(0|[1-9]\d*)$/
reg.test(123) // true
reg.test(-456) // true
reg.test(-01)// false
```

- 浮点数
```  
var reg = /^\.\d+|(0|[1-9]\d*)\.?\d*$/
reg.test(.123) // true
reg.test(456.231) // true
```

- 二进制
```

```

- 八进制
```  ```

- 十六进制
```  ```

- 正负号科学计数法
```  ```


- 整合