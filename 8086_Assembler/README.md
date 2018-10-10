This basically returns the binary values and hex codes for a number of 8086 mnemonics.

It was an undergraguate project that we collated as one file, so a big thanks to everyone in our year that contributed to this repo: github.com/Ruyione/EIE411-8086-Assembler

Note:
The CMP command handles all possibiities for CMP(compare) except register/memory and register.
For other commands that require the use of memmory, use "M" in place of the memory location e.g [009h]

Some answers aren't accurate, not everyone takes assignment seriously, so don't rely 100% on this.

The list of 8086 instructions are:
-ADD    -AAM    -SCASW  -LOOPE  -LODSW  -JNS    -JNGE   -RET
-AAS    -IN     -JMP    -JBE    -JG     -JO     -JL
-CLC    -CALL   -INC    -NEG    -INT    -JNG    -CMPSW
-SBB    -CLD    -JO     -JAE    -INTO   -JPO    -CMP
-JNC    -JCXZ   -JLE    -DAS    -MOVSB  -JNE    -REPE
-DEC    -IRET   -HLT    -JB     -JA     -LES    -CLC
-LODSB  -IMUL   -JE     -LOOPNE -JGE    -NOP    -PUSHF
-LDS    -JNLE   -CWD    -SAR    -NOT    -CBW    -JPE
-AAD    -JNZ    -MUL    -JNAE   -JNBE   -JNA    -LEA
-JNBE   -JP     -DAA    -JNO    -JNL    -POP    -DIV

Thank you for trying out our Assembler!