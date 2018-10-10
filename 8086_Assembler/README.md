This basically returns the binary values and hex codes for a number of 8086 mnemonics.

It was an undergraguate project that I collated as one file, so a big thanks to everyone that contributed to this repo: github.com/Ruyione/EIE411-8086-Assembler

Note:
The CMP command handles all possibiities for CMP(compare) except register/memory and register.
For other commands that require the use of memmory, use "M" in place of the memory location e.g [009h]

Some answers aren't accurate, not everyone takes assignment seriously, so don't rely 100% on this.

The list of 8086 instructions are:
-ADD    -AAM    -SCASW  -LOOPE  -LODSW
-AAS    -IN     -JMP    -JBE    -JG
-CLC    -CALL   -INC    -NEG    -INT
-SBB    -CLD    -JO     -JAE    -INTO
-JNC    -JCXZ   -JLE    -DAS    -MOVSB
-DEC    -IRET   -HLT    -JB
-LODSB  -IMUL   -JE     -LOOPNE
-LDS    -JNLE   -CWD    -SAR
-AAD    -JNZ    -MUL    -JNAE
-JNBE   -JP     -DAA    -JNO

Thank you for trying out our Assembler!