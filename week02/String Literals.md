# 正则匹配所有String直接量，单引号和双引号

> ## StringLiteral ::
> - " DoubleStringCharacters<sup>(opt)</sup> " 
> - ' SingleStringCharacters<sup>(opt)</sup> '

> ## DoubleStringCharacters ::
> - DoubleStringCharacter DoubleStringCharacters<sup>(opt)</sup>

> ## SingleStringCharacters ::
> - SingleStringCharacter SingleStringCharacters<sup>(opt)</sup>

> ## DoubleStringCharacter ::
> - SourceCharacter but not one of " or \ or LineTerminator `/^[^"\\\n\r\u2028\u2029]$/` 
> - \<LS\> `/^\u2028$/`
> - \<PS\> `/^\u2029$/`
> - \\ EscapeSequence `/^\\(u([0-9a-fA-F]{4}|\{(10|0?[0-9a-fA-F])[0-9a-fA-F]{0,4}\})|x[0-9a-fA-F]{2}|0(?!=\d)|[^\n\r\u2028\u2029\dxu])$/u` 
> - LineContinuation `/^\\(\n|\r\n?|\u2028|\u2029)$/u`

> ## SingleStringCharacter ::
> - SourceCharacter but not one of ' or \ or LineTerminator `/^[^"\\\n\r\u2028\u2029]$/` 
> - \<LS\> `/^\u2028$/`
> - \<PS\> `/^\u2029$/`
> - \\ EscapeSequence `/^\\(u([0-9a-fA-F]{4}|\{(10|0?[0-9a-fA-F])[0-9a-fA-F]{0,4}\})|x[0-9a-fA-F]{2}|0(?!=\d)|[^\n\r\u2028\u2029\dxu])$/u`
> - LineContinuation `/^\\(\n|\r\n?|\u2028|\u2029)$/u`

> ## LineTerminator :: 
> - \<LF\> `/^\u000A$/`
> - \<CR\> `/^\u000D$/`
> - \<LS\> `/^\u2028$/`
> - \<PS\> `/^\u2029$/`

> ## LineTerminatorSequence :: 
> - \<LF\>
> - \<CR\>[lookahead ≠ \<LF\>] 
> - \<LS\>
> - \<PS\>
> - \<CR\>\<LF\>

> ## LineContinuation ::
> - \\ LineTerminatorSequence
> `/^\\(\n|\r\n?|\u2028|\u2029)$/u`

> ## EscapeSequence :: 
> - CharacterEscapeSequence ``
> - 0 [lookahead ∉ DecimalDigit] ``
> - HexEscapeSequence `/^x[0-9a-fA-F]{2}$/`
> - UnicodeEscapeSequence ``

> ## CharacterEscapeSequence :: 
> - SingleEscapeCharacter `/^['"\bfnrtv]$/`
> - NonEscapeCharacter

> ## SingleEscapeCharacter :: one of
> ' " \ b f n r t v
> `/^['"\bfnrtv]$/`

> ## NonEscapeCharacter ::
> - SourceCharacter but not one of EscapeCharacter or LineTerminator

> ## EscapeCharacter :: 
> - SingleEscapeCharacter
> - DecimalDigit
> - x 
> - u

> ## HexEscapeSequence ::
> - x HexDigit HexDigit
> `/^x[0-9a-fA-F]{2}$/`

> ## UnicodeEscapeSequence :: 
> - u Hex4Digits `/^u[0-9a-fA-F]{4}$/`
> - u{ CodePoint } `/^u\{(10|0?[0-9a-fA-F])[0-9a-fA-F]{0,4}\}$/`

> ## CodePoint ::
> - HexDigits but only if MV of HexDigits ≤ 0x10FFFF
> `/^\u{0}-\u{10FFFF}$/`

> - Hex4Digits ::
> - HexDigit HexDigit HexDigit HexDigit
> `/^[0-9a-fA-F]{4}$/`

> ## HexDigit :: one of 
> 0 1 2 3 4 5 6 7 8 9 a b c d e f A B C D E F

> ## DecimalDigit :: one of
> 0 1 2 3 4 5 6 7 8 9  
> `/^\d$/`