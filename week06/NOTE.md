# 每周总结可以写在这里
## 有限状态机
* 每一个状态机都是一个机器
  - 机器可以计算、存储、输出
  - 机器接收的输入时一致的
  - 状态机的每一个机器本身没有状态，如果用函数来表示的话，它是纯函数（无副作用）
  
* 每一个机器知道下一个状态 
  - 每个机器都有确定的下一个状态（Moore）
  - 每个机器根据输入决定下一个状态（Mealy）

## JS中的有限状态机（Mealy）
```
//每个函数是一个``状态
function state(input)//函数参数就是输入
{
    //在函数中，可以自由地编写代码，处理每个状态的逻辑
    return next;//返回值作为下一个状态
}

/////////以下是调用//////////
while(input){//获取输入
    state=state(input);//把状态机的返回值作为下一个状态
}
```

## HTML的解析
  - URL
    - HTTP
  - HTML
    - parse
  - DOM
    - css
    - computing
  - DOM with CSS
    - layout
  - DOM with position
    - render
  - Bitmap

## HTML解析步骤
- 拆分文件
- 创建状态机
- 解析标签
- 创建元素
- 处理属性
- 构建DOM树
- web本节点

