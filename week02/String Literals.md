# 正则匹配所有字符串直接量，单引号和双引号

> ## EscapeSequence :: 
> - CharacterEscapeSequence
> - LegacyOctalEscapeSequence 
> - HexEscapeSequence 
> - UnicodeEscapeSequence

> ## LegacyOctalEscapeSequence ::
> - OctalDigit [lookahead ∉ OctalDigit]
> - ZeroToThree OctalDigit [lookahead ∉ OctalDigit] 
> - FourToSeven OctalDigit
> - ZeroToThree OctalDigit OctalDigit
> ``

> ## ZeroToThree :: one of 
> 0 1 2 3  
> `/^[0123]$/`

> ## FourToSeven :: one of 
> 4 5 6 7
> `/^[4567]$/`

> ## StringLiteral ::
> - " DoubleStringCharacters<sup>(opt)</sup> " 
> - ' SingleStringCharacters<sup>(opt)</sup> '

> ## DoubleStringCharacters ::
> - DoubleStringCharacter DoubleStringCharacters<sup>(opt)</sup>

> ## SingleStringCharacters ::
> - SingleStringCharacter SingleStringCharacters<sup>(opt)</sup>

> ## DoubleStringCharacter ::
> - SourceCharacter but not one of " or \ or LineTerminator \<LS\>
> - \<PS\>
> - \\ EscapeSequence
> - LineContinuation

> ## SingleStringCharacter ::
> - SourceCharacter but not one of ' or \ or LineTerminator \<LS\>
> - \<PS\>
> - \\ EscapeSequence
> - LineContinuation

> ## LineContinuation ::
> - \\ LineTerminatorSequence

> ## EscapeSequence :: 
> - CharacterEscapeSequence
> - 0 [lookahead ∉ DecimalDigit]
> - HexEscapeSequence 
> - UnicodeEscapeSequence

> ## CharacterEscapeSequence :: 
> - SingleEscapeCharacter
> - NonEscapeCharacter

> ## SingleEscapeCharacter :: one of
> ' " \ b f n r t v

> ## NonEscapeCharacter ::
> - SourceCharacter but not one of EscapeCharacter or LineTerminator

> ## EscapeCharacter :: 
> - SingleEscapeCharacter
> - DecimalDigit
> - x 
> - u

> ## HexEscapeSequence ::
> - x HexDigit HexDigit

> ## UnicodeEscapeSequence :: 
> - u Hex4Digits
> - u{ CodePoint } `/^u\{\}$/`

> ## CodePoint ::
> - HexDigits but only if MV of HexDigits ≤ 0x10FFFF

> - Hex4Digits ::
> - HexDigit HexDigit HexDigit HexDigit
> `/^[0-9a-fA-F]{4}$/`

> ## HexDigit :: one of 
> 0 1 2 3 4 5 6 7 8 9 a b c d e f A B C D E F