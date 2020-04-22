# 第二周 第一课 作业
## 编写带括号的四则运算产生式(BNF)
```
数字
<Number> = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9"

十进制数
<DecimalNumber> = "0" | (("1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9") <Number>* )

加法
<Expression> = <DecimalNumber> "+" <DecimalNumber>
加法连加-递归
<Expression> = <Expression> "+" <DecimalNumber>
加法组合简写
<AddtiveExpression> = <DecimalNumber> | <Expression> "+" <DecimalNumber>

减法
<Expression> = <DecimalNumber> "-" <DecimalNumber>
减法连减
<Expression> = <Expression> "-" <DecimalNumber>
减法组合简写
<SubtractionExpression> = <DecimalNumber> | <Expression> "-" <DecimalNumber>

乘法
<Expression> = <DecimalNumber> "*" <DecimalNumber>
乘法连乘
<Expression> = <Expression> "*" <DecimalNumber>
乘法组合简写
<MultiplicativeExpression> = <DecimalNumber> | <Expression> "*" <DecimalNumber>

除法
<Expression> = <DecimalNumber> "/" <DecimalNumber>
除法连除
<Expression> = <Expression> "/" <DecimalNumber>
除法组合简写
<DivisionExpression> = <DecimalNumber> | <Expression> "/" <DecimalNumber>

四则运算 1 + 2 * 3 
<Expression> = <MultiplicativeExpression> | <AddtiveExpression> "+" <MultiplicativeExpression>

复合组合写法 (根据优先级从上至下)
<PrimaryExpression> = <DecimalNumber> |
    "(" <LogiclExpression> ")"

<MultiplicativeExpression> = <DecimalNumber> |
    <MultiplicativeExpression> "*" <DecimalNumber> |
    <MultiplicativeExpression> "/" <DecimalNumber>

<AddtiveExpression> = <DecimalNumber> |
    <AddtiveExpression> = "+" <DecimalNumber> |
    <AddtiveExpression> = "-" <DecimalNumber>

<LogiclExpression> = <AddtiveExpression> |
    <LogiclExpression> "||" <AddtiveExpression> |
    <LogiclExpression> "&&" <AddtiveExpression> |

```
- 尽可能寻找你知道的计算机语言，尝试把它们分类