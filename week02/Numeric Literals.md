# NumericLiteral

## NumericLiteral :: 
> - DecimalLiteral
> - BinaryIntegerLiteral 
> - OctalIntegerLiteral 
> - HexIntegerLiteral    
``` code ```

## DecimalLiteral ::
> - DecimalIntegerLiteral . DecimalDigits (opt) ExponentPart (opt) 
> -  . DecimalDigits ExponentPart (opt)
> - DecimalIntegerLiteral ExponentPart (opt)  
``` code ```

## DecimalIntegerLiteral :: 
> - 0
> - NonZeroDigit DecimalDigitsopt    
``` cdoe ```

## DecimalDigits :: 
> - DecimalDigit
> - DecimalDigits DecimalDigit   
``` cdoe ```

## DecimalDigit :: one of
> 0 1 2 3 4 5 6 7 8 9  
> ``` cdoe ```

## NonZeroDigit :: one of
> 1 2 3 4 5 6 7 8 9  
> ``` cdoe ```

## ExponentPart ::
> ExponentIndicator SignedInteger

## ExponentIndicator :: one of 
> e E
> ``` cdoe ```

## SignedInteger :: 
> - DecimalDigits
> - \+ DecimalDigits
> - \- DecimalDigits

## BinaryIntegerLiteral :: 
> - 0b BinaryDigits 
> - 0B BinaryDigits
> 
## BinaryDigits :: 
> - BinaryDigit
> - BinaryDigits BinaryDigit 

## BinaryDigit :: one of
> 0 1

## OctalIntegerLiteral :: 
> - 0o OctalDigits 
> - 0O OctalDigits

## OctalDigits :: 
> - OctalDigit
> - OctalDigits OctalDigit 
> 
## OctalDigit :: one of
> 0 1 2 3 4 5 6 7
> 
## HexIntegerLiteral :: 
> - 0x HexDigits 
> - 0X HexDigits

## HexDigits :: 
> - HexDigit
> - HexDigits HexDigit 

## HexDigit :: one of
> 0 1 2 3 4 5 6  7 8 9  a b c d e f A B  C D E F