# 每周总结可以写在这里

## 总结
这期主要学习 DOM API，记录了一些可能会用到的API，后续API会整理到脑图中。

## 不常用标签记录
- <samp> 元素用于标识计算机程序输出
- <dfn> 元素标记了被定义的术语
- <cite> 表示一个作品的引用
  
## dom导航类操作
- parentNode 父
- childNodes 子 （及时改变）
- firstChild 第一
- lastchild 最后
- nextSibling 下一个
- previousSibling 上一个

## dom修改操作 （当元素做插入操作时，dom自动会移除掉原有元素）
- appendchild 插入至后
- insertBefore 插入至前
- removeChild 移除
- replacechild 替换
****
## dom高级操作
- compareDocumentPosition 用于比较两个节点中关系的函数
- contains 检查一个节点是否包含另一个节点的函数
- isEqualNode 检查两个节点是否完全相同
- isSameNode 检查两个节点是否同一个节点，实际上在javascript中可以用 === 。
- cloneNode 复制一个节点，如果传入参数true，则会连同子元素做深拷贝。

## Range API
- setStart 设置起点
- setEnd 设置终点
- getSelection.getRangeAt  获取Range对象
- setStartBefore 以其它节点为基准,设置起点
- setStartAfter 以其它节点为基准,设置起点
- setEndBefore 以其它节点为基准,设置终点
- setEndAfter 以其它节点为基准,设置终点
- selectNode 使 Range 包含某个节点及其内容
- selectNodeContents 使 Range 包含某个节点的内容
- collapse 将 Range 折叠至其端点（boundary points，起止点，指起点或终点，下同）之一
- extractContents 把 Range 的内容从文档树移动到一个文档片段中
- insertNode 在 Range 的起点处插入一个节点

## CSSOM
- document.styleSheets
  - Rules
    - cssRules
    - insertRule
    - removeRule