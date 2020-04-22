# 正则匹配所有 Number 直接量

> ## NumericLiteral ::
> - DecimalLiteral
> - BinaryIntegerLiteral 
> - OctalIntegerLiteral 
> - HexIntegerLiteral  
`/^\.\d?|((0|[1-9]\d*)\.\d*)([eE][+\-]?\d+)?$|^0[bB][01]+$|^0[oO][0-7]$|^0[xX][0-9a-fA-F]+$/`

> ## DecimalLiteral ::
> - DecimalIntegerLiteral . DecimalDigits <sup>(opt)</sup> ExponentPart <sup>(opt)</sup> 
> - . DecimalDigits ExponentPart <sup>(opt)</sup>
> - DecimalIntegerLiteral ExponentPart <sup>(opt)</sup>  
`/^\.\d?|((0|[1-9]\d*)\.\d*)([eE][+\-]?\d+)?$/`

> ## DecimalIntegerLiteral :: 
> - 0
> - NonZeroDigit DecimalDigits<sup>(opt)</sup>  
`/^0|[1-9]\d*$/`

> ## DecimalDigits :: 
> - DecimalDigit
> - DecimalDigits DecimalDigit  
`/^\d+$/`

> ## DecimalDigit :: one of
> 0 1 2 3 4 5 6 7 8 9  
> `/^\d$/`

> ## NonZeroDigit :: one of
> 1 2 3 4 5 6 7 8 9  
> `/^[1-9]$/`

> ## ExponentPart ::
> ExponentIndicator SignedInteger
> `/^[eE][+\-]?\d+$/`

> ## ExponentIndicator :: one of 
> e E
> `/^[eE]$/`

> ## SignedInteger :: 
> - DecimalDigits
> - \+ DecimalDigits
> - \- DecimalDigits
> `/^[+\-]?\d+$/`

> ## BinaryIntegerLiteral :: 
> - 0b BinaryDigits 
> - 0B BinaryDigits  
> `/^0[bB][01]+$/`

> ## BinaryDigits :: 
> - BinaryDigit
> - BinaryDigits BinaryDigit  
> `/^[01]$/`

> ## BinaryDigit :: one of
> 0 1

> ## OctalIntegerLiteral :: 
> - 0o OctalDigits 
> - 0O OctalDigits  
> `/^0[oO][0-7]$/`

> ## OctalDigits :: 
> - OctalDigit
> - OctalDigits OctalDigit
> > `/^[0-7]+$/`

> ## OctalDigit :: one of
> 0 1 2 3 4 5 6 7  
> `/^[0-7]$/`

> ## HexIntegerLiteral :: 
> - 0x HexDigits 
> - 0X HexDigits  
> `/^0[xX][0-9a-fA-F]+$/`

> ## HexDigits ::
> - HexDigit
> - HexDigits HexDigit  
> `/^[0-9a-fA-F]$/`

> ## HexDigit :: one of 
> 0 1 2 3 4 5 6 7 8 9 a b c d e f A B C D E F