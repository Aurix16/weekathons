/*

Title:      8086 Instruction Assembler
Version:    1.0.0

*/

$(document).ready(function(){
    
    
    /*8086 CODE*/
    //Defining input and output fields
    
    var binF = $("#binField"),
        hexF = $("#hexField"),
        errF = $("#errorField"),
        codeF = $("#codeField");
    
    
    //HTML SNIPS
    $('#codes ul li').click(function(){
        var code = $(this).text();
        
        stripped = code.replace("> ","").trim();
        codeF.val(stripped);
        codeF.focus();
    });
    
    //Functions
    
    function resetAll(){
        $("#codeField").val("");
        $("#binField").text(" ");
        $("#hexField").text(" ");
        $("#errorField").text(" ");
    }
    
    function resetRes(){
        $("#binField").text(" ");
        $("#hexField").text(" ");
        $("#errorField").text(" ");
    }
    
    function assignReg(a){
        var binReg;
            if (a == "AL" || a == 'AX' || a == "al" || a == 'ax'){
                binReg = "000";
                return binReg;
            } else if (a == "CL" || a == "CX" || a == "cl" || a == "cx"){
                binReg = "001";
                return binReg;
            } else if (a == "DL" || a == "DX" || a == "dl" || a == "dx"){
                binReg = "010";
                return binReg;
            } else if (a == "BL" || a == "BX" || a == "bl" || a == "bx"){
                binReg = "011";
                return binReg;
            } else if (a == "SP" || a == "AH" || a == "sp" || a == "ah"){
                binReg = "100";
                return binReg;
            } else if (a == "BP" || a == "CH" || a == "bp" || a == "ch"){
                binReg = "101";
                return binReg;
            } else if (a == "SI" || a == "DH" || a == "si" || a == "dh"){
                binReg = "110";
                return binReg;
            } else if(a == "DI" || a == "BH" || a == "di" || a == "bh"){
                binReg = "111";
                return binReg;
            }else{
                return "Register Error";
        }
    }
    
    function errorMsg(msg){
        resetRes();
        errF.text(msg);
    }
    
    function BinToHex(bin){
        hex = parseInt(bin, 2).toString(16);
        t_hex = parseInt(hex);
        
        if (t_hex <= 9 && t_hex >= 0){
            hex = "0"+hex;
        }else{
            hex = hex;
        }
        return hex;
    }
    
    function addZero(operand){
        var zero = "";
        g = operand.length;
        
        while(g<4){ // Add zeros before incomplete operands
            zero += "0";
            g++;
        }
        operand = zero+operand;
        
        return operand;
    }
    
    function HexToBin(hex){
        var bin = parseInt(hex, 16).toString(2),
            zero = "",
        g = bin.length;
        h = hex.length;
        if (h == 2){
            while(g<8){ // Add zeros before incomplete operands
                zero += "0";
                g++;
            }
            bin = zero+bin;
            return bin;
        }else{
            while(g<4){ // Add zeros before incomplete operands
                zero += "0";
                g++;
            }
            bin = zero+bin;
            return bin;
        }
        
    }
    
    // Clear the Board
    $("#resetBtn").click(function(){
        resetAll();
    });
    
    // Trigger "Convert" on Enter
    codeF.keypress(function(){
       if (event.keyCode == 13){
           $("#goCodeBtn").click();
       }     
    });
    // Begin
    $("#goCodeBtn").click(function(){
        resetRes(); //Reset Results Field
        
        var code = codeF.val(); // Get instruction from user    

        if (code.search(/ADD/i) >=0){
            add(code);
        }else if(code.search(/AAS/i) >=0){
            aas(code);
        }else if(code.search(/CLC/i) >=0){
            clc(code);
        }else if(code.search(/SBB/i) >=0){
            sbb(code);
        }else if(code.search(/JNC/i) >=0){
            partA = code.split(",");
            jnc(partA[0],partA[1]);
        }else if(code.search(/DEC/i) >=0){
            dec(code);
        }else if(code.search(/LDS/i) >=0){
            lds(code);
        }else if(code.search(/LODSB/i) >=0){
            lodsb(code);
        }else if(code.search(/AAD/i) >=0){
            aad(code);
        }else if(code.search(/JNB/i) >=0){
            diff_jnb(code);
        }else if(code.search(/AAM/i) >=0){
            aam(code);
        }else if(code.search(/IN/i) >=0){
            diff_in(code);
        }else if(code.search(/CALL/i) >=0){
            partA = code.split(",");
            call(partA[0],partA[1]);
        }else if(code.search(/CLD/i)>=0){
            cld(code);
        }else if(code.search(/JCXZ/i)>=0){
            jcxz(code);
        }else if(code.search(/IRET/i)>=0){
            iret(code);
        }else if(code.search(/IMUL/i)>=0){
            imul(code);
        }else if(code.search(/JNL/i)>=0){
            diff_jnl(code);
        }else if(code.search(/JNZ/i)>=0){
            jnz(code);
        }else if(code.search(/JP/i)>=0){
            partA = code.split(",");
            jp(partA[0],partA[1]);
        }else if(code.search(/SCAS/i)>=0){
            scasw(code);
        }else if(code.search(/JMP/i)>=0){
            partA = code.split(",");
            jmp(partA[0],partA[1]);
        }else if(code.search(/JO/i)>=0){
            partA = code.split(",");
            jo(partA[0],partA[1]);
        }else if(code.search(/JLE/i)>=0){
            partA = code.split(",");
            jle(partA[0],partA[1]);
        }else if(code.search(/HLT/i)>=0){
            hlt(code);
        }else if(code.search(/JE/i)>=0){
            partA = code.split(",");
            je(partA[0],partA[1]);
        }else if(code.search(/CWD/i)>=0){
            cwd(code);
        }else if(code.search(/DAA/i)>=0){
            daa(code);
        }else if(code.search(/MUL/i)>=0){
            mul(code);
        }else if(code.search(/LOOPE/i)>=0){
            partA = code.split(",");
            loope(partA[0],partA[1]);
        }else if(code.search(/JBE/i)>=0){
            partA = code.split(",");
            jbe(partA[0],partA[1]);
        }else if(code.search(/NEG/i)>=0){
            neg(code);
        }else if(code.search(/JA/i)>=0){
            diff_ja(code);
        }else if(code.search(/DAS/i)>=0){
            das(code);
        }else if(code.search(/JB/i)>=0){
            partA = code.split(",");
            jb(partA[0],partA[1]);
        }else if(code.search(/LOOPNE/i)>=0){
            partA = code.split(",");
            loopne(partA[0],partA[1]);
        }else if(code.search(/JE/i)>=0){
            partA = code.split(",");
            je(partA[0],partA[1]);
        }else if(code.search(/JNG/i)>=0){
            diff_jng(code);
        }else if(code.search(/SAR/i)>=0){
            sar(code);
        }else if(code.search(/JNA/i)>=0){
            diff_jna(code);
        }else if(code.search(/JNO/i)>=0){
            partA = code.split(",");
            jno(partA[0],partA[1]);
        }else if(code.search(/LODSW/i)>=0){
            lodsw(code);
        }else if(code.search(/JG/i)>=0){
            diff_jg(code);
        }else if(code.search(/MOVSB/i)>=0){
            movsb(code);
        }else if(code.search(/NOT/i)>=0){
            not(code);
        }else if(code.search(/JNS/i)>=0){
            partA = code.split(",");
            jns(partA[0],partA[1]);
        }else if(code.search(/JO/i)>=0){
            partA = code.split(",");
            jo(partA[0],partA[1]);
        }else if(code.search(/JPO/i)>=0){
            partA = code.split(",");
            jpo(partA[0],partA[1]);
        }else if(code.search(/JZ/i)>=0){
            partA = code.split(",");
            jz(partA[0],partA[1]);
        }else if(code.search(/MOVSW/i)>=0){
            movsw(code);
        }else if(code.search(/JNE/i)>=0){
            jne(code);
        }else if(code.search(/LES/i)>=0){
            les(code);
        }else if(code.search(/NOP/i)>=0){
            nop(code);
        }else if(code.search(/CBW/i)>=0){
            cbw(code);
        }else if(code.search(/POP/i)>=0){
            pop(code);
        }else if(code.search(/JL/i)>=0){
            partA = code.split(",");
            jl(partA[0],partA[1]);
        }else if(code.search(/CMP/i)>=0){
            diff_cmp(code);
        }else if(code.search(/REPE/i)>=0){
            repe(code);
        }else if(code.search(/CLI/i)>=0){
            cli(code);
        }else if(code.search(/PUSHF/i)>=0){
            pushf(code);
        }else if(code.search(/JPE/i)>=0){
            partA = code.split(",");
            jpe(partA[0],partA[1]);
        }else if(code.search(/LEA/i)>=0){
            lea(code);
        }else if(code.search(/DIV/i)>=0){
            div(code);
        }else if(code.search(/RET/i)>=0){
            ret(code);
        }else {
            errorMsg("Sorry this Assembler Can't find this Instruction Set.");
        }
    });

    function ret(code){
        var DAS;
        var x  = code;
            if (isNaN(x)  && x == "RET" || x == "ret") {
                var num = 195;
                // var char = num.length(8);
                var bin = num.toString(2);
                var hex = num.toString(16);
                binF.text('00 '+bin);
                hexF.text(hex);
            
            }else{
                errorMsg("INVALID!!  Please Enter a valid RET instruction set");
            }
    }

    function div(code){
        // this collects the instruction
        function assemble() {
            var instr = code;
            return instr;   
        }

        // all my error functions will go here
        function error(){
            var checkInstr = assemble();
            if (checkInstr == ""){
                errorMsg("Please type an instruction");
            }else{
                var mnemonic = checkInstr.substring(0,3);
                var checkDiv = mnemonic.toUpperCase();
                    if ( checkDiv != "DIV"){
                        errorMsg("Enter the right DIV command");
                    }
            }
        }

        // this function sets the mod
        function setMod(){
            error();
            var checkInstr = assemble();
            
            var instrArray = checkInstr.split(" ");
            var sqbr = instrArray[1].substring(0,1);
            var sqbr2 = instrArray[2].substring(0,1);
            var mnem = instrArray[0];
            var op1 = instrArray[1].substring(0,2); // because of the comma.
            var operand1= op1.toUpperCase();
            var operand2 = instrArray[2].toUpperCase();
            
            if(sqbr == "["){ 
                errorMsg("Operand 1 cannot begin with '[' ");
            }else if(sqbr2 == "["){
                var mod="00";
                    if(operand1 == "AX"){
                        var word ="1";
                    }else if (operand1 == "AL"){
                        var word ="0";
                    }else{
                        errorMsg("Operand 1 must be an accumulator register");
                    }
                var binStr = "1111011" + word + mod; 
            }else {
                var sixteen_bit = ["AX", "BX", "CX", "DX", "SP", "BP", "DI", "SI"];
                var eight_bit = ["AL", "BL", "CL", "DL", "AH", "BH", "CH", "DH"];
                
                // checks to see if operands are registers  
                function check(operand){
                    var pos16 = sixteen_bit.indexOf(operand);	 
                    var pos8 = eight_bit.indexOf(operand);	
                        if (pos16 >= 0){
                            var w = 1; 
                        }
                        else if(pos8 >= 0){
                            var w =0;
                        }
                        else{
                            errorMsg("Invalid DIV Operands");
                        }
                        return w;
                    }
                
                        //stops the program if operand is not an accumulator register
                        try{
                        if(operand1 != "AX" &&  operand1 != "AL" ){
                            throw "Err1";
                            }
                        }catch(er){
                            if(er=="Err1"){
                                errorMsg("Operand 1 must be an accumulator register");
                                }
                        }

                    // sets w=1 if registers are 16bit & W=0 if registers are 8bit 
                    var checkOperand1 = check(operand1);
                    var checkOperand2 = check(operand2);

                        if(checkOperand1 == 1 && checkOperand2 == 1){
                            var word = "1";
                            var mod = "11";  
                        }else if(checkOperand1 == 0 && checkOperand2 == 0){
                            var word = "0";
                            var mod = "11";  
                        }else{
                            errorMsg("Error: To solve this error, check your registers");
                        }//end else
                var binStr = "1111011" + word + mod;
            } //end else

            var setModReturn = [operand2, binStr, sqbr2];
            return setModReturn;
        }
        // end of setMod function.

        function reg(){
            var checkInstr = assemble();
            var setModReturn = setMod();
            operand2 = setModReturn[0];

            if(operand2 =="CX" || operand2 =="CL"){
                var rm = "001";
            }else if(operand2 =="DX" || operand2 =="DL"){
                var rm="010";
            }else if(operand2 =="BX" || operand2 =="BL"){
                var rm="011";
            }else if(operand2 =="SP" || operand2 =="AH"){
                var rm="100";
            }else if(operand2 =="BP" || operand2 =="CH"){
                var rm="101";
            }else if(operand2 =="SI" || operand2 =="DH"){
                var rm="110";
            }else if(operand2 =="DI" || operand2 =="BH"){
                var rm="111";
            }else{
                errorMsg("Invalid Combination, Operand 1 must be accumulator register");
            }

            var binStr = setModReturn[1];
            var binStr = binStr +"110"+ rm ;
            return binStr;
        }
        // calculates r/m when both operands are registers

        function rSlashM(){
            var checkInstr = assemble();
            var setModReturn = setMod();
            operand2 = setModReturn[0];
            
                if(operand2 == "[BX+SI]"){
                var rm = "000";
                }else if(operand2 == "[BX+DI]"){
                    var rm =  "001";
                }else if(operand2 == "[BP+SI]"){
                    var rm =  "010";
                }else if(operand2 == "[BP+DI]"){
                    var rm =  "011";
                }else if(operand2 == "[SI]"){
                    var rm =  "100";
                }else if(operand2 == "[DI]"){
                    var rm =  "101";
                }else if(operand2 == "[BP]"){
                    var rm =  "110";
                }else if(operand2 == "[BX]"){
                    var rm =  "111";
                }else{
                    errorMsg("Invalid Combination");
                }
            
            var binStr = setModReturn[1];
            var binStr = binStr +"110"+ rm;
            return binStr;
        }// calculates r/m for when operand 2 is a memory location.
            
        var checkInstr = assemble();
        var setModReturn = setMod();
        sqbr2 = setModReturn[2];

            if(sqbr2 == "[")
            {var binary = rSlashM();
            }else{
            var binary = reg();
            }


        hexValue = parseInt(binary, 2).toString(16);

        hexF.text(hexValue);
        binF.text(binary);

    }

    function lea(code){
        var datainput = code.toUpperCase().trim();
        var str = datainput.substr(0, 3).toString().toUpperCase();
        var mem = datainput.substr(7, datainput.length).toString().toUpperCase().trim();

        if (str == "LEA") {
            if (mem == "M" ) {
                var x = datainput.substr(4, 2);
                var y = x.toString().toUpperCase();
                switch (y) {
                    case 'AX':
                        ax = "10001101 00000000";
                        bp = "8D 00";
                        break;

                    case 'BX':
                        ax = "10001101 00011000";
                        bp = "8D 18";
                        break;

                    case 'CX':
                        ax = "10001101 00001000";
                        bp = "8D 08";
                        break;

                    case 'DX':
                        ax = "10001101 00010000";
                        bp = "8D 10";
                        break;

                    case 'BP':
                        ax = "10001101 00101000";
                        bp = "8D 28";
                        break;

                    case 'DI':
                        ax = "10001101 00111000";
                        bp = "8D 38";
                        break;

                    case 'SI':
                        ax = "10001101 00110000";
                        bp = "8D 30";
                        break;

                    case 'SP':
                        ax = "10001101 00100000";
                        bp = "8D 20";
                        break;

                    default:
                        errorMsg("invalid LEA command");
                }
                binF.text(ax);
                hexF.text(bp);
            }
            else {
                errorMsg("Error, No memory detected");
            }
        }else {
            alert("Wrong Instruction inputed");

        }

    }

    function jpe(before, after){
        var inputOne = before;
        var z = inputOne.search(/JPE/i);
        var otherPart = inputOne.substr(4,3);
        var otherPartInt = parseInt(otherPart);

        var secondInput = after;
        secondInputInt = parseInt(secondInput);

        var subtract = (secondInputInt) - (otherPartInt );
        var divide =  subtract / 2 ;
        var eben = 255 -  (divide);
        var bindec = 122;
        var binbin = bindec.toString(2);
        var binhex = bindec.toString(16);

        var boy = eben.toString(16);
        var girl =eben.toString(2);
           if((z >= 0) && (otherPartInt >= 0)){
               binF.text(girl + "" + "" + "/" + binbin);
               hexF.text(boy + " " + " " + "" + binhex);
           }else{
              errorMsg('Invalid JPE input format');
           }
    }

    function pushf(code){
        var dec,y,bin,hex;
        dec =156;

        var  x =  code.toUpperCase().trim();
        var m = x.search(/PUSHF/i);
        bin = dec.toString(2);
        hex = dec.toString(16);
            if (x== "PUSHF"){
                binF.text(bin);
                hexF.text(hex);
            }else{
                errorMsg("Invalid Input! Input PUSHF");
            }
    }

    function cli(code){
        var Input = code.trim()   //getting the value of the input and stripping the whitespace
        var binary = 11111010;                                      //binary value of the CLI command
        var hex = parseInt(binary,2).toString(16).toUpperCase();    //Converting the binary to decimal, and then to hex
        
            if(Input=="CLI"|Input=="cli"){
                binF.text(binary);
                hexF.text(hex);
            }else{
                errorMsg("The input command is CLI in upper or lower case.")    		//display error message to the user
            }
    }

    function repe(code){
        var x,bin,hex,dec;
        x = code.trim().toUpperCase();
        var y = x.substr(0,4).toString().toUpperCase();

            if (y=="REPE"){
                dec = 243;
                bin = dec.toString(2);
                hex = dec.toString(16).toUpperCase();
                binF.text(bin);
                hexF.text(hex);
            }else{
                errorMsg('invalid instruction set');
            }
    }

    function cmp(code){
        var parameters=code;
        var tri=parameters.replace(","," ");
        var tri1=tri.trim().toUpperCase();
        if(parameters.length>3)
        {
            if(parameters.substring(0,4).toUpperCase()=="CMP ")
            {
                //immediate with accumulator
                if (parameters.substring(4,6).toUpperCase()=="AX"){
                    var conv=Number(parameters.substring(7));
                    var dec=61;
                    var hex1=(+dec).toString(16).toUpperCase();
                    hexF.text(hex1+" "+conv+" 00");
                    var nuh=(+conv).toString(2);
                    var bin1=(+dec).toString(2);
                    binF.text(bin1+" "+nuh);
                }else if (parameters.substring(4,6).toUpperCase()=="AL"){
                    var conv=Number(parameters.substring(7));
                    var dec=60;
                    var hex1=(+dec).toString(16).toUpperCase();
                    hexF.text(hex1+" "+conv+" 00");
                    var nuh=(+conv).toString(2);
                    var bin1=(+dec).toString(2);
                    binF.text(bin1+" "+nuh);
                }
                //end of immediate with accumulator
                //IMMEDIATE WITH REISTER
                else if (parameters.substring(4,6).toUpperCase()=="CX")
                {
                    var conv=Number(parameters.substring(7));
                    var dec=131;
                    var dec2=249;
                    var hex1=(+dec).toString(16).toUpperCase();
                    var hex2=(+dec2).toString(16).toUpperCase();
                    hexF.text(hex1+" "+hex2+" "+conv);
                    var nuh=(+conv).toString(2);
                    var bin1=(+dec).toString(2);
                    var bin2=(+dec2).toString(2);
                    binF.text(bin1+" "+bin2+" "+nuh);
                }else if (parameters.substring(4,6).toUpperCase()=="DX"){
                    var conv=Number(parameters.substring(7));
                    var dec=131;
                    var dec2=250;
                    var hex1=(+dec).toString(16).toUpperCase();
                    var hex2=(+dec2).toString(16).toUpperCase();
                    hexF.text(hex1+" "+hex2+" "+conv);
                    var nuh=(+conv).toString(2);
                    var bin1=(+dec).toString(2);
                    var bin2=(+dec2).toString(2);
                    binF.text(bin1+" "+bin2+" "+nuh);
                }else if (parameters.substring(4,6).toUpperCase()=="BX"){
                    var conv=Number(parameters.substring(7));
                    var dec=131;
                    var dec2=251;
                    var hex1=(+dec).toString(16).toUpperCase();
                    var hex2=(+dec2).toString(16).toUpperCase();
                    hexF.text(hex1+" "+hex2+" "+conv);
                    var nuh=(+conv).toString(2);
                    var bin1=(+dec).toString(2);
                    var bin2=(+dec2).toString(2);
                    binF.text(bin1+" "+bin2+" "+nuh);
                }else if (parameters.substring(4,6).toUpperCase()=="SP"){
                    var conv=Number(parameters.substring(7));
                    var dec=131;
                    var dec2=252;
                    var hex1=(+dec).toString(16).toUpperCase();
                    var hex2=(+dec2).toString(16).toUpperCase();
                    hexF.text(hex1+" "+hex2+" "+conv);
                    var nuh=(+conv).toString(2);
                    var bin1=(+dec).toString(2);
                    var bin2=(+dec2).toString(2);
                    binF.text(bin1+" "+bin2+" "+nuh);
                }else if (parameters.substring(4,6).toUpperCase()=="BP"){
                    var conv=Number(parameters.substring(7));
                    var dec=131;
                    var dec2=253;
                    var hex1=(+dec).toString(16).toUpperCase();
                    var hex2=(+dec2).toString(16).toUpperCase();
                    hexF.text(hex1+" "+hex2+" "+conv);
                    var nuh=(+conv).toString(2);
                    var bin1=(+dec).toString(2);
                    var bin2=(+dec2).toString(2);
                    binF.text(bin1+" "+bin2+" "+nuh);
                }else if (parameters.substring(4,6).toUpperCase()=="SI"){
                    var conv=Number(parameters.substring(7));
                    var dec=131;
                    var dec2=254;
                    var hex1=(+dec).toString(16).toUpperCase();
                    var hex2=(+dec2).toString(16).toUpperCase();
                    hexF.text(hex1+" "+hex2+" "+conv);
                    var nuh=(+conv).toString(2);
                    var bin1=(+dec).toString(2);
                    var bin2=(+dec2).toString(2);
                    binF.text(bin1+" "+bin2+" "+nuh);
                }else if (parameters.substring(4,6).toUpperCase()=="DI"){
                    var conv=Number(parameters.substring(7));
                    var dec=131;
                    var dec2=255;
                    var hex1=(+dec).toString(16).toUpperCase();
                    var hex2=(+dec2).toString(16).toUpperCase();
                    hexF.text(hex1+" "+hex2+" "+conv);
                    var nuh=(+conv).toString(2);
                    var bin1=(+dec).toString(2);
                    var bin2=(+dec2).toString(2);
                    binF.text(bin1+" "+bin2+" "+nuh);
                }else if (parameters.substring(4,6).toUpperCase()=="AL"){
                    var conv=Number(parameters.substring(7));
                    var dec=128;
                    var dec2=248;
                    var hex1=(+dec).toString(16).toUpperCase();
                    var hex2=(+dec2).toString(16).toUpperCase();
                    hexF.text(hex1+" "+hex2+" "+conv);
                    var nuh=(+conv).toString(2);
                    var bin1=(+dec).toString(2);
                    var bin2=(+dec2).toString(2);
                    binF.text(bin1+" "+bin2+" "+nuh);
                }else if (parameters.substring(4,6).toUpperCase()=="CL"){
                    var conv=Number(parameters.substring(7));
                    var dec=128;
                    var dec2=249;
                    var hex1=(+dec).toString(16).toUpperCase();
                    var hex2=(+dec2).toString(16).toUpperCase();
                    hexF.text(hex1+" "+hex2+" "+conv);
                    var nuh=(+conv).toString(2);
                    var bin1=(+dec).toString(2);
                    var bin2=(+dec2).toString(2);
                    binF.text(bin1+" "+bin2+" "+nuh);
                }else if (parameters.substring(4,6).toUpperCase()=="DL"){
                    var conv=Number(parameters.substring(7));
                    var dec=128;
                    var dec2=250;
                    var hex1=(+dec).toString(16).toUpperCase();
                    var hex2=(+dec2).toString(16).toUpperCase();
                    hexF.text(hex1+" "+hex2+" "+conv);
                    var nuh=(+conv).toString(2);
                    var bin1=(+dec).toString(2);
                    var bin2=(+dec2).toString(2);
                    binF.text(bin1+" "+bin2+" "+nuh);
                }else if (parameters.substring(4,6).toUpperCase()=="BL"){
                    var conv=Number(parameters.substring(7));
                    var dec=128;
                    var dec2=251;
                    var hex1=(+dec).toString(16).toUpperCase();
                    var hex2=(+dec2).toString(16).toUpperCase();
                    hexF.text(hex1+" "+hex2+" "+conv);
                    var nuh=(+conv).toString(2);
                    var bin1=(+dec).toString(2);
                    var bin2=(+dec2).toString(2);
                    binF.text(bin1+" "+bin2+" "+nuh);
                }else if (parameters.substring(4,6).toUpperCase()=="AH"){
                    var conv=Number(parameters.substring(7));
                    var dec=128;
                    var dec2=252;
                    var hex1=(+dec).toString(16).toUpperCase();
                    var hex2=(+dec2).toString(16).toUpperCase();
                    hexF.text(hex1+" "+hex2+" "+conv);
                    var nuh=(+conv).toString(2);
                    var bin1=(+dec).toString(2);
                    var bin2=(+dec2).toString(2);
                    binF.text(bin1+" "+bin2+" "+nuh);
                }else if (parameters.substring(4,6).toUpperCase()=="CH"){
                    var conv=Number(parameters.substring(7));
                    var dec=128;
                    var dec2=253;
                    var hex1=(+dec).toString(16).toUpperCase();
                    var hex2=(+dec2).toString(16).toUpperCase();
                    hexF.text(hex1+" "+hex2+" "+conv);
                    var nuh=(+conv).toString(2);
                    var bin1=(+dec).toString(2);
                    var bin2=(+dec2).toString(2);
                    binF.text(bin1+" "+bin2+" "+nuh);
                }else if (parameters.substring(4,6).toUpperCase()=="DH"){
                    var conv=Number(parameters.substring(7));
                    var dec=128;
                    var dec2=254;
                    var hex1=(+dec).toString(16).toUpperCase();
                    var hex2=(+dec2).toString(16).toUpperCase();
                    hexF.text(hex1+" "+hex2+" "+conv);
                    var nuh=(+conv).toString(2);
                    var bin1=(+dec).toString(2);
                    var bin2=(+dec2).toString(2);
                    binF.text(bin1+" "+bin2+" "+nuh);
                }else if (parameters.substring(4,6).toUpperCase()=="BH") {
                    var conv=Number(parameters.substring(7));
                    var dec=128;
                    var dec2=255;
                    var hex1=(+dec).toString(16).toUpperCase();
                    var hex2=(+dec2).toString(16).toUpperCase();
                    hexF.text(hex1+" "+hex2+" "+conv);
                    var nuh=(+conv).toString(2);
                    var bin1=(+dec).toString(2);
                    var bin2=(+dec2).toString(2);
                    binF.text(bin1+" "+bin2+" "+nuh);
                }
                //IMMEDIATE WITH REGISTER
                //IMMEDIATE WITH MEMORY		
                else if ((parameters.substring(4,5)=="[")&&(parameters.substring(7,8)=="]")){
                    var ang=parameters.substring(5,7).toUpperCase();
                    var num1=128;
                    var num2=62;
                    var conv=Number(parameters.substring(9));
                    var hex1=(+num1).toString(16).toUpperCase();
                    var hex2=(+num2).toString(16).toUpperCase();
                    hexF.text(hex1+" "+hex2+" "+ang+" 00 "+conv);
                    var bin1=(+num1).toString(2).toUpperCase();
                    var bin2=(+num2).toString(2).toUpperCase();
                    var bin3=(+ang).toString(2).toUpperCase();
                    var bin4=(+conv).toString(2).toUpperCase();
                    binF.text(bin1+" "+bin2+" "+bin3+" 00 "+bin4);
                }                
            }else{
                errorMsg("This assembler works only for CMP and make sure you put a space after CMP");
            }
        }else{
            errorMsg("Wrong! Enter a valid instruction");
        }
    }

    function diff_cmp(code){
        code = code.toUpperCase();
        if (code.search(/CMPSW/i)>=0){
            cmpsw(code);
        }else if(code.substring(0,4)==="CMP "){
            cmp(code);
        }
    }

    function cmpsw(code){
        dec = 166;   
        decOne = 167; 
        bin = dec.toString(2);
        hex = dec.toString(16);
        hexOne = decOne.toString(16);
        x = code.trim();
        y = x.toUpperCase();
       m = y.charAt(4).toString().toUpperCase();
  
       if(y== "CMPSW" ){
           switch(m)
           {
               case 'W':
                   binF.text(bin + " "  + bin + "1");
                   hexF.text(hex + " "  + hexOne);
                   break;
               default:
                   errorMsg('invalid input');
                   break;
           }
       }else{
           errorMsg("ENTER A CORRECT INSTRUCTION SET");
       }
    }

    function jl(before, after){
        var input1 = before;
        var firstPart = input1.substr(0,3);
        var z = input1.search(/JL/i);
        var otherPart = input1.substr(4,3);
        var otherPartInt = parseInt(otherPart);

        var secondInput = after;
        secondInputInt = parseInt(secondInput);

        var subtract = (secondInputInt) - (otherPartInt );
        var divide =  subtract / 2 ;
        var line = 255 -  (divide);
        var bindec = 124;
        var binbin = bindec.toString(2);
        var binhex = bindec.toString(16);

        var str = line.toString(16);
        var stu =line.toString(2);
           if((z >= 0) && (otherPartInt >= 0)){
               binF.text(stu + "" + "" + "/" + binbin);
               hexF.text(str+ " " + " " + "" + binhex);
           }else{
              errorMsg('invalid input');
           }
    }

    function pop(code){
        var datainput = code.trim();
        var str = datainput.substr(0, 3).toString().toUpperCase();

        if (str == "POP") {
            var x = datainput.substr(4, 2);
            var y = x.toString().toUpperCase();
            switch (y) {
                case 'AX':
                    ax = "01011000";
                    bp = "58";
                    break;

                case 'BX':
                    ax = "01011011";
                    bp = "5B";
                    break;

                case 'CX':
                    ax = "01011001";
                    bp = "59";
                    break;

                case 'DX':
                    ax = "01011010";
                    bp = "5A";
                    break;

                case 'BP':
                    ax = "01011101";
                    bp = "5D";
                    break;

                case 'DI':
                    ax = "01011111";
                    bp = "5F";
                    break;

                case 'SI':
                    ax = "01011110";
                    bp = "5E";
                    break;

                case 'SP':
                    ax = "01011100";
                    bp = "5C";
                    break;

                case '':
                    ax = "1000111100000000";
                    bp = "8F 00";
                    break;

                default:
                    errorMsg("invalid mnemonics");
            }
            binF.text(ax);
            hexF.text(bp);
        }else{
            errorMsg("invalid instruction inputted");
        }
    }
    
    function diff_jna(code){
        code = code.toUpperCase();
        if (code.substring(0,4)==="JNA "){
            jna(code);
        }else if(code.substring(0,4)==="JNAE"){
            partA = code.split(",");
            jnae(partA[0],partA[1]);
        }
    }

    function jna(code){
        function pad(string, padstr, length) {
            while(string.length < length) {
                string = padstr + string;
            }
            return string;
        }

        var regb = {"AX":"0","AL":"0","CX":"1","CL":"1","DX":"2","DL":"2","BX":"3","BL":"3","SP":"4","AH":"4","BP":"5","CH":"5","SI":"6","DH":"6","DI":"7","BH":"7"};
        var value = code.toUpperCase();
        if (regb[value.substring(4)] && value.substring(0,4) == "JNA ") {
            var rega = regb[value.substring(4)];
            binF.text("01110110 " + pad((+rega).toString(2), 0, 8));
            hexF.text("76 " + "0" + (+rega));
        } else {
            errorMsg("Incomplete mnemonic or instruction");
        }
    }

    function cbw(code){
        var Input = code.trim();
        var binary = 10011000;  
        var hex = parseInt(binary,2).toString(16).toUpperCase();    
			
			if(Input=="CBW"||Input=="cbw"){
			binF.text(binary);
			hexF.text(hex);
			}else{
				errorMsg("The input command is CBW in upper or lower case.");
			}
    }

    function nop(code){
        x = code.trim().toUpperCase();
            var y = x.substr(0,3).toString().toUpperCase();
            if (y=="NOP"){
                dec = 144;
                bin = dec.toString(2);
                hex = dec.toString(16).toUpperCase();
                binF.text(bin);
                hexF.text(hex);
            }else{
                errorMsg('invalid instruction set');
            }
    }

    function les(code){
        var ax, bp;
        var datainput = code.trim();
        var str = datainput.substr(0, 3).toString().toUpperCase();
        var mem = datainput.substr(7, 3).trim().toString().toUpperCase();

        if (str == "LES") {
            if (mem == "M") {
                var x = datainput.substr(4, 2);
                var y = x.toString().toUpperCase();
                switch (y) {
                    case 'AX':
                        ax = "11000100 00000000";
                        bp = "C4 00";
                        break;
                    case 'BX':
                        ax = "11000100 00011000";
                        bp = "C4 18";
                        break;
                    case 'CX':
                        ax = "11000100 00001000";
                        bp = "C4 08";
                        break;
                    case 'DX':
                        ax = "11000100 00010000";
                        bp = "C4 10";
                        break;
                    case 'BP':
                        ax = "11000100 00101000";
                        bp = "C4 28";
                        break;
                    case 'DI':
                        ax = "11000100 00111000";
                        bp = "C4 38";
                        break;
                    case 'SI':
                        ax = "11000100 00110000";
                        bp = "C4 30";
                        break;
                    case 'SP':
                        ax = "11000100 00100000";
                        bp = "C4 20";
                        break;

                    default:
                        ax = "invalid mnemonics ";
                        bp = "invalid mnemonics  ";
                }
                binF.text(ax);
                hexF.text(bp);

            }else {
                errorMsg("This instruction requires memory");

            }
        }else {
            errorMsg("invalid instruction inputted");
        }

    }

    function jne(code){
        function pad(string, padstr, length) {
            while(string.length < length) {
                string = padstr + string;
            }
            return string;
        }
        var regb = {"AX":"0","AL":"0","CX":"1","CL":"1","DX":"2","DL":"2","BX":"3","BL":"3","SP":"4","AH":"4","BP":"5","CH":"5","SI":"6","DH":"6","DI":"7","BH":"7"};
        var value = code.toUpperCase();
        if (regb[value.substring(4)] && value.substring(0,4) == "JNE ") {
            var rega = regb[value.substring(4)];
            binF.text("01110101 " + pad((+rega).toString(2), 0, 8));
            hexF.text("75 " + "0" + (+rega));
        }else{
            errorMsg("Incomplete mnemonic or instruction");
        }
    }

    function movsw(code){  
        var test = code;
                
            if (test=="MOVSW"||test=="MOVSW"){
                var binary = "10100101";
                var hex =  parseInt(binary, 2).toString(16);
                
                binF.text(binary);
                hexF.text(hex);
            }else {
                errorMsg("invalid MOVSW mnemonic.");
                }
    }

    function jz(before, after){
        var input = before;
        var otherpart = input.substring(4);
        testOP = parseInt(otherpart);
        testJZ = input.search(/JZ/i);
        var output = after;

        if ((testJZ >= 0)&&(testOP >= 0)){
            var OP = parseInt(otherpart,16).toString(2);
            var JP = parseInt(output,16).toString(2);

            OP1 = parseInt(OP, 2);
            JP2 = parseInt(JP, 2);

            var bin2 = (OP1 + JP2).toString(2);
            var bin1 = "01110100";

            var hexa1 = parseInt(bin1,2).toString(16);
            var hexa2 = parseInt(bin2,2).toString(16);

            binF.text(bin1 + " " + bin2);
            hexF.text(hexa1 + " " + hexa2);

        }
        else{
            errorMsg("Wrong Mnemonic Input");
        }
    }

    function jpo(before, after){
        var input = before;
        var otherpart = input.substring(4);
        testOP = parseInt(otherpart);
        testJPO = input.search(/JPO/i);
        var output = after;

        if ((testJPO >= 0)&&(testOP >= 0)){
            var OP = parseInt(otherpart,16).toString(2);
            var JP = parseInt(output,16).toString(2);

            OP1 = parseInt(OP, 2);
            JP2 = parseInt(JP, 2);

            var bin2 = (OP1 + JP2).toString(2);
            var bin1 = "01111011";

            var hexa1 = parseInt(bin1,2).toString(16);
            var hexa2 = parseInt(bin2,2).toString(16);

            binF.text(bin1 + " " + bin2);
            hexF,text(hexa1 + " " + hexa2);
        }else{
            errorMsg("Wrong Mnemonic Input");
        }
    }

    function jng(before, after){
        var inputOne = before;
        var firstPart = inputOne.substr(0,3);
        var z = inputOne.search(/JNG/i);
        var otherPart = inputOne.substr(4,3);
        var otherPartInt = parseInt(otherPart);

        var secondInput = after;
        secondInputInt = parseInt(secondInput);

        var subtract = (secondInputInt) - (otherPartInt );
        var divide =  subtract / 2 ;
        var eben = 255 -  (divide);
        var bindec = 126;
        var binbin = bindec.toString(2);
        var binhex = bindec.toString(16);

        var boy = eben.toString(16);
        var  girl =eben.toString(2);
           if((z >= 0) && (otherPartInt >= 0)){
               binF.text(girl + "" + "" + "/" + binbin);
               hexF.text(boy + " " + " " + "" + binhex);
           }else{
              errorMsg('invalid mnemonic input');
           }
    }

    function diff_jng(code){
        code = code.toUpperCase();
        if (code.substring(0,4)==="JNG "){
            partA = code.split(",");
            jng(partA[0],partA[1]);
        }else if(code.substring(0,4)==="JNGE"){
            partA = code.split(",");
            jnge(partA[0],partA[1]);
        }
    }

    function jo(before, after){
        var input = before;
        var otherpart = input.substring(4);
        testOP = parseInt(otherpart);
        testJO = input.search(/JO/i);;
        var output = after;
       
        if ((testJO >= 0)&&(testOP >= 0)){
            var OP = parseInt(otherpart,16).toString(2);
            var JP = parseInt(output,16).toString(2);

            OP1 = parseInt(OP, 2);
            JP2 = parseInt(JP, 2);

            var bin2 = (OP1 + JP2).toString(2);
            var bin1 = "01110000";


            var hexa1 = parseInt(bin1,2).toString(16);
            var hexa2 = parseInt(bin2,2).toString(16);


            binF.text(bin1 + " " + bin2);
            hexF.text(hexa1 + " " + hexa2);

        }
        else{
            errorMsg("wrong mnemonic input");
        }
    }

    function jns(before, after){
        var input = before;
        var otherpart = input.substring(4);
        testOP = parseInt(otherpart);
        testJNS = input.search(/JNS/i);
        var output = after;

        if ((testJNS >= 0)&&(testOP >= 0)){
            var OP = parseInt(otherpart,16).toString(2);
            var JP = parseInt(output,16).toString(2);

            OP1 = parseInt(OP, 2);
            JP2 = parseInt(JP, 2);

            var bin2 = (OP1 + JP2).toString(2);
            var bin1 = "01111001";

            var hexa1 = parseInt(bin1,2).toString(16);
            var hexa2 = parseInt(bin2,2).toString(16);

            binF.text(bin1 + " " + bin2);
            hexF.text(hexa1 + " " + hexa2);

        }
        else{
            errorMsg("wrong input");
        }
    }

    function diff_jnl(code){
        code = code.toUpperCase();
        if (code.substring(0,4)==="JNL "){
            partA = code.split(",");
            jnl(partA[0],partA[1]);
        }else if(code.substring(0,4)==="JNLE"){
            partA = code.split(",");
            jnle(partA[0],partA[1]);
        }
    }

    function jnl(before, after){
        var inputOne = before;
        var firstPart = inputOne.substr(0,3);
        var z = inputOne.search(/JNL/i);
        var otherPart = inputOne.substr(4,3);
        var otherPartInt = parseInt(otherPart);

        var secondInput = after;
        secondInputInt = parseInt(secondInput);

        var subtract = (secondInputInt) - (otherPartInt );
        var divide =  subtract / 2 ;
        var eben = 255 -  (divide);
        var bindec = 125;
        var binbin = bindec.toString(2);
        var binhex = bindec.toString(16);

        var boy = eben.toString(16);
        var  girl =eben.toString(2);
           if((z >= 0) && (otherPartInt >= 0))
           {
               binF.text(girl + "" + "" + "/" + binbin);
               hexF.text(boy + " " + " " + "" + binhex);
           }else{
              window.alert('invalid input');
           }

    }

    function diff_jnb(code){
        code = code.toUpperCase();
        if (code.substring(0,4)==="JNB "){
            partA = code.split(",");
            jnb(partA[0],partA[1]);
        }else if(code.substring(0,4)==="JNBE"){
            partA = code.split(",");
            jnbe(partA[0],partA[1]);
        }
    }

    function jnb(before, after){
        var inputOne = before;
        var firstPart = inputOne.substr(0,3);
        var z = inputOne.search(/JNB/i);
        var otherPart = inputOne.substr(4,3);
        var otherPartInt = parseInt(otherPart);

        var secondInput = after;
        secondInputInt = parseInt(secondInput);

        var subtract = (secondInputInt) - (otherPartInt );
        var divide =  subtract / 2 ;
        var code = 255 -  (divide);
        var bindec = 115;
        var binbin = bindec.toString(2);
        var binhex = bindec.toString(16);

        var main = code.toString(16);
        var last =code.toString(2);
           if((z >= 0) && (otherPartInt >= 0)){
               binF.text(last + "" + " " + "" + binbin);
               hexF.text(main+ " " + " " + "" + binhex);
           } else{
              errorMsg('invalid input');
           }
    }

    function not(code){
        dec = 15;
        dec1= 13;
        bin = dec.toString(2);
        bin1 = dec1.toString(2);
        hex1 =dec1 .toString(16);
        hex = dec.toString(16);
        r = code.trim();
        var x = r.substr(4, 2).toString().toUpperCase();
        var m = r.substr(0, 3).toString().toUpperCase();
        var y = x.toUpperCase();

        if (m == "NOT") {
            switch (y) {
                case 'AX':
                    binF.text(bin + "0111" + "|" + bin1 + "0000");
                    hexF.text(hex + "7" + "|" + hex1 + "0");
                    break;

                case 'CX':
                    binF.text(bin + "0111" + "|" + bin1 + "0001");
                    hexF.text(hex + "7" + "|" + hex1 + "1");
                    break;

                case 'BX':
                    binF.text(bin + "0111" + "|" + bin1 + "0010");
                    hexF.text(hex + "7" + "|" + hex1 + "2");
                    break;

                case 'DX':
                    binF.text(bin + "0111" + "|" + bin1 + "0011");
                    hexF.text(hex + "7" + "|" + hex1 + "3");
                    break;

                case 'SP':
                    binF.text(bin + "0111" + "|" + bin1+ "0100");
                    hexF.text(hex + "f" + "|" + hex1 + "4");
                    break;

                case 'BP':
                    binF.text(bin + "0111" + "|" + bin1 + "0101");
                    hexF.text(hex + "7" + "|" + hex1 + "5");
                    break;

                case 'SI':
                    binF.text(bin + "0111" + "|" + bin1 + "0110");
                    hexF.text(hex + "7" + "|" + hex1 + "6");
                    break;

                case 'DI':
                    binF.text(bin + "0111" + "|" + bin1 + "0111");
                    hexF.text(hex + "f" + "|" + hex1+ "7");
                    break;

                case 'AL':
                    binF.text(bin + "0110" + "|" + bin1 + "0000");
                    hexF.text(hex + "6" + "|" + hex1 + "0");
                    break;

                case 'CL':
                    binF.text(bin + "0110" + "|" + bin1 + "0001");
                    hexF.text(hex + "6" + "|" + hex1 + "1");
                    break;

                case 'BL':
                    binF.text(bin + "0110" + "|" + bin1 + "0010");
                    hexF.text(hex + "6" + "|" + hex1 + "2");
                    break;

                case 'DL':
                    binF.text(bin + "0110" + "|" + bin1 + "0011");
                    hexF.text(hex + "6" + "|" + hex1 + "3");
                    break;

                case 'AH':
                    binF.text(bin + "0110" + "|" + bin1 + "0100");
                    hexF.text(hex + "6" + "|" + hex + "4");
                    break;

                case 'CH':
                    binF.text(bin + "0110" + "|" + bin1 + "0101");
                    hexF.text(hex + "6" + "|" + hex1 + "5");
                    break;

                case 'DH':
                    binF.text(bin + "0110" + "|" + bin1 + "0110");
                    hexF.text(hex + "6" + "|" + hex1 + "6");
                    break;

                case 'BH':
                    binF.text(bin + "0110" + "|" + bin1 + "0111");
                    hexF.text(hex + "6" + "|" + hex1 + "7");
                    break;

                default:
                    errorMsg("Invalid mnemonics");
            }

        }else {
            errorMsg("Invalid Instruction set. Make sure its 'NOT'");
        }


    }

    function diff_jg(code){
        code = code.toUpperCase();
        if (code.substring(0,3)==="JG "){
            partA = code.split(",");
            jg(partA[0],partA[1]);
        }else if(code.substring(0,3)==="JGE"){
            partA = code.split(",");
            jge(partA[0],partA[1]);
        }
    }

    function jge(before, after){
        var input = before;
        var otherpart = input.substring(4);
        testOP = parseInt(otherpart);
        testJGE = input.search(/JGE/i);
        var output = after;

        if ((testJGE >= 0)&&(testOP >= 0)){

            var OP = parseInt(otherpart,16).toString(2);
            var JP = parseInt(output,16).toString(2);

            OP1 = parseInt(OP, 2);
            JP2 = parseInt(JP, 2);

            var bin2 = (OP1 + JP2).toString(2);
            var bin1 = "01111101";


            var hexa1 = parseInt(bin1,2).toString(16);
            var hexa2 = parseInt(bin2,2).toString(16);


            binF.text(bin1 + " " + bin2);
            hexF.text(hexa1 + " " + hexa2);
        }else{
            errorMsg("wrong input");
        }
    }

    function diff_ja(code){
        code = code.toUpperCase();
        if (code.substring(0,3)==="JAE"){
            partA = code.split(",");
            jae(partA[0],partA[1]);
        }else if(code.substring(0,3)==="JA "){
            partA = code.split(",");
            ja(partA[0],partA[1]);
        }
    }

    function ja(before, after){
        var inputOne = before;
           var z = inputOne.search(/JA/i);
           var otherPart = inputOne.substr(4,3);
           var otherPartInt = parseInt(otherPart);

           var secondInput = after;
           secondInputInt = parseInt(secondInput);

           var subtract = (secondInputInt) - (otherPartInt );
           var divide =  subtract / 2 ;
           var eben = 255 -  (divide);
           var bindec = 119;
           var binbin = bindec.toString(2);
           var binhex = bindec.toString(16);

            var boy = eben.toString(16);
            var  girl =eben.toString(2);
                if((z >= 0) && (otherPartInt >= 0)) {
                    binF.text(girl + "" + "" + "/" + binbin);
                    hexF.text(boy + " " + " " + "" + binhex);
                }else{
                    errorMsg('invalid input');
                }
    }

    function into(code){
        x = code.trim();

        if (isNaN(x) && x == "INTO" || x == "into"){
            dec = 206;
            bin = dec.toString(2);
            hex = dec.toString(16);
            binF.text(bin);
            hexF.text(hex);
        }else{
            errorMsg('invalid instruction set');
        }
    }

    function movsb(code){
        var code1 = code ;
		 
        if(code1=="MOVSB"){
            binF.text("10100100");
            hexF.text("A4");
        }
        else{
            errorMsg("Invalid Mnemonic");
        }
    }

    function int(code){
        z=code;
        y="11001101";

        var mnemonic = z.substring(0,3);
        var checkDiv = mnemonic.toUpperCase();
        
        if (checkDiv !== "INT"){
		    errorMsg("please insert an INT command");
	    }else{
            binF.text(y);
            hexF.text("CD");
        } 
    }

    function jg(before, after){
        var inputOne = before.trim();

        var z = inputOne.search(/JG/i);
        var otherPart = inputOne.substr(3,3);
        var otherPartInt = parseInt(otherPart);

        var secondInput = after;
        secondInputInt = parseInt(secondInput);

        var subtract = (secondInputInt) - (otherPartInt );
        var divide =  subtract / 2 ;
        var eben = 255 -  (divide);
        var bindec = 127;
        var binbin = bindec.toString(2);
        var binhex = bindec.toString(16);

        var boy = eben.toString(16);
        var  girl =eben.toString(2);
            if((z >= 0) && (otherPartInt >= 0)){
                binF.text(girl + "" + "" + "/" + binbin);
                hexF.text(boy + " " + " " + "" + binhex);
            }else{
            errorMsg('invalid input');
            }
    }

    function lodsw(code){
        x = code.trim().toUpperCase();
        var y = x.substr(0,5).toString().toUpperCase();

        if (y=="LODSW"){
            dec = 173;
            bin = dec.toString(2);
            hex = dec.toString(16).toUpperCase();
            binF.text(bin);
            hexF.text(hex);
        }else{
            errorMsg('invalid instruction set');
        }
    }

    function jno(before, after){
        var inputOne = before
           var firstPart = inputOne.substr(0,3);
           var z = inputOne.search(/JNO/i);
           var otherPart = inputOne.substr(4,3);
           var otherPartInt = parseInt(otherPart);

           var secondInput = after;
           secondInputInt = parseInt(secondInput);

           var subtract = (secondInputInt) - (otherPartInt );
           var divide =  subtract / 2 ;
           var eben = 255 -  (divide);
           var bindec = 113;
           var binbin = bindec.toString(2);
           var binhex = bindec.toString(16);

          var boy = eben.toString(16);
          var  girl =eben.toString(2);
           if((z >= 0) && (otherPartInt >= 0)){
               binF.text(girl + "" + "" + "/" + binbin);
               hexF.text(boy + " " + " " + "" + binhex);
           }else{
              errorMsg('invalid input');
           }
    }

    function jnae(before, after){
        var inputOne = before;
        var z = inputOne.search(/JNAE/i);
        var otherPart = inputOne.substr(5,3);
        var otherPartInt = parseInt(otherPart);

        var secondInput = after;
        secondInputInt = parseInt(secondInput);

        var subtract = (secondInputInt) - (otherPartInt);
        var divide =  subtract / 2 ;
        var eben = 255 -  (divide);
        var bindec = 114;
        var binbin = bindec.toString(2);
        var binhex = bindec.toString(16);

        var boy = eben.toString(16);
        var  girl = eben.toString(2);
           if((z >= 0) && (otherPartInt >= 0)){
                binF.text(binbin  + "" + "" + " " + " "+ "" + girl);
                hexF.text(binhex +  "" + " " + " " + boy);
           }else{
              errorMsg('invalid input');
           }

    }

    function sar(code){
        var r, dec, bin, hex, z, ax, bx;
        dec = 13;
        dec1= 15;
        bin = dec.toString(2);
        bin1 = dec1.toString(2);
        hex1 =dec1 .toString(16);
        hex = dec.toString(16);
        r = code.trim();
        var x = r.substr(4, 2).toString().toUpperCase();
        var m = r.substr(0, 3).toString().toUpperCase();
        var y = x.toUpperCase();

        if (m == "SAR") {
            switch (y) {
                case 'AX':
                    binF.text(bin + "0011" + " " + bin1 + "1000");
                    hexF.text(hex + "7" + " " + hex1 + "0");
                    break;

                case 'CX':
                    binF.text(bin + "0011" + " " + bin1 + "1001");
                    hexF.text(hex + "7" + " " + hex1 + "1");
                    break;

                case 'BX':
                    binF.text(bin + "0011" + " " + bin1 + "1010");
                    hexF.text(hex + "7" + " " + hex1 + "2");
                    break;

                case 'DX':
                    binF.text(bin + "0011" + " " + bin1 + "1011");
                    hexF.text(hex + "7" + " " + hex1 + "3");
                    break;

                case 'SP':
                    binF.text(bin + "0011" + " " + bin1+ "1100");
                    hexF.text(hex + "7" + " " + hex1 + "4");
                    break;

                case 'BP':
                    binF.text(bin + "0011" + " " + bin1 + "1101");
                    hexF.text(hex + "7" + " " + hex1 + "5");
                    break;

                case 'SI':
                    binF.text(bin + "0011" + " " + bin1 + "1110");
                    hexF.text(hex + "7" + " " + hex1 + "6");
                    break;

                case 'DI':
                    binF.text(bin + "0011" + " " + bin1 + "1111");
                    hexF.text(hex + "7" + " " + hex1+ "7");
                    break;

                case 'AL':
                    binF.text(bin + "0010" + " " + bin1 + "1000");
                    hexF.text(hex + "6" + " " + hex1 + "0");
                    break;

                case 'CL':
                    binF.text(bin + "0010" + " " + bin1 + "1001");
                    hexF.text(hex + "6" + " " + hex1 + "1");
                    break;

                case 'BL':
                    binF.text(bin + "0111" + " " + bin1 + "1010");
                    hexF.text(hex + "6" + " " + hex1 + "2");
                    break;

                case 'DL':
                    binF.text(bin + "0010" + " " + bin1 + "1011");
                    hexF.text(hex + "6" + " " + hex1 + "3");
                    break;

                case 'AH':
                    binF.text(bin + "0010" + " " + bin1 + "1100");
                    hexF.text(hex + "6" + " " + hex + "4");
                    break;

                case 'CH':
                    binF.text(bin + "0010" + " " + bin1 + "1101");
                    hexF.text(hex + "6" + " " + hex1 + "5");
                    break;

                case 'DH':
                    binF.text(bin + "0010" + " " + bin1 + "1110");
                    hexF.text(hex + "6" + " " + hex1 + "6");
                    break;

                case 'BH':
                    binF.text(bin + "0010" + " " + bin1 + "1111");
                    hexF.text(hex + "6" + " " + hex1 + "7");
                    break;

                default:
                    errorMsg("Invalid mnemonics");
            }

        }else {
            errorMsg("Invalid Instruction set. Make sure its 'NEG'");
        }

    }

    function jnge(before, after){
        var inputOne = before;
        var z = inputOne.search(/JNGE/i);
        var otherPart = inputOne.substr(5,3);
        var otherPartInt = parseInt(otherPart);

        var secondInput = after;
        secondInputInt = parseInt(secondInput);

        var subtract = (secondInputInt) - (otherPartInt );
        var divide =  subtract / 2 ;
        var eben = 255 -  (divide);
        var bindec = 124;
        var binbin = bindec.toString(2);
        var binhex = bindec.toString(16);

        var boy = eben.toString(16);
        var  girl =eben.toString(2);
            if((z >= 0) && (otherPartInt >= 0))
            {
                binF.text(girl + "" + "" + "/" + binbin);
                hexF.text(boy + " " + " " + "" + binhex);
            }else{
                errorMsg('invalid input');
            }
    }

    function loopne(before, after){
        var inputOne = before;
        var z = inputOne.search(/LOOPNE/i);
        var otherPart = inputOne.substr(7,3);
        var otherPartInt = parseInt(otherPart);

        var secondInput = after;
        secondInputInt = parseInt(secondInput);

        var subtract = (secondInputInt) - (otherPartInt );
        var divide =  subtract / 2 ;
        var eben = 255 -  (divide);
        var bindec = 224;
        var binbin = bindec.toString(2);
        var binhex = bindec.toString(16);

        var boy = eben.toString(16);
        var  girl =eben.toString(2);
            if((z >= 0) && (otherPartInt >= 0)){
                binF.text(girl + "" + "" + "/" + binbin);
                hexF.text(boy + " " + " " + "" + binhex);
            }else{
                errorMsg('invalid input');
            }
    }

    function jb(before, after){
        var inputOne = before;
           var z = inputOne.search(/JB/i);
           var otherPart = inputOne.substr(3,3);
           var otherPartInt = parseInt(otherPart);

           var secondInput = after;
           secondInputInt = parseInt(secondInput);

           var subtract = (secondInputInt) - (otherPartInt);
           var divide =  subtract / 2 ;
           var eben = 255 -  (divide);
           var bindec = 114;
           var binbin = bindec.toString(2);
           var binhex = bindec.toString(16);

            var boy = eben.toString(16);
            var  girl = eben.toString(2);
                if((z >= 0) && (otherPartInt >= 0)){
                    binF.text(girl + "" + "" + "/" + binbin);
                    hexF.text(boy + " " + " " + "" + binhex);
                }else{
                   errorMsg('invalid input');
                }
    }

    function das(code){
        var x  = code;
            if (isNaN(x)  && x == "DAS" || x == "das") {
                var num = 47;
                var bin = num.toString(2);
                var hex = num.toString(16);
                binF.text('00 '+''+ bin);
                hexF.text(hex);
            }else{
               errorMsg("INVALID!!  Please Enter a valid instruction set");
            }
    }

    function jae(before, after){
        var first = before;
        var first2 = first.substring(4,7);
        var hexto = parseInt(first2);
        var txtJAE = first.substring(0,3);
        var last = after;
        
            if(txtJAE == "JAE" || txtJAE == "jae"){
                var last2 = parseInt(last);
                var last3 = parseInt(last,16).toString(16);
                var last4 = parseInt(last3,16);
                var two="1";
                var twoo= parseInt(two,10).toString(16)
                var twooo= parseInt(twoo,16);
                var binb = (twooo+last2);
                var bina =  hexto - binb;

                var bina2 = parseInt(bina,10).toString(2);
                var ff = "11111111";
                var disp = "01110011"
                var disp2 = ff - bina2;
                disp2 = parseInt(bina2,2).toString(2);
                var disp3 = parseInt(disp2,2).toString(16);
                var disp4 = parseInt(disp,2).toString(16);
                
                binF.text(disp +" "+ disp2);
                hexF.text(disp4 +" "+ disp3);
            } else if(txtJAE != "JAE"){
                errorMsg("Invalid code");
            }
    }

    function neg(code){
        dec = 15;
        dec1= 13;
        bin = dec.toString(2);
        bin1 = dec1.toString(2);
        hex1 =dec1 .toString(16);
        hex = dec.toString(16);
        r = code.trim();
        var x = r.substr(4, 2).toString().toUpperCase();
        var m = r.substr(0, 3).toString().toUpperCase();
        var y = x.toUpperCase();

        if (m == "NEG") {
            switch (y) {
                case 'AX':
                    binF.text(bin + "0111" + " " + bin1 + "1000");
                    hexF.text(hex + "7" + " " + hex1 + "8");
                    break;

                case 'CX':
                    binF.text(bin + "0111" + " " + bin1 + "1001");
                    hexF.text(hex + "7" + " " + hex1 + "9");
                    break;

                case 'BX':
                    binF.text(bin + "0111" + " " + bin1 + "1010");
                    hexF.text(hex + "7" + " " + hex1 + "a");
                    break;

                case 'DX':
                    binF.text(bin + "0111" + " " + bin1 + "1011");
                    hexF.text(hex + "7" + " " + hex1 + "b");
                    break;

                case 'SP':
                    binF.text(bin + "0111" + " " + bin1+ "1100");
                    hexF.text(hex + "f" + " " + hex1 + "c");
                    break;

                case 'BP':
                    binF.text(bin + "0111" + " " + bin1 + "1101");
                    hexF.text(hex + "7" + " " + hex1 + "d");
                    break;

                case 'SI':
                    binF.text(bin + "0111" + " " + bin1 + "1110");
                    hexF.text(hex + "7" + " " + hex1 + "e");
                    break;

                case 'DI':
                    binF.text(bin + "0111" + " " + bin1 + "1111");
                    hexF.text(hex + "f" + " " + hex1+ "f");
                    break;

                case 'AL':
                    binF.text(bin + "0110" + " " + bin1 + "1000");
                    hexF.text(hex + "6" + " " + hex1 + "8");
                    break;

                case 'CL':
                    binF.text(bin + "0110" + " " + bin1 + "1001");
                    hexF.text(hex + "6" + " " + hex1 + "9");
                    break;
                
                case 'BL':
                    binF.text(bin + "0110" + " " + bin1 + "1010");
                    hexF.text(hex + "6" + " " + hex1 + "a");
                    break;

                case 'DL':
                    binF.text(bin + "0110" + " " + bin1 + "1011");
                    hexF.text(hex + "6" + " " + hex1 + "b");
                    break;

                case 'AH':
                    binF.text(bin + "0110" + " " + bin1 + "1100");
                    hexF.text(hex + "6" + " " + hex + "c");
                    break;

                case 'CH':
                    binF.text(bin + "0110" + " " + bin1 + "1101");
                    hexF.text(hex + "6" + " " + hex1 + "d");
                    break;

                case 'DH':
                    binF.text(bin + "0110" + " " + bin1 + "1110");
                    hexF.text(hex + "6" + " " + hex1 + "e");
                    break;

                case 'BH':
                    binF.text(bin + "0110" + " " + bin1 + "1111");
                    hexF.text(hex + "6" + " " + hex1 + "f");
                    break;

                default: errorMsg("Invalid mnemonics");
            }
        }else {
            errorMsg("Invalid mnemonics");
        }

    }

    function jbe(before, after){
        var inputOne = before;
           var firstPart = inputOne.substr(0,3);
           var z = inputOne.search(/JBE/i);
           var otherPart = inputOne.substr(4,3);
           var otherPartInt = parseInt(otherPart);

           var secondInput = after;
           secondInputInt = parseInt(secondInput);
           var subtract;
        
            if ((otherPartInt) > (secondInputInt)){ 
                subtract = (otherPartInt) - (secondInputInt);
            }else{   subtract = (secondInputInt) - (otherPartInt);}		   
		 
           var divide =  subtract / 2 ;
           var eben = 255 -  (divide);
           var bindec = 118;
           var binbin = bindec.toString(2);
           var binhex = bindec.toString(16);

          var boy = eben.toString(16);
          var  girl =eben.toString(2);
            if((z >= 0) && (otherPartInt >= 0)){


                binF.text(girl + " " + " " + " "+ binbin);
                hexF.text(boy + " " + " " + " " + binhex); 
            }else{
                errorMsg('invalid input');
            }
    }

    function loope(before, after){
        var inputOne = before

        var z = inputOne.search(/LOOPE/i);

        var otherPart = inputOne.substr(6,3);
        var otherPartInt = parseInt(otherPart);

        var secondInput = after;
        secondInputInt = parseInt(secondInput);

        var subtract = (secondInputInt) - (otherPartInt );
        var divide =  subtract / 2 ;
        var eben = 255 -  (divide);
        var bindec = 225;
        var binbin = bindec.toString(2);
        var binhex = bindec.toString(16);

        var boy = eben.toString(16);
        var  girl =eben.toString(2);
            if((z >= 0) && (otherPartInt >= 0)){
                binF.text(girl + "" + "" + "/" + binbin);
                hexF.text(boy + " " + " " + "" + binhex);
            }
            else{
                errorMsg('invalid input');
            }
    }

    function mul(code){
        dec = 15;
        dec1= 14;
        hex1= dec1.toString(16)
        bin1= dec1.toString(2);
        bin = dec.toString(2);
        hex = dec.toString(16);
        r = code.trim();
        var x = r.substr(4, 2);
        var m = r.substr(0,3).toString().toUpperCase();
        var y = x.toUpperCase();

        if (m == "MUL" ){
            switch (y) {
                case 'AX':
                    binF.text(bin + "0111" + " " + bin1 + "0000");
                    hexF.text(hex + "7" + " " + hex1 + "0");
                    break;
                case 'CX':
                    binF.text(bin + "0111" + " " + bin1 + "0001");
                    hexF.text(hex + "7" + " " + hex1 + "1");
                    break;
                case 'BX':
                    binF.text(bin + "0111" + " " + bin1 + "0010");
                    hexF.text(hex + "7" + " " + hex1 + "2");
                    break;
                case 'DX':
                    binF.text(bin + "0111" + " " + bin1 + "0011");
                    hexF.text(hex + "7" + " " + hex1 + "3");
                    break;
                case 'SP':
                    binF.text(bin + "0111" + " " + bin1 + "0100");
                    hexF.text(hex + "7" + " " + hex1 + "4");
                    break;
                case 'BP':
                    binF.text(bin + "0111" + " " + bin1 + "0101");
                    hexF.text(hex + "7" + " " + hex1 + "5");
                    break;
                case 'SI':
                    binF.text(bin + "0111" + " " + bin1 + "0110");
                    hexF.text(hex + "7" + " " + hex1 + "6");
                    break;
                case 'DI':
                    binF.text(bin + "0111" + " " + bin1 + "0111");
                    hexF.text(hex + "7" + " " + hex1 + "7");
                    break;
                case 'AL':
                    binF.text(bin + "0110" + " " + bin1 + "0000");
                    hexF.text(hex + "6" + " " + hex1 + "0");
                    break;
                case 'CL':
                    binF.text(bin + "0110" + " " + bin1 + "0001");
                    hexF.text(hex + "6" + " " + hex1 + "1");
                    break;
                case 'BL':
                    binF.text(bin + "0110" + " " + bin1 + "0010");
                    hexF.text(hex + "6" + " " + hex1 + "2");
                    break;
                case 'DL':
                    binF.text(bin + "0110" + " " + bin1 + "0011");
                    hexF.text(hex + "6" + " " + hex1 + "3");
                    break;
                case 'AH':
                    binF.text(bin + "0110" + " " + bin1 + "0100");
                    hexF.text(hex + "6" + " " + hex1 + "4");
                    break;
                case 'CH':
                    binF.text(bin + "0110" + " " + bin1 + "0101");
                    hexF.text(hex + "6" + " " + hex1 + "5");
                    break;
                case 'DH':
                    binF.text(bin + "0110" + " " + bin1 + "0110");
                    hexF.text(hex + "6" + " " + hex1 + "6");
                    break;
                case 'BH':
                    binF.text(bin + "0110" + " " + bin1 + "0111");
                    hexF.text(hex + "6" + " " + hex1 + "7");
                    break;
                default:
                    errorMsg("INCORRECT INPUT !!!");
            }
        }else{
            errorMsg("PLEASE ENTER THE CORRECT INSTRUCTION SET 'MUL'");
        }
    }

    function daa(code){
        var input = code;
        var searchInput = input.toUpperCase();
        var dec = 39;
        var bin = dec.toString(2);
        var hex = dec.toString(16);

       if(searchInput == "DAA" && isNaN(searchInput) ) {
           binF.text("00" + bin);
           hexF.text(hex);
       }else{
           errorMsg(" input valid instruction set");

       }
    }

    function cwd(code){

        var thecode=code;
        var codeword=thecode.substring(0,3).toUpperCase();
        if(thecode == ""){
            errorMsg("this field cannot be empty");
        }
        else if(codeword !="CWD"){
            errorMsg("Wrong Mnemonic");
        } else{
            hexF.text("99");
            binF.text("1001 1001");
        }
    }

    function je(before, after){
        var inputOne = before;
        var firstPart = inputOne.substr(0,3);
        var z = inputOne.search(/JE/i);
        var otherPart = inputOne.substr(4,3);
        var otherPartInt = parseInt(otherPart);

        var secondInput = after
        secondInputInt = parseInt(secondInput);

        var subtract = (secondInputInt) - (otherPartInt );
        var divide =  subtract / 2 ;
        var eben = 255 -  (divide);
        var bindec = 116;
        var binbin = bindec.toString(2);
        var binhex = bindec.toString(16);

        var boy = eben.toString(16);
        var  girl =eben.toString(2);
        if((z >= 0) && (otherPartInt >= 0)) {
            binF.text(girl + "" + "" + "/" + binbin);
            hexF.text(boy + " " + " " + "" + binhex);
        } else{
            errorMsg('invalid input');
        }

    }

    function hlt(code){
        x = code.toUpperCase();
        var y = x.substr(0,3).toString().toUpperCase();

     if (y=="HLT"){
        dec = 244;
        bin = dec.toString(2);
        hex = dec.toString(16).toUpperCase();
        binF.text(bin);
        hexF.text(hex);
     }else{
        errorMsg('invalid instruction set');
     }
    }

    function jle(before, after){
        var inputOne = before;
        var firstPart = inputOne.substr(0,3);
        var z = inputOne.search(/JLE/i);
        var otherPart = inputOne.substr(4,3);
        var otherPartInt = parseInt(otherPart);

        var secondInput = after;
        secondInputInt = parseInt(secondInput);

        var subtract = (secondInputInt) - (otherPartInt );
        var divide =  subtract / 2 ;
        var eben = 255 -  (divide);
        var bindec = 126;
        var binbin = bindec.toString(2);
        var binhex = bindec.toString(16);

        var boy = eben.toString(16);
        var  girl =eben.toString(2);
           if((z >= 0) && (otherPartInt >= 0))
           {
                binF.text(binbin+ " " + " " + "" +  girl);
                hexF.text(binhex+ " " + " " + "" + boy);
           }else{
                errorMsg('invalid input');
           }

    }

    function jo(before, after){
        var inputOne = before;
        var firstPart = inputOne.substr(0,2);
        var z = inputOne.search(/JO/i);
        var otherPart = inputOne.substr(3,3);
        var otherPartInt = parseInt(otherPart);

        var secondInput = after;
        secondInputInt = parseInt(secondInput);

        var subtract = (secondInputInt) - (otherPartInt );
        var divide =  subtract / 2 ;
        var eben = 255 -  (divide);
        var bindec = 112;
        var binbin = bindec.toString(2);
        var binhex = bindec.toString(16);

        var boy = eben.toString(16);
        var girl =eben.toString(2);
           if((z >= 0) && (otherPartInt >= 0)){
               binF.text(binbin+ " " + " " + "" + girl);
               hexF.text(binhex + " " + " " + "" + boy);
           }

        else{
             errorMsg('invalid input');
           }
    }

    function diff_in(code){
        code = code.toUpperCase();
        if(code.substring(0,3)==="INC"){
            inc(code);
        }else if(code.substring(0,3)==="IN "){
            IN(code);
        }else if(code.substring(0,4)==="INT "){
            int(code);
        }else if(code.substring(0,4)==="INTO"){
            into(code);
        }
    }

    function inc(code){
        error (); 
        var checkhigh= assemble(); 
        var regh = checkhigh.substring(4,6);
        var binl = "01000";   
        var hexl = "4";     

        if ( regh == "AX" || regh == "ax" ){
            binl = binl + "000";
            hexl = hexl + "0";
            binF.text(binl);
            hexF.text(hexl);   
        }else if ( regh == "CX" || regh == "cx" ){
            binl = binl + "001";
            hexl = hexl + "1";
            binF.text(binl);
            hexF.text(hexl);   
        }else if ( regh == "DX" || regh == "dx" ){
            binl = binl + "010";
            hexl = hexl + "2";
            binF.text(binl);
            hexF.text(hexl);   
        }else if ( regh == "BX" || regh == "bx" ){
            binl = binl + "011";
            hexl = hexl + "3";
            binF.text(binl);
            hexF.text(hexl);   
        }else if ( regh == "SP" || regh == "sp" ){
            binl = binl + "100";
            hexl = hexl + "4";
            binF.text(binl);
            hexF.text(hexl);   
        }else if ( regh == "BP" || regh == "bp" ){
            binl = binl + "101";
            hexl = hexl + "5";
            binF.text(binl);
            hexF.text(hexl);  
        }else if ( regh == "SI" || regh == "si" ){
            binl = binl + "110";
            hexl = hexl + "6";
            binF.text(binl);
            hexF.text(hexl);   
        }else if ( regh == "DI" || regh == "di" ){
            binl = binl + "111";
            hexl = hexl + "7";
            binF.text(binl);
            hexF.text(hexl);   
        }else{
            errorMsg("Invalid Mnemonic form.");
        }

        function assemble(){
            var cod = code; 
            return cod;  
        }

        function error(){
            var checkcod = assemble();
            var mnemonic = checkcod.substring(0,3);
            var checkInc = mnemonic.toUpperCase();    
            if (checkInc != "INC")
            {
                errorMsg("sorry, you are only allowed to convert mnemonic INC");
            }
            else{
                var space = checkcod.substring(3,4);
                if ( space != " "){
                    errorMsg("sorry, there is supposed to be a space before the operand");
                }
            }
        }

        function start(){
            error(); 
            var getcod = assemble();
            var checkreg = getcod.substring(4,6); 
            var w = "0" ;  
            var mod = "11"; 
            var hex= "FE" + " " + "C";    
            var bin= "1111111" + w + " " + mod + "000";   

            if ( checkreg == "AL" || checkreg == "al" ){  
                bin = bin + "000";
                hex = hex + "0"  ;
                binF.text(bin);
                hexF.text(hex);  
            }else if ( checkreg == "CL" || checkreg == "cl" ){
                bin = bin + "001";
                hex = hex + "1"  ;
                binF.text(bin);
                hexF.text(hex);   
            }else if ( checkreg == "DL" || checkreg == "dl" ){
                bin = bin + "010";
                hex = hex + "2"; 
                binF.text(bin);
                hexF.text(hex); 
            } else if ( checkreg == "BL" || checkreg ==  "bl" ){
                bin = bin + "011";
                hex = hex + "3";
                binF.text(bin);
                hexF.text(hex); 
            }else if ( checkreg == "AH" || checkreg == "ah" ){
                bin = bin + "100";
                hex = hex + "4";
                binF.text(bin);
                hexF.text(hex);
            }else if ( checkreg == "CH" || checkreg == "ch" ){
                bin = bin + "101";
                hex = hex + "5"; 
                binF.text(bin);
                hexF.text(hex); 
            }else if ( checkreg == "DH" || checkreg == "dh" ){
                bin = bin + "110";
                hex = hex + "6";  
                binF.text(bin);
                hexF.text(hex); 
            }else if ( checkreg == "BH" || checkreg == "bh" ){
                bin = bin + "111";
                hex = hex + "7";
                binF.text(bin);
                hexF.text(hex); 
            }else{
                errorMsg("Invalid Mnemonic form.");
            }
        }  
    }

    function jmp(before, after){
        var inputOne = before.trim();
        var firstPart = inputOne.substr(0,3);
        var z = inputOne.search(/JMP/i);

        var otherPart = inputOne.substr(4,3);
        var otherPartInt = parseInt(otherPart);

        var secondInput = after;
        secondInputInt = parseInt(secondInput);

        var subtract = (secondInputInt) - (otherPartInt );
        var divide =  subtract / 2 ;
        var eben = 255 -  (divide);
        var bindec = 235;
        var binbin = bindec.toString(2);
        var binhex = bindec.toString(16);

        var boy = eben.toString(16);
        var  girl =eben.toString(2);
        if((z >= 0) && (otherPartInt >= 0)){
            binF.text(girl + "" + "" + "/" + binbin);
            hexF.text(boy + " " + " " + "" + binhex);
        }else{
            errorMsg('invalid input');
        }
    }

    function scasw(code){
        var dec, hex, bin, x, y, hex1, bin1;
        dec = 174;
        dec1 = 175;
        bin = dec.toString(2);
        bin1 = dec1.toString(2);
        hex = dec.toString(16);
        hex1 = dec1.toString(16);
        x = code.trim();
        var r = x.substr(5, 2).toString().toUpperCase()
        var m = x.substr(0,4).toString().toUpperCase();
        y = m.toUpperCase();
        if (m = "SCAS") {
            switch(r){
                case 'AX':
                case 'BX':
                case 'CX':
                case 'DX':
                case 'SP':
                case 'BP':
                case 'SI':
                case 'DI':
                    binF.text(bin1);
                    hexF.text(hex1);
                    break;
                case 'AL':
                case 'BL':
                case 'CL':
                case 'DL':
                case 'AH':
                case 'BH':
                case 'CH':
                case 'DH':
                    binF.text(bin);
                    hexF.text(hex);
                    break;
                default:
                    errorMsg("Invalid Instruction set!!!");
            }
        }else{
            errorMsg("Invalid Instruction set. Make sure its 'SCAS'");
        }
    }

    function jp(before, after){
        var inputOne = before;
        var z = inputOne.search(/JP/i);
        var otherPart = inputOne.substr(4,2);
        var otherPartInt = parseInt(otherPart);

        var secondInput = after;
        secondInputInt = parseInt(secondInput);

        var subtract = (secondInputInt) - (otherPartInt );
        var divide =  subtract / 2 ;
        var eben = 255 -  (divide);
        var bindec = 122;
        var binbin = bindec.toString(2);
        var binhex = bindec.toString(16);

        var boy = eben.toString(16);
        var girl =eben.toString(2);
           if((z >= 0) && (otherPartInt >= 0)){
               binF.text(girl + "" + "" + "/" + binbin);
               hexF.text(boy + " " + " " + "" + binhex);
           }else{
              errorMsg('invalid input');
           }
    }

    function jnz(code){
        function pad(string, padstr, length) {
            while(string.length < length) {
                string = padstr + string;
            }
            return string;
        }
        var regb = {"AX":"0","AL":"0","CX":"1","CL":"1","DX":"2","DL":"2","BX":"3","BL":"3","SP":"4","AH":"4","BP":"5","CH":"5","SI":"6","DH":"6","DI":"7","BH":"7"};
        var value = code.toUpperCase();
        if (regb[value.substring(4)] && value.substring(0,4) == "JNZ ") {
            var rega = regb[value.substring(4)];
            binF.text("01110101 " + pad((+rega).toString(2), 0, 8));
            hexF.text("75 " + "0" + (+rega));
        }else {
            errorMsg("Incomplete mnemonic or instruction");
        }
    }

    function jnle(before, after){
        var inputOne = before;
        var firstPart = inputOne.substr(0,4);
        var z = inputOne.search(/JNLE/i);
        var otherPart = inputOne.substr(5,3);
        var otherPartInt = parseInt(otherPart);

        var secondInput = after;
        secondInputInt = parseInt(secondInput);

        var subtract = (secondInputInt) - (otherPartInt );
        var divide =  subtract / 2 ;
        var eben = 255 -  (divide);
        var bindec = 127;
        var binbin = bindec.toString(2);
        var binhex = bindec.toString(16);

        var boy = eben.toString(16);
        var  girl =eben.toString(2);
           if((z >= 0) && (otherPartInt >= 0))
           {
               binF.text(girl + "" + "" + "/" + binbin); 
               hexF.text(boy + " " + " " + "" + binhex);
           }else{
                errorMsg('invalid input');
            }
    }

    function imul(code){
    var test = code.toUpperCase();
    var testIMUL = test.search(/IMUL/i);
    var firstPart = test.substr(5,2);
    var firstOp = firstPart.search(/ax/i);
    var firstOp1 = firstPart.search(/al/i);
    var comma = test.substr(7,1);
    var secondPart = test.substr(8,code.length);
        secondPart = secondPart.trim(" ");
        if ((testIMUL>=0)&&(firstOp>=0)){
            if (secondPart=="AX"){
                var bin1="11110111";
                var bin2="11101000";
                var hex1=parseInt(bin1,2).toString(16);
                var hex2=parseInt(bin2,2).toString(16);
                
                binF.text(bin1+" "+bin2);
                hexF.text(hex1+" "+hex2);
            }
            else if (secondPart=="BX"){
                var bin1="11110111";
                var bin2="11101011";
                var hex1=parseInt(bin1,2).toString(16);
                var hex2=parseInt(bin2,2).toString(16);
                
                binF.text(bin1+" "+bin2);
                hexF.text(hex1+" "+hex2);
            }
            else if (secondPart=="CX"){
                var bin1="11110111";
                var bin2="11101001";
                var hex1=parseInt(bin1,2).toString(16);
                var hex2=parseInt(bin2,2).toString(16);
                
                binF.text(bin1+" "+bin2);
                hexF.text(hex1+" "+hex2);
            }
            else if (secondPart=="DX"){
                var bin1="11110111";
                var bin2="11101010";
                var hex1=parseInt(bin1,2).toString(16);
                var hex2=parseInt(bin2,2).toString(16);
                
                binF.text(bin1+" "+bin2);
                hexF.text(hex1+" "+hex2);
            }
            else if (secondPart=="SP"){
                var bin1="11110111";
                var bin2="11101100";
                var hex1=parseInt(bin1,2).toString(16);
                var hex2=parseInt(bin2,2).toString(16);
                
                binF.text(bin1+" "+bin2);
                hexF.text(hex1+" "+hex2);
            }
            else if (secondPart=="BP"){
                var bin1="11110111";
                var bin2="11101101";
                var hex1=parseInt(bin1,2).toString(16);
                var hex2=parseInt(bin2,2).toString(16);
                
                tbinF.text(bin1+" "+bin2);
                hexF.text(hex1+" "+hex2);
            }
            else if (secondPart=="SI"){
                var bin1="11110111";
                var bin2="11101110";
                var hex1=parseInt(bin1,2).toString(16);
                var hex2=parseInt(bin2,2).toString(16);
                
                binF.text(bin1+" "+bin2);
                hexF.text(hex1+" "+hex2);
            }
            else if (secondPart=="DI"){
                var bin1="11110111";
                var bin2="11101111";
                var hex1=parseInt(bin1,2).toString(16);
                var hex2=parseInt(bin2,2).toString(16);
                
                binF.text(bin1+" "+bin2);
                hexF.text(hex1+" "+hex2);
        
            }
            
        }else if((testIMUL>=0)&&(firstOp1>=0)){
            if (secondPart=="AL"){
                var bin1="11110110";
                var bin2="11101000";
                var hex1=parseInt(bin1,2).toString(16);
                var hex2=parseInt(bin2,2).toString(16);
                
                binF.text(bin1+" "+bin2);
                hexF.text(hex1+" "+hex2);
            }
            else if (secondPart=="BL"){
                var bin1="11110110";
                var bin2="11101011";
                var hex1=parseInt(bin1,2).toString(16);
                var hex2=parseInt(bin2,2).toString(16);
                
                binF.text(bin1+" "+bin2);
                hexF.text(hex1+" "+hex2);
            }
            else if (secondPart=="CL"){
                var bin1="11110110";
                var bin2="11101001";
                var hex1=parseInt(bin1,2).toString(16);
                var hex2=parseInt(bin2,2).toString(16);
                
                binF.text(bin1+" "+bin2);
                hexF.text(hex1+" "+hex2);
            }
            else if (secondPart=="DL"){
                var bin1="11110110";
                var bin2="11101010";
                var hex1=parseInt(bin1,2).toString(16);
                var hex2=parseInt(bin2,2).toString(16);
                
                binF.text(bin1+" "+bin2);
                hexF.text(hex1+" "+hex2);
            }
            else if (secondPart=="AH"){
                var bin1="11110110";
                var bin2="11101100";
                var hex1=parseInt(bin1,2).toString(16);
                var hex2=parseInt(bin2,2).toString(16);
                
                binF.text(bin1+" "+bin2);
                hexF.text(hex1+" "+hex2);
            }
            else if (secondPart=="CH"){
                var bin1="11110110";
                var bin2="11101101";
                var hex1=parseInt(bin1,2).toString(16);
                var hex2=parseInt(bin2,2).toString(16);
                
                binF.text(bin1+" "+bin2);
                hexF.text(hex1+" "+hex2);
            }
            else if (secondPart=="DH"){
                var bin1="11110110";
                var bin2="11101110";
                var hex1=parseInt(bin1,2).toString(16);
                var hex2=parseInt(bin2,2).toString(16);
                
                binF.text(bin1+" "+bin2);
                hexF.text(hex1+" "+hex2);
            }
            else if (secondPart=="BH"){
                var bin1="11110110";
                var bin2="11101111";
                var hex1=parseInt(bin1,2).toString(16);
                var hex2=parseInt(bin2,2).toString(16);
                
                binF.text(bin1+" "+bin2);
                hexF.text(hex1+" "+hex2);
        
        }
            else{
                errorMsg("Invalid Mnemonic format");
            }
        

        
        }
    }

    function iret(code){
        var bin0,hex0,dec;
        dec =207;
        bin0= dec.toString(2);
        hex0 = dec.toString(16);
        var b = code;
        var i =b.search("/IRET/i");

        if( b=="IRET" || b=="iret"){
            binF.text(bin0);
            hexF.text(hex0);
        }
        else{
            errorMsg("Invalid Command");
        }
    }

    function jcxz(code){
        function toHex(str) {
            var hex = '';
            for(var i=0;i<str.length;i++) {
               hex += ''+str.charCodeAt(i).toString(16);
            }
            return hex;
            }
        
            if (code=='jcxz'||code=='JCXZ'){
                for (var i = 0; i < code.length; i++) {
                    var result;
                    result += code[i].charCodeAt(0).toString(2) + " ";
                    binF.text(result);  
                    }
                 hexF.text(toHex(code));  
            }else{
                 errorMsg('Error: Command not correct');       
            }
    }

    function cld(code){
        var check = code;
        
        if (check=="CLD"||check=="cld"){
            
            var binary = "11111100"; 
            var hexadecimal =  parseInt(binary, 2).toString(16); 
            
            hexF.text(hexadecimal);
            binF.text(binary);
            
        }
        else {
           errorMsg("Invalid Input");
             }
    }

    function call(before, after){
        var first = after;
        var last = before;
        var last1 = last.substring(5); 
        var ff = "11111111";
    
        var Register = /(AX|BX|CX|DX|SI|SP)/i,
            Number = /[0-9]/i,
            Hex = /(A|B|C|D|E|F)/i,
            Call = /CALL/i,
            Space = / /i,
            
            testCall = last.search(Call),
            testSpace = last.search(Space),
            testRegisterL1 = last1.search(Register),
            testNumberL1 = last1.search(Number),
            testHexL1 = last1.search(Hex),
            testNumberF1 = first.search(Number),
            testHexF1 = first.search(Hex);
        
        if (testCall == 0 && testSpace == 4){
            
            if (testRegisterL1 >=0 && first == ""){
                if (last1=="AX"||last1=="ax"){
                    var ax = "11010000";
                    var ax3 = parseInt(ff,2).toString(16);
                    var ax2 = parseInt(ax,2).toString(16);
                    binF.text(ff + " " + ax);
                    hexF.text(ax3 +" "+ ax2);
                }else if(last1=="BX"||last1=="bx"){
                    var bx = "11010011";
                    var bx3 = parseInt(ff,2).toString(16);
                    var bx2 = parseInt(bx,2).toString(16);
                    bin.F.text(ff + " " + bx);
                    hexF.text(bx3 +" "+ bx2);
            }else if (last1=="CX"||last1=="cx"){
                    var cx = "11010001";
                    var cx3 = parseInt(ff,2).toString(16);
                    var cx2 = parseInt(cx,2).toString(16);
                    binF.text(ff + " " + cx);
                    hexF.text(cx3 +" "+ cx2);
            } else if (last1=="DX"||last1=="dx"){
                    var dx = "11010010";
                    var dx3 = parseInt(ff,2).toString(16);
                    var dx2 = parseInt(dx,2).toString(16);
                    binF.text(ff + " " + dx);
                    hexF.text(dx3 +" "+ dx2);
            }else if (last1=="SI"||last1=="si"){
                    var ex = "11010110";
                    var ex3 = parseInt(ff,2).toString(16);
                    var ex2 = parseInt(ex,2).toString(16);
                    binF.text(ff + " " + ex);
                    hexF.text(ex3 +" "+ ex2);
            }else if (last1=="[SI]"||last1=="[si]"){
                    var fx = "00010100";
                    var fx3 = parseInt(ff,2).toString(16);
                    var fx2 = parseInt(fx,2).toString(16);
                    binF.text(ff + " " + fx);
                    hexF.text(fx3 +" "+ fx2);
            }else if (last1=="[BX]"||last1=="[bx]"){
                    var gx = "00010111";
                    var gx3 = parseInt(ff,2).toString(16);
                    var gx2 = parseInt(gx,2).toString(16);
                    binF.text(ff + " " + gx);
                    hexF.text(gx3 +" "+ gx2);
            }else if (last1=="[BX+SI]"||last1=="[bx+si]"){
                    var hx = "00010000";
                    var hx3 = parseInt(ff,2).toString(16);
                    var hx2 = parseInt(hx,2).toString(16);
                    binF.text(ff + " " + hx);
                    hexF.text(hx3 +" "+ hx2);
            }   
        }else if ( (testNumberL1 >= 0 || testHexL1 >= 0) && (testNumberF1 >= 0 || testHexF1 >= 0) ){
                    var E = "11101000";
                    var E1 = parseInt(E,2).toString(16);
                    var thr = "03";
                    var thr1 = parseInt(thr,2).toString(16);
                    var thr2 = parseInt(thr1);
                    var first1 = parseInt(first);
                    var last2 = parseInt(last1);
                        if (last2 > first1){
                        var f1 = parseInt(first1,16).toString(2);
                        var l1 = parseInt(last2,16).toString(2); 
                        var f2 = parseInt(f1);  
                        var l2 = parseInt(l1); 
                        var fl = f2 - l2;
                        var fl1 = fl - thr2;
                        var fl2 = parseInt(fl1,2).toString(16);
                        binF.text(E + " " + fl1);
                        hexF.text(E1 + " " + fl2);
                        }else{
                            errorMsg("Invalid Command");
                             }          
                 }else {
                    errorMsg("Please Enter a CALL instruction==");}
        }else{
            errorMsg("Invalid");}
    }

    function IN(code){
        var input = code;
        var word = (input.substring(3,5) === "AL") ? 0 : 1;
        var port = input.substring(7);
        var hex;
        var bin;

        if(!input.match(/^IN\s(AL|AX),\s(DX|[0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])$/)) {
            errorMsg("Incorrect instruction");
        }else if(port == "DX") {
            dec = 236 + word;
            bin = dec.toString(2);
            hex = dec.toString(16).toUpperCase();
        }else {
            dec = Number(port) + word;
            bin = dec.toString(2) + " " + pad((+port).toString(2), 0, 8);
            hex = dec.toString(16).toUpperCase() + " " + pad((+port).toString(16).toUpperCase());
        }
        hexF.text(hex);
        binF.text(bin);

        function pad(string, padstr, length) {
            while(string.length < length) {
                string = padstr + string;
            }
            return string;
        }
    }

    function aam(code){
        p = code;
        if (p == "AAM" || p =="aam"){
            bin = "11010100";
            bin2 = "00001010";
            hex = parseInt(bin,2).toString(16);
            hex2 = parseInt(bin2,2).toString(16);
            
            binValue = bin +" " + bin2;
            hexValue = hex +" "+"0"+ hex2;

            binF.text(binValue);
            hexF.text(hexValue);
        }
        else if (p != "AAM"){
            errorMsg("The mnemonic is invalid");
        }
    }

    function jnbe(before, after){
        var first = before;
        var first2 = before.substring(4,7);
        var hexto = parseInt(first2);
        var txtJNBE = before.substring(0,4);
        var last = after;
        
        if(txtJNBE == "JNBE" || txtJNBE == "jnbe"){
            var last2 = parseInt(last);
            var last3 = parseInt(last,16).toString(16);
            var last4 = parseInt(last3,16);
            var two="1";
            var twoo= parseInt(two,10).toString(16);
            var twooo= parseInt(twoo,16);
            var binb = (twooo+last2);
            var bina = binb - hexto;
            var bina2 = parseInt(bina,16).toString(2);
            var ff = "11111111";
            var disp = "01110110";
            var disp2 = ff - bina2;
            var disp3 = parseInt(disp2,2).toString(16);
            var disp4 = parseInt(disp,2).toString(16);
            
            bin = disp +" "+ disp2;
            hex = disp4 +" "+ disp3;

            binF.text(bin);
            hexF.text(hex);
        }else if(txtJNBE != "JNBE"){
            errorMsg.text("Invalid code");
            }
    }

    function aad(code){
        var input = code;

        var otherpart = input.substring(4);
        testOP = parseInt(otherpart);
        testAAD = input.search(/AAD/i); 

        if (input=="AAD"|| input =="aad"||(testAAD >= 0)&&(testOP >= 0)){ 

            var binary1 = "11010101"; 
            var binary2 = "0000"; 
            var binary3 = "1010"; 
            var hexa1 = parseInt(binary1,2).toString(16); 
            var hexa2 = parseInt(binary2,2).toString(16); 
            var hexa3 = parseInt(binary3,2).toString(16); 

            bin = binary1 + " " + binary2 + binary3; 
            hex = hexa1 + " " + hexa2 + hexa3;

            binF.text(bin);
            hexF.text(hex);
        }else{
            errorMsg("Invalid input");
        }
    }

    function lodsb(code){
        var otherpart = code.substring(6);
        testOP = parseInt(otherpart);
        testAAD = code.search(/LODSB/i);

        x = code.trim().toUpperCase();
        if (x=="LODSB" || testOP >= 0)
        {
            dec = 172;
            bin = dec.toString(2);
            hex = dec.toString(16).toUpperCase();
            hexF.text(hex);
            binF.text(bin);
        }else{
            errorMsg('invalid instruction set');
        }
    }
    
    function lds(code){
        var ax, bp;
        var datainput = code.trim();
        var str = datainput.substr(0, 3).toString().toUpperCase();
        var mem = datainput.substr(7, datainput.length).toString().toUpperCase();
        if (str == "LDS"||str == "lds") {
            if (mem != "" ) {
                var x = datainput.substr(4, 2);
                var y = x.toString().toUpperCase();
                switch (y) {
                    case 'AX':
                        ax = "1100010100000000";
                        bp = "C5 00";
                        break;
                    case 'BX':
                        ax = "1100010100011000";
                        bp = "C5 18";
                        break;
                    case 'CX':
                        ax = "1100010100001000";
                        bp = "C5 08";
                        break;
                    case 'DX':
                        ax = "1100010100010000";
                        bp = "C5 10";
                        break;
                    case 'BP':
                        ax = "1100010100101000";
                        bp = "C5 28";
                        break;
                    case 'DI':
                        ax = "1100010100111000";
                        bp = "C5 38";
                        break;
                    case 'SI':
                        ax = "1100010100110000";
                        bp = "C5 30";
                        break;
                    case 'SP':
                        ax = "1100010100100000";
                        bp = "C5 20";
                        break;

                    default:
                    errorMsg("Invalid Command");
                } 
                binF.text(ax);
                hexF.text(bp);
            }
            else {
                errorMsg("Error, No memory detected");

            }
        }
        else {
            errorMsg("Wrong Instruction inputed");

        }
    }

    function dec(code){

            var x = code;
            x = x.trim();
            var y = x.includes(" ");
            var zopen = x.includes("[");
            var zclose = x.includes("]");
            (y || (zopen === true && zclose === true)) ? compare(x) : errorMsg("Invalid instruction");

        function menmonics(instr) {
            var first, second, third;
            instr.toUpperCase();
            if (instr.includes('BX')) {
                first = instr.includes('BX+');
                second = instr.includes('BX+SI');
                third = instr.includes('BX+DI');
    
                (first && (second || third)) ? (true) : (false);
            }
            else if (instr.includes('BP')) {
                first = instr.includes('BP+');
                second = instr.includes('BP+SI');
                third = instr.includes('BP+DI');
    
                (first && (second || third)) ? (true) : (false);
            }
        }
    
        function generate(instr, instrlength) {
            instr = instr.trim();
            switch (instr.length) {
                case 3: wordreg(instr); break;
                case 9: menmonics(instr); break;
                default:
                    errorMsg("Invalid instruction");
            }
        }
    
        function wordreg(instr) {
            var n, o;
            ;
            instr = instr.trim().toLowerCase();
            switch (instr) {
                case 'ax':
                    n = "01001000";
                    o = "48";
                    break;
                case 'cx':
                    n = '01001001';
                    o = '49';
                    break;
                case 'dx':
                    n = '01001010';
                    o = '4A';
                    break;
                case 'bx':
                    n = '01001011';
                    o = '4B';
                    break;
                case 'sp':
                    n = '01001100';
                    o = '4C';
                    break;
                case 'bp':
                    n = '01001101';
                    o = '4D';
                    break;
                case 'si':
                    n = '01001110';
                    o = '4E';
                    break;
                case 'di':
                    n = '01001111';
                    o = '4F';
                    break;
                case 'al':
                    n = '1111111011001000'
    
                    o = 'FE C8';
    
                    break;
                case 'cl':
                    n = '1111111011001001'
    
                    o = 'FE C9';
    
                    break;
                case 'dl':
                    n = '1111111011001010'
    
                    o = 'FE CA';
    
                    break;
                case 'bl':
                    n = '1111111011001011'
    
                    o = 'FE CB';
    
                    break;
                case 'ah':
                    n = '1111111011001100'
    
                    o = 'FE CC';
    
                    break;
                case 'ch':
                    n = '1111111011001101'
    
                    o = 'FE CD';
    
                    break;
                case 'dh':
                    n = '1111111011001110'
    
                    o = 'FE CE';
    
                    break;
                case 'bh':
                    n = '1111111011001111'
    
                    o = 'FE CF';
    
                    break;
                default:
                    errorMsg("invalid or incomplete mnemonics or instruction");
            }
            binF.text(n);
            hexF.text(o);
        }
    
        function compare(x) {
            var y = x.substring(0, 3).toString().toUpperCase();
            switch (y) {
                case "DEC":
                    generate(x.substring(3, x.length), x.length);
                    break;
                default:
                    errorMsg("Invalid instruction");
            }
        }
    }

    function jnc(before, after){

            first = before.slice(0, 3);
            second = before.slice(3, before.length);
            third = after;

                temp = parseInt(second) + parseInt(third);
                answer = 255 - temp;
                ansBin = dec2bin(answer);
                ansHex = answer.toString(16)
               
                binF.text(ansBin);
                hexF.text(ansHex);
        
        function dec2bin(dec) {
            return (parseInt(dec, 10) >>> 0).toString(2);
        }
    }

    function sbb(code){
        resetRes(); //Reset Results Field
        
        var code = code, // Get instruction from user
            resRegMem = "000110",   //Result format for Register/Memory with Register TO either
            resImRegMem = "100000",//" "+data,   //Result formmat for Immediate to Register/Memory
            resImAcc = "000111";//+w+" "+data+dataw;                  // Result format for Immediate to Accumulator
        
        var testAdd = code.search(/SBB/i), // Test for SBB
                  e = code.search(/ /i); // Get end of Opcode
        
        if ((testAdd >= 0)&&(e == 3)){
            
            var codeLength = code.length,
                sp1 = code.search(/,/i), // First operand stops here
                op1 = code.substring(4,sp1).trim(), // Get First Operand
                op2 = code.substring(sp1+2,codeLength).trim(); // Get Second Operand
                
            testHR = /(AX|BX|CX|DX|BP|DI|SI|SP)/i; // Testing for High Registers
            testLR = /(AL|BL|CL|DL|AH|CH|DH|BH)/i; // Testing for Low Registers
            testMem = /]/i; // testing for Memory Location
            testHexA = /(A|B|C|D|E|F)/i; // Testing for Hex
            testHexB = /[0-9]/i;
            
            t_Op1H = op1.search(testHR); // High
            t_Op1L = op1.search(testLR); // Low
            t_Op1Mem = op1.search(testMem); // Memory
            
            t_Op2H = op2.search(testHR); // High
            t_Op2L = op2.search(testLR); // Low
            t_Op2Mem = op2.search(testMem); // Memory
            
            t_Op2N = parseInt(op2); //Testing Second Operand for immediate value
            t_op2HexA = op2.search(testHexA); // Testing Second Operand for Hex value
            t_op2HexB = op2.search(testHexB);
            
        if ( (t_Op1Mem >= 0) || (t_Op2Mem >= 0) ){ // 1. Memory related addressing case
                //TO confirm square brackets later
                mod = "00";
                
                x = op1.length; //Length of Operand
                y = op2.length; //Length of Operand
                memOp1 = op1.substring(1,x-1); // Get the memory operand excluding the brackets
                memOp2 = op2.substring(1,y-1); // Get the memory operand excluding the brackets

                t_memOp1H = memOp1.search(testHR); // High Register
                t_memOp1L = memOp1.search(testLR); // Low Register
                
                t_memOp2H = memOp2.search(testHR); // High Register
                t_memOp2L = memOp2.search(testLR); // Low Register
                
                t_memOp1N = parseInt(memOp1); //Testing First memory Operand for immediate value
                t_memOp2N = parseInt(memOp2); //Testing Second memory Operand for immediate value
                
                t_memOp1HexA = memOp1.search(testHexA); // Testing First memory Operand for Hex value
                t_memOp1HexB = memOp1.search(testHexB);
                
                t_memOp2HexA = memOp2.search(testHexA); // Testing Second memory Operand for Hex value
                t_memOp2HexB = memOp2.search(testHexB);
                
            if(t_Op1Mem >= 0){ // A. if operand 1 is memory
                    
                    if ( (t_memOp1HexA||t_memOp1HexB) && (t_Op2H >= 0 || t_Op2L >= 0) ){ // memory operand is immediate and operand 2 is a register
                        g = memOp1.length;
                        rm = "110";
                        d = "0";
                        reg = assignReg(op2);
                        
                        insc2 = mod+reg+rm;
                        h_insc2 = BinToHex(insc2);
                        
                        x = memOp1.length;
                        
                        if (g <= 4){ // Length of memory operand is less than 4
                                
                                z_memOp1 = addZero(memOp1); // add zeros before memory operand
                                
                                hd_1 = z_memOp1.substring(0,2); // Split operand
                                hd_2 = z_memOp1.substring(2,4);
                                
                                t_hd_1N = parseInt(hd_1); // Test for High mem
                            
                                bd_1 = HexToBin(hd_1);
                                bd_2 = HexToBin(hd_2);
                                
                                if (t_Op2H >= 0){ // High Register
                                    w = 1;
                                    insc1 = "000110"+d+w;
                                    h_insc1 = BinToHex(insc1);
                                    
                                    if (t_hd_1N > 0){ // high is present
                                        
                                        b_data = bd_2+" "+bd_1;   // Immediate data in Binary
                                        h_data = hd_2+" "+hd_1;   // immediate data in Hex

                                        binResult = insc1 + " " + insc2 + " " + b_data; // Display Binary
                                        binF.text(binResult);

                                        hexResult = h_insc1 + " " + h_insc2 + " " + h_data; // Display Hex
                                        hexF.text(hexResult);

                                    }else if (t_hd_1N == 0){ // High is absent
                                        
                                        b_data = bd_1+" "+bd_2;   // Immediate data in Binary
                                        h_data = hd_1+" "+hd_2;   // immediate data in Hex

                                        binResult = insc1 + " " + insc2 + " " + b_data; // Display Binary
                                        binF.text(binResult);

                                        hexResult = h_insc1 + " " + h_insc2 + " " + h_data; // Display Hex
                                        hexF.text(hexResult);
                                    }
                                }else if(t_Op2L >= 0){ // Low Register
                                    w = 0;
                                    insc1 = "000110"+d+w;
                                    h_insc1 = BinToHex(insc1);
                                    
                                    if (t_hd_1N > 0){ // high is present
                                        
                                        b_data = bd_2+" "+bd_1;   // Immediate data in Binary
                                        h_data = hd_2+" "+hd_1;   // immediate data in Hex

                                        binResult = insc1 + " " + insc2 + " " + b_data; // Display Binary
                                        binF.text(binResult);

                                        hexResult = h_insc1 + " " + h_insc2 + " " + h_data; // Display Hex
                                        hexF.text(hexResult);

                                    }else if (t_hd_1N == 0){ // High is absent
                                        
                                        b_data = bd_1+" "+bd_2;   // Immediate data in Binary
                                        h_data = hd_1+" "+hd_2;   // immediate data in Hex

                                        binResult = insc1 + " " + insc2 + " " + b_data; // Display Binary
                                        binF.text(binResult);

                                        hexResult = h_insc1 + " " + h_insc2 + " " + h_data; // Display Hex
                                        hexF.text(hexResult);
                                    }
                                }
                                
                        }else if (g > 4){ // Length of memory operand is higher than 4
                            i_memOp1 = memOp1.substr(g-4, g); // Get the last 4 digits of the memory operand

                            hd_1 = i_memOp1.substring(0,2); // Split operand
                            hd_2 = i_memOp1.substring(2,4);

                            t_hd_1N = parseInt(hd_1); // Test for High mem
                            
                            bd_1 = HexToBin(hd_1);
                            bd_2 = HexToBin(hd_2);
                            
                            if (t_Op2H >= 0){ // High Register
                                w = 1;
                                insc1 = "000110"+d+w;
                                h_insc1 = BinToHex(insc1);

                                if (t_hd_1N > 0){ // high is present

                                    b_data = bd_2+" "+bd_1;   // Immediate data in Binary
                                    h_data = hd_2+" "+hd_1;   // immediate data in Hex

                                    binResult = insc1 + " " + insc2 + " " + b_data; // Display Binary
                                    binF.text(binResult);

                                    hexResult = h_insc1 + " " + h_insc2 + " " + h_data; // Display Hex
                                    hexF.text(hexResult);

                                }else if (t_hd_1N == 0){ // High is absent

                                    b_data = bd_1+" "+bd_2;   // Immediate data in Binary
                                    h_data = hd_1+" "+hd_2;   // immediate data in Hex

                                    binResult = insc1 + " " + insc2 + " " + b_data; // Display Binary
                                    binF.text(binResult);

                                    hexResult = h_insc1 + " " + h_insc2 + " " + h_data; // Display Hex
                                    hexF.text(hexResult);
                                }
                            }else if(t_Op2L >= 0){ // Low Register
                                w = 0;
                                insc1 = "000110"+d+w;
                                h_insc1 = BinToHex(insc1);

                                if (t_hd_1N > 0){ // high is present

                                    b_data = bd_2+" "+bd_1;   // Immediate data in Binary
                                    h_data = hd_2+" "+hd_1;   // immediate data in Hex

                                    binResult = insc1 + " " + insc2 + " " + b_data; // Display Binary
                                    binF.text(binResult);

                                    hexResult = h_insc1 + " " + h_insc2 + " " + h_data; // Display Hex
                                    hexF.text(hexResult);

                                }else if (t_hd_1N == 0){ // High is absent

                                        b_data = bd_1+" "+bd_2;   // Immediate data in Binary
                                        h_data = hd_1+" "+hd_2;   // immediate data in Hex

                                        binResult = insc1 + " " + insc2 + " " + b_data; // Display Binary
                                        binF.text(binResult);

                                        hexResult = h_insc1 + " " + h_insc2 + " " + h_data; // Display Hex
                                        hexF.text(hexResult);
                                }
                            }
                        }
                        
                    }else if (t_memOp1H >= 0 || t_memOp1L >= 0){ // memory operand is a register
                        errorMsg("Invalid Instruction");
                    }else if ( (t_memOp1HexA||t_memOp1HexB) && (t_op2HexA >= 0 || t_op2HexB >= 0) ){ // memory operand is immediate and operand 2 is immediate
                        
                        mod = "00";
                        w = 0;
                        s = 0;
                        rm = "110";
                        g = memOp1.length;
                        
                        insc1 = "100000"+s+w;
                        insc2 = mod+"011"+rm;
                        
                        h_insc1 = BinToHex(insc1);
                        h_insc2 = BinToHex(insc2);
                        
                        if (op2.length == 2){
                            
                            if(g <= 4){
                                z_memOp1 = addZero(memOp1);

                                hd_1 = z_memOp1.substring(0,2); // Split operand
                                hd_2 = z_memOp1.substring(2,4);
                                
                                x_op = HexToBin(op2); // Converting second Hex operand to binary
                                
                                t_hd_1N = parseInt(hd_1); // Test for High mem

                                bd_1 = HexToBin(hd_1);
                                bd_2 = HexToBin(hd_2);

                                if (t_hd_1N > 0){ // high is present

                                    b_data = bd_2+" "+bd_1+" "+x_op;   // Immediate memory in Binary
                                    h_data = hd_2+" "+hd_1+" "+op2;   // immediate memory in Hex

                                    binResult = insc1 + " " + insc2 + " " + b_data; // Display Binary
                                    binF.text(binResult);

                                    hexResult = h_insc1 + " " + h_insc2 + " " + h_data; // Display Hex
                                    hexF.text(hexResult);

                                }else if (t_hd_1N == 0){ // High is absent

                                    b_data = bd_1+" "+bd_2+" "+x_op;   // Immediate memory in Binary
                                    h_data = hd_1+" "+hd_2+" "+op2;   // immediate memory in Hex

                                    binResult = insc1 + " " + insc2 + " " + b_data; // Display Binary
                                    binF.text(binResult);

                                    hexResult = h_insc1 + " " + h_insc2 + " " + h_data; // Display Hex
                                    hexF.text(hexResult);
                                }
                            }else if (g > 4){
                                i_memOp1 = memOp1.substring(g, g-4); // Get the last 4 digits of the memory operand
                                
                                hd_1 = i_memOp1.substring(0,2); // Split operand
                                hd_2 = i_memOp1.substring(2,4);

                                t_hd_1N = parseInt(hd_1); // Test for High mem

                                bd_1 = HexToBin(hd_1);
                                bd_2 = HexToBin(hd_2);

                                if (t_hd_1N > 0){ // high is present

                                    b_data = bd_2+" "+bd_1;   // Immediate data in Binary
                                    h_data = hd_2+" "+hd_1;   // immediate data in Hex

                                    binResult = insc1 + " " + insc2 + " " + b_data; // Display Binary
                                    binF.text(binResult);

                                    hexResult = h_insc1 + " " + h_insc2 + " " + h_data; // Display Hex
                                    hexF.text(hexResult);

                                }else if (t_hd_1N == 0){ // High is absent

                                    b_data = bd_1+" "+bd_2;   // Immediate data in Binary
                                    h_data = hd_1+" "+hd_2;   // immediate data in Hex

                                    binResult = insc1 + " " + insc2 + " " + b_data; // Display Binary
                                    binF.text(binResult);

                                    hexResult = h_insc1 + " " + h_insc2 + " " + h_data; // Display Hex
                                    hexF.text(hexResult);
                                }
                            }
                        }else{
                            errorMsg("Invalid Instruction");
                        }
                        
                    }
                
			}else if(t_Op2Mem >= 0){ //B. if operand 2 is memory
				
				if ( (t_memOp2HexA||t_memOp2HexB) && (t_Op1H >= 0 || t_Op1L >= 0) ){ // memory operand is immediate and operand 1 is a register
					/* FLAG: */
					errorMsg("Memory with Register TO register SBB: Cannot perform this operation!");
				}else{
					errorMsg("Invalid Instruction");
				}
			}
		}else if( (t_Op1Mem < 0) && (t_Op2Mem < 0) ){ // 2. Register Related addressing case
                
                if ((t_Op1H >= 0 && t_Op2H >= 0)||(t_Op1L >= 0 && t_Op2L >= 0)){ //Test for Same Register to Same Register
                
                    mod =  "11"; // Direct Register Addressing
                    d   =  "1"; // TO register

                    reg = assignReg(op1); // Finding the binary equivalent of the registers 
                    rm = assignReg(op2);

                    //Confirming the Register entered is valid
                    if( (reg.length <= 3) && (rm.length <= 3) ) {

                        if (t_Op1H >= 0){

                            w = "1"; // 16 Bit Register

                            insc1 = resRegMem+d+w;  // Instruction code 1 (Bin)
                            insc2 = mod+reg+rm;     // Instruction code 2 (Bin)

                            binResult = insc1 +" "+insc2; // Binary Equivalent of the Instruction (w=1)

                            h_insc1 = BinToHex(insc1); // Instruction code 1 (Hex)
                            h_insc2 = BinToHex(insc2); // Instruction code 2 (Hex)

                            hexResult = h_insc1+" "+h_insc2; // Hexadecimal Equivalent of the Instruction (w=1)

                            binF.text(binResult); // Output Binary
                            hexF.text(hexResult); // Output Hexadecimal

                        }else if(t_Op1L >= 0){

                            w = "0"; // 8 Bit Register

                            insc1 = resRegMem+d+w;  // Instruction code 1 (Bin)
                            insc2 = mod+reg+rm;     // Instruction code 2 (Bin)

                            binResult = insc1 +" "+insc2; // Binary Equivalent of the Instruction (w=1)

                            h_insc1 = BinToHex(insc1); // Instruction code 1 (Hex)
                            h_insc2 = BinToHex(insc2); // Instruction code 2 (Hex)

                            hexResult = h_insc1+" "+h_insc2; // Hexadecimal Equivalent of the Instruction (w=1)

                            binF.text(binResult); // Output Binary
                            hexF.text(hexResult); // Output Hexadecimal

                        }
                    }else{
                        errorMsg("Enter a valid Register");
                    }
                
                // Register Immediate Addressing
                }else if ( (t_Op1H >= 0 || t_Op1L >= 0) && (t_op2HexA >=0 ||t_op2HexB>=0) ){ //Checking Conditions on :115 & :116 & :117
						if ( (t_Op2H >= 0 || t_Op2L >= 0) ){
							errorMsg("Invalid Instruction: Incompatible Registers");
						}else if(t_op2HexA >= 0 || t_op2HexB >= 0){
								mod = "11";
								rm = assignReg(op1);
						
							if (op2.length == "2" || op2.length == "4"){ // Checking operand 2 for 8bit/16bit hex values

								if (op1.search(/(AL|AX)/i) >= 0){ // Implementing immediate to Accumulator case

									if(op1.search(/AL/i) >= 0){ // w = 0
										w = 0;
										insc1 = "000111"+w;
										h_insc1 = BinToHex(insc1);

										if (op2.length == "2"){
											b_data = HexToBin(op2);

											binResult = insc1 + " " + b_data;
											binF.text(binResult);

											hexResult = h_insc1 + " " + op2;
											hexF.text(hexResult);

										}else if (op2.length == "4"){
											hd_1 = op2.substring(0,2); 
											hd_2 = op2.substring(2,4);

											bd_1 = HexToBin(hd_1);
											bd_2 = HexToBin(hd_2);

											b_data = bd_1+" "+bd_2;   // Immediate data in Binary
											h_data = hd_1+" "+hd_2;   // immediate data in Hex

											binResult = insc1 + " " + b_data;
											binF.text(binResult);

											hexResult = h_insc1 + " " + h_data;
											hexF.text(hexResult);

										}
									}else if (op1.search(/AX/i) >= 0){ // w = 1
										w = 1;
										insc1 = "000111"+w;
										h_insc1 = BinToHex(insc1);

										if (op2.length == "2"){
											b_data = HexToBin(op2);

											binResult = insc1 + " " + b_data + " " + "00000000";
											binF.text(binResult);

											hexResult = h_insc1 + " " + op2 + " " + "00";
											hexF.text(hexResult);

										}else if (op2.length == "4"){
											hd_1 = op2.substring(0,2); // Splitting the 4digit Hex
											hd_2 = op2.substring(2,4);

											bd_1 = HexToBin(hd_1); // Converting the split parts to Hex
											bd_2 = HexToBin(hd_2);

											b_data = bd_2+" "+bd_1;   // Immediate data in Binary
											h_data = hd_2+" "+hd_1;   // immediate data in Hex

											binResult = insc1 + " " + b_data;
											binF.text(binResult);

											hexResult = h_insc1 + " " + h_data;
											hexF.text(hexResult);

										}
									}
								}else if (op1.search(/(AX|AL)/i) < 0){ // Continue with immediate addressing case for other registers

									if(t_Op1H >= 0){
										w = "1"; // 16 Bit

										insc2 = mod+"011"+rm;     // Instruction code 2 (Bin)

										if (op2.length == "2"){
											s = "1"; // High absent; Low Present

											insc1 = resImRegMem+s+w;  // Instruction code 1 (Bin)
											b_data = HexToBin(op2);   // Immediate data in Binary

											binResult = insc1 +" "+insc2+" "+b_data; // Binary Equivalent of the Instruction (w=1)

											h_insc1 = BinToHex(insc1); // Instruction code 1 (Hex)
											h_insc2 = BinToHex(insc2); // Instruction code 2 (Hex)

											hexResult = h_insc1+" "+h_insc2+" "+op2; // Hexadecimal Equivalent of the Instruction (w=1)

											binF.text(binResult); // Output Binary
											hexF.text(hexResult); // Output Hexadecimal

										}else if(op2.length == "4"){

											hd_1 = op2.substring(0,2); 
											hd_2 = op2.substring(2,4);

											t_hd_1 = parseInt(hd_1); // Check if High is present

											if( t_hd_1 == "0" ){

												s = "1"; // High Absent
												insc1 = resImRegMem+s+w;  // Instruction code 1 (Bin)

												bd_1 = HexToBin(hd_1);
												bd_2 = HexToBin(hd_2);

												b_data = bd_1+" "+bd_2;   // Immediate data in Binary

												binResult = insc1 +" "+insc2+" "+b_data; // Binary Equivalent of the Instruction (w=1)

												h_insc1 = BinToHex(insc1); // Instruction code 1 (Hex)
												h_insc2 = BinToHex(insc2); // Instruction code 2 (Hex)

												hexResult = h_insc1+" "+h_insc2+" "+op2; // Hexadecimal Equivalent of the Instruction (w=1)

												binF.text(binResult); // Output Binary
												hexF.text(hexResult); // Output Hexadecimal

											}else if( t_hd_1 > 0 ){

												s = "0"; // High Present
												insc1 = resImRegMem+s+w;  // Instruction code 1 (Bin)

												bd_1 = HexToBin(hd_1);
												bd_2 = HexToBin(hd_2);

												b_data = bd_2+" "+bd_1;   // Immediate data in Binary
												h_data = hd_2+" "+hd_1;   // Immediate data in Hex

												binResult = insc1 +" "+insc2+" "+b_data; // Binary Equivalent of the Instruction (w=1)

												h_insc1 = BinToHex(insc1); // Instruction code 1 (Hex)
												h_insc2 = BinToHex(insc2); // Instruction code 2 (Hex)

												hexResult = h_insc1+" "+h_insc2+" "+h_data; // Hexadecimal Equivalent of the Instruction (w=1)

												binF.text(binResult); // Output Binary
												hexF.text(hexResult); // Output Hexadecimal
											}
										}
									}else if((t_Op1L >= 0)&&(op2.length == "2")){
										w = "0"; // 8 Bit
										s = "0";

										insc1 = resImRegMem+s+w;  // Instruction code 1 (Bin)
										insc2 = mod+"000"+rm;     // Instruction code 2 (Bin)
										b_data = HexToBin(op2);

										binResult = insc1 +" "+insc2+" "+b_data; // Binary Equivalent of the Instruction (w=1)

										h_insc1 = BinToHex(insc1); // Instruction code 1 (Hex)
										h_insc2 = BinToHex(insc2); // Instruction code 2 (Hex)

										hexResult = h_insc1+" "+h_insc2+" "+op2; // Hexadecimal Equivalent of the Instruction (w=1)

										binF.text(binResult); // Output Binary
										hexF.text(hexResult); // Output Hexadecimal

									}else if( ((t_Op1L >=0)&&(op2.length == "4")) || ((t_Op1H >=0)&&(op2.length == "2")) ){
										errorMsg("Invalid instruction: Incompatible Operand types");
									}
								}
							
							}else{
								errorMsg("Invalid Operand: Operand must be an 8-Bit or 16-Bit Hex value");
							}
						}else{
							errorMsg("Invalid Instruction");
						}
				}else if( (t_Op1H >= 0 && t_Op2L >= 0)||(t_Op1L >= 0 && t_Op2H >= 0) ){
                    errorMsg("Invalid instruction");
                }else{
					errorMsg("Invalid instruction");
				}
				
		}else{
			errorMsg("Invalid Instruction");
		}
			
        }else{
            errorMsg("Missing/Incorrect SBB mnemonic");
        }
    }

    function clc(code){

    //Input field
    var inp = code;

    var a = /CLC/i,
        b = / /i,
        hexA = /(A|B|C|D|E|F)/i,
        hexB = /[0-9]/i;

    var findCLC = inp.search(a),
        findSpace = inp.search(b),
        findHexA = inp.search(hexA),
        findHexB = inp.search(hexB);

    var operand = inp.substring(findSpace).trim();

    if((inp.trim()=="clc"||inp.trim()=="CLC")||(findCLC >=0 && findSpace >= 0)){
        if (inp.trim()=="clc"||inp.trim()=="CLC"){
            binCLC = "11111000";
            hexCLC = parseInt(binCLC, 2).toString(16);
            
            binF.text(binCLC);
            hexF.text(hexCLC);
        }else if (findCLC >=0 && findSpace >= 0){
            binCLC = "11111000";
            hexCLC = parseInt(binCLC, 2).toString(16);

            if((findCLC >=0) || ((parseInt(operand) >= 0 || findHexA>=0 || findhexB>=0)&&(operand.length == 2 || operand.length == 4))){
                BinOperand = parseInt(operand, 16).toString(2);

                binF.text(binCLC + " " + BinOperand);
                hexF.text( hexCLC + " " + operand);
            }else{
                errorMsg("Invalid Instruction");
            }
        }
    }else{
        errorMsg("Invalid Instruction");
    }
    }

    function aas(code){
        var test = code; //assigning the value entered in the text-box element to a variable
            
        var error = document.getElementById("textarea"); //assigning text-area element in html to a variable
            //error.innerHTML this writes to the div; actually in the div.
        
        var hexadecimal = document.getElementById("hexadecimal");  
            
        var bin = document.getElementById("binary");
        
            if (test=="AAS"||test=="aas"){
                
                var binary = " 00111111"; // a variable to store my binary value
                
                var hex =  parseInt(binary, 2).toString(16); //converts the binary value to a hexadecimal value
                
                binF.text(binary);
                hexF.text(hex);
            
            }
            else {
                errorMsg("Invalid Instruction")
                }
    }

    function add(code){
        resRegMem = "000000",   //Result format for Register/Memory with Register TO either
        resImRegMem = "100000",//" "+data,   //Result formmat for Immediate to Register/Memory
        resImAcc = "0000010";//+w+" "+data+dataw;                  // Result format for Immediate to Accumulator

    var testAdd = code.search(/ADD/i), // Test for ADD
            e = code.search(/ /i); // Get end of Opcode

    if ((testAdd >= 0)&&(e == 3)){
        
        var codeLength = code.length,
            sp1 = code.search(/,/i), // First operand stops here
            op1 = code.substring(4,sp1).trim(), // Get First Operand
            op2 = code.substring(sp1+2,codeLength).trim(); // Get Second Operand
            
        testHR = /(AX|BX|CX|DX|BP|DI|SI|SP)/i; // Testing for High Registers
        testLR = /(AL|BL|CL|DL|AH|CH|DH|BH)/i; // Testing for Low Registers
        testMem = /]/i; // testing for Memory Location
        testHexA = /(A|B|C|D|E|F)/i; // Testing for Hex
        testHexB = /[0-9]/i;
        
        t_Op1H = op1.search(testHR); // High
        t_Op1L = op1.search(testLR); // Low
        t_Op1Mem = op1.search(testMem); // Memory
        
        t_Op2H = op2.search(testHR); // High
        t_Op2L = op2.search(testLR); // Low
        t_Op2Mem = op2.search(testMem); // Memory
        
        t_Op2N = parseInt(op2); //Testing Second Operand for immediate value
        t_op2HexA = op2.search(testHexA); // Testing Second Operand for Hex value
        t_op2HexB = op2.search(testHexB);
        
    if ( (t_Op1Mem >= 0) || (t_Op2Mem >= 0) ){ // 1. Memory related addressing case
            //TO confirm square brackets later
            mod = "00";
            
            x = op1.length; //Length of Operand
            y = op2.length; //Length of Operand
            memOp1 = op1.substring(1,x-1); // Get the memory operand excluding the brackets
            memOp2 = op2.substring(1,y-1); // Get the memory operand excluding the brackets

            t_memOp1H = memOp1.search(testHR); // High Register
            t_memOp1L = memOp1.search(testLR); // Low Register
            
            t_memOp2H = memOp2.search(testHR); // High Register
            t_memOp2L = memOp2.search(testLR); // Low Register
            
            t_memOp1N = parseInt(memOp1); //Testing First memory Operand for immediate value
            t_memOp2N = parseInt(memOp2); //Testing Second memory Operand for immediate value
            
            t_memOp1HexA = memOp1.search(testHexA); // Testing First memory Operand for Hex value
            t_memOp1HexB = memOp1.search(testHexB);
            
            t_memOp2HexA = memOp2.search(testHexA); // Testing Second memory Operand for Hex value
            t_memOp2HexB = memOp2.search(testHexB);
            
        if(t_Op1Mem >= 0){ // A. if operand 1 is memory
                
                if ( (t_memOp1HexA||t_memOp1HexB) && (t_Op2H >= 0 || t_Op2L >= 0) ){ // memory operand is immediate and operand 2 is a register
                    g = memOp1.length;
                    rm = "110";
                    d = "0";
                    reg = assignReg(op2);
                    
                    insc2 = mod+reg+rm;
                    h_insc2 = BinToHex(insc2);
                    
                    x = memOp1.length;
                    
                    if (g <= 4){ // Length of memory operand is less than 4
                            
                            z_memOp1 = addZero(memOp1); // add zeros before memory operand
                            
                            hd_1 = z_memOp1.substring(0,2); // Split operand
                            hd_2 = z_memOp1.substring(2,4);
                            
                            t_hd_1N = parseInt(hd_1); // Test for High mem
                        
                            bd_1 = HexToBin(hd_1);
                            bd_2 = HexToBin(hd_2);
                            
                            if (t_Op2H >= 0){ // High Register
                                w = 1;
                                insc1 = "000000"+d+w;
                                h_insc1 = BinToHex(insc1);
                                
                                if (t_hd_1N > 0){ // high is present
                                    
                                    b_data = bd_2+" "+bd_1;   // Immediate data in Binary
                                    h_data = hd_2+" "+hd_1;   // immediate data in Hex

                                    binResult = insc1 + " " + insc2 + " " + b_data; // Display Binary
                                    binF.text(binResult);

                                    hexResult = h_insc1 + " " + h_insc2 + " " + h_data; // Display Hex
                                    hexF.text(hexResult);

                                }else if (t_hd_1N == 0){ // High is absent
                                    
                                    b_data = bd_1+" "+bd_2;   // Immediate data in Binary
                                    h_data = hd_1+" "+hd_2;   // immediate data in Hex

                                    binResult = insc1 + " " + insc2 + " " + b_data; // Display Binary
                                    binF.text(binResult);

                                    hexResult = h_insc1 + " " + h_insc2 + " " + h_data; // Display Hex
                                    hexF.text(hexResult);
                                }
                            }else if(t_Op2L >= 0){ // Low Register
                                w = 0;
                                insc1 = "000000"+d+w;
                                h_insc1 = BinToHex(insc1);
                                
                                if (t_hd_1N > 0){ // high is present
                                    
                                    b_data = bd_2+" "+bd_1;   // Immediate data in Binary
                                    h_data = hd_2+" "+hd_1;   // immediate data in Hex

                                    binResult = insc1 + " " + insc2 + " " + b_data; // Display Binary
                                    binF.text(binResult);

                                    hexResult = h_insc1 + " " + h_insc2 + " " + h_data; // Display Hex
                                    hexF.text(hexResult);

                                }else if (t_hd_1N == 0){ // High is absent
                                    
                                    b_data = bd_1+" "+bd_2;   // Immediate data in Binary
                                    h_data = hd_1+" "+hd_2;   // immediate data in Hex

                                    binResult = insc1 + " " + insc2 + " " + b_data; // Display Binary
                                    binF.text(binResult);

                                    hexResult = h_insc1 + " " + h_insc2 + " " + h_data; // Display Hex
                                    hexF.text(hexResult);
                                }
                            }
                            
                    }else if (g > 4){ // Length of memory operand is higher than 4
                        i_memOp1 = memOp1.substr(g-4, g); // Get the last 4 digits of the memory operand

                        hd_1 = i_memOp1.substring(0,2); // Split operand
                        hd_2 = i_memOp1.substring(2,4);

                        t_hd_1N = parseInt(hd_1); // Test for High mem
                        
                        bd_1 = HexToBin(hd_1);
                        bd_2 = HexToBin(hd_2);
                        
                        if (t_Op2H >= 0){ // High Register
                            w = 1;
                            insc1 = "000000"+d+w;
                            h_insc1 = BinToHex(insc1);

                            if (t_hd_1N > 0){ // high is present

                                b_data = bd_2+" "+bd_1;   // Immediate data in Binary
                                h_data = hd_2+" "+hd_1;   // immediate data in Hex

                                binResult = insc1 + " " + insc2 + " " + b_data; // Display Binary
                                binF.text(binResult);

                                hexResult = h_insc1 + " " + h_insc2 + " " + h_data; // Display Hex
                                hexF.text(hexResult);

                            }else if (t_hd_1N == 0){ // High is absent

                                b_data = bd_1+" "+bd_2;   // Immediate data in Binary
                                h_data = hd_1+" "+hd_2;   // immediate data in Hex

                                binResult = insc1 + " " + insc2 + " " + b_data; // Display Binary
                                binF.text(binResult);

                                hexResult = h_insc1 + " " + h_insc2 + " " + h_data; // Display Hex
                                hexF.text(hexResult);
                            }
                        }else if(t_Op2L >= 0){ // Low Register
                            w = 0;
                            insc1 = "000000"+d+w;
                            h_insc1 = BinToHex(insc1);

                            if (t_hd_1N > 0){ // high is present

                                b_data = bd_2+" "+bd_1;   // Immediate data in Binary
                                h_data = hd_2+" "+hd_1;   // immediate data in Hex

                                binResult = insc1 + " " + insc2 + " " + b_data; // Display Binary
                                binF.text(binResult);

                                hexResult = h_insc1 + " " + h_insc2 + " " + h_data; // Display Hex
                                hexF.text(hexResult);

                            }else if (t_hd_1N == 0){ // High is absent

                                    b_data = bd_1+" "+bd_2;   // Immediate data in Binary
                                    h_data = hd_1+" "+hd_2;   // immediate data in Hex

                                    binResult = insc1 + " " + insc2 + " " + b_data; // Display Binary
                                    binF.text(binResult);

                                    hexResult = h_insc1 + " " + h_insc2 + " " + h_data; // Display Hex
                                    hexF.text(hexResult);
                            }
                        }
                    }
                    
                }else if (t_memOp1H >= 0 || t_memOp1L >= 0){ // memory operand is a register
                    errorMsg("Invalid Instruction");
                }else if ( (t_memOp1HexA||t_memOp1HexB) && (t_op2HexA >= 0 || t_op2HexB >= 0) ){ // memory operand is immediate and operand 2 is immediate
                    
                    mod = "00";
                    w = 0;
                    s = 0;
                    rm = "110";
                    g = memOp1.length;
                    
                    insc1 = "100000"+s+w;
                    insc2 = mod+"000"+rm;
                    
                    h_insc1 = BinToHex(insc1);
                    h_insc2 = BinToHex(insc2);
                    
                    if (op2.length == 2){
                        
                        if(g <= 4){
                            z_memOp1 = addZero(memOp1);

                            hd_1 = z_memOp1.substring(0,2); // Split operand
                            hd_2 = z_memOp1.substring(2,4);
                            
                            x_op = HexToBin(op2); // Converting second Hex operand to binary
                            
                            t_hd_1N = parseInt(hd_1); // Test for High mem

                            bd_1 = HexToBin(hd_1);
                            bd_2 = HexToBin(hd_2);

                            if (t_hd_1N > 0){ // high is present

                                b_data = bd_2+" "+bd_1+" "+x_op;   // Immediate memory in Binary
                                h_data = hd_2+" "+hd_1+" "+op2;   // immediate memory in Hex

                                binResult = insc1 + " " + insc2 + " " + b_data; // Display Binary
                                binF.text(binResult);

                                hexResult = h_insc1 + " " + h_insc2 + " " + h_data; // Display Hex
                                hexF.text(hexResult);

                            }else if (t_hd_1N == 0){ // High is absent

                                b_data = bd_1+" "+bd_2+" "+x_op;   // Immediate memory in Binary
                                h_data = hd_1+" "+hd_2+" "+op2;   // immediate memory in Hex

                                binResult = insc1 + " " + insc2 + " " + b_data; // Display Binary
                                binF.text(binResult);

                                hexResult = h_insc1 + " " + h_insc2 + " " + h_data; // Display Hex
                                hexF.text(hexResult);
                            }
                        }else if (g > 4){
                            i_memOp1 = memOp1.substring(g, g-4); // Get the last 4 digits of the memory operand
                            
                            hd_1 = i_memOp1.substring(0,2); // Split operand
                            hd_2 = i_memOp1.substring(2,4);

                            t_hd_1N = parseInt(hd_1); // Test for High mem

                            bd_1 = HexToBin(hd_1);
                            bd_2 = HexToBin(hd_2);

                            if (t_hd_1N > 0){ // high is present

                                b_data = bd_2+" "+bd_1;   // Immediate data in Binary
                                h_data = hd_2+" "+hd_1;   // immediate data in Hex

                                binResult = insc1 + " " + insc2 + " " + b_data; // Display Binary
                                binF.text(binResult);

                                hexResult = h_insc1 + " " + h_insc2 + " " + h_data; // Display Hex
                                hexF.text(hexResult);

                            }else if (t_hd_1N == 0){ // High is absent

                                b_data = bd_1+" "+bd_2;   // Immediate data in Binary
                                h_data = hd_1+" "+hd_2;   // immediate data in Hex

                                binResult = insc1 + " " + insc2 + " " + b_data; // Display Binary
                                binF.text(binResult);

                                hexResult = h_insc1 + " " + h_insc2 + " " + h_data; // Display Hex
                                hexF.text(hexResult);
                            }
                        }
                    }else{
                        errorMsg("Invalid Instruction");
                    }
                    
                }
            
        }else if(t_Op2Mem >= 0){ //B. if operand 2 is memory
            
            if ( (t_memOp2HexA||t_memOp2HexB) && (t_Op1H >= 0 || t_Op1L >= 0) ){ // memory operand is immediate and operand 1 is a register
                /* FLAG: */
                errorMsg("Memory with Register TO register ADD: Cannot perform this operation!");
            }else{
                errorMsg("Invalid Instruction");
            }
        }
    }else if( (t_Op1Mem < 0) && (t_Op2Mem < 0) ){ // 2. Register Related addressing case
            
            if ((t_Op1H >= 0 && t_Op2H >= 0)||(t_Op1L >= 0 && t_Op2L >= 0)){ //Test for Same Register to Same Register
            
                mod =  "11"; // Direct Register Addressing
                d   =  "1"; // TO register

                reg = assignReg(op1); // Finding the binary equivalent of the registers 
                rm = assignReg(op2);

                //Confirming the Register entered is valid
                if( (reg.length <= 3) && (rm.length <= 3) ) {

                    if (t_Op1H >= 0){

                        w = "1"; // 16 Bit Register

                        insc1 = resRegMem+d+w;  // Instruction code 1 (Bin)
                        insc2 = mod+reg+rm;     // Instruction code 2 (Bin)

                        binResult = insc1 +" "+insc2; // Binary Equivalent of the Instruction (w=1)

                        h_insc1 = BinToHex(insc1); // Instruction code 1 (Hex)
                        h_insc2 = BinToHex(insc2); // Instruction code 2 (Hex)

                        hexResult = h_insc1+" "+h_insc2; // Hexadecimal Equivalent of the Instruction (w=1)

                        binF.text(binResult); // Output Binary
                        hexF.text(hexResult); // Output Hexadecimal

                    }else if(t_Op1L >= 0){

                        w = "0"; // 8 Bit Register

                        insc1 = resRegMem+d+w;  // Instruction code 1 (Bin)
                        insc2 = mod+reg+rm;     // Instruction code 2 (Bin)

                        binResult = insc1 +" "+insc2; // Binary Equivalent of the Instruction (w=1)

                        h_insc1 = BinToHex(insc1); // Instruction code 1 (Hex)
                        h_insc2 = BinToHex(insc2); // Instruction code 2 (Hex)

                        hexResult = h_insc1+" "+h_insc2; // Hexadecimal Equivalent of the Instruction (w=1)

                        binF.text(binResult); // Output Binary
                        hexF.text(hexResult); // Output Hexadecimal

                    }
                }else{
                    errorMsg("Enter a valid Register");
                }
            
            // Register Immediate Addressing
            }else if ( (t_Op1H >= 0 || t_Op1L >= 0) && (t_op2HexA >=0 ||t_op2HexB>=0) ){ //Checking Conditions on :115 & :116 & :117
                    if ( (t_Op2H >= 0 || t_Op2L >= 0) ){
                        errorMsg("Invalid Instruction: Incompatible Registers");
                    }else if(t_op2HexA >= 0 || t_op2HexB >= 0){
                            mod = "11";
                            rm = assignReg(op1);
                    
                        if (op2.length == "2" || op2.length == "4"){ // Checking operand 2 for 8bit/16bit hex values

                            if (op1.search(/(AL|AX)/i) >= 0){ // Implementing immediate to Accumulator case

                                if(op1.search(/AL/i) >= 0){ // w = 0
                                    w = 0;
                                    insc1 = "0000010"+w;
                                    h_insc1 = BinToHex(insc1);

                                    if (op2.length == "2"){
                                        b_data = HexToBin(op2);

                                        binResult = insc1 + " " + b_data;
                                        binF.text(binResult);

                                        hexResult = h_insc1 + " " + op2;
                                        hexF.text(hexResult);

                                    }else if (op2.length == "4"){
                                        hd_1 = op2.substring(0,2); 
                                        hd_2 = op2.substring(2,4);

                                        bd_1 = HexToBin(hd_1);
                                        bd_2 = HexToBin(hd_2);

                                        b_data = bd_1+" "+bd_2;   // Immediate data in Binary
                                        h_data = hd_1+" "+hd_2;   // immediate data in Hex

                                        binResult = insc1 + " " + b_data;
                                        binF.text(binResult);

                                        hexResult = h_insc1 + " " + h_data;
                                        hexF.text(hexResult);

                                    }
                                }else if (op1.search(/AX/i) >= 0){ // w = 1
                                    w = 1;
                                    insc1 = "0000010"+w;
                                    h_insc1 = BinToHex(insc1);

                                    if (op2.length == "2"){
                                        b_data = HexToBin(op2);

                                        binResult = insc1 + " " + b_data + " " + "00000000";
                                        binF.text(binResult);

                                        hexResult = h_insc1 + " " + op2 + " " + "00";
                                        hexF.text(hexResult);

                                    }else if (op2.length == "4"){
                                        hd_1 = op2.substring(0,2); // Splitting the 4digit Hex
                                        hd_2 = op2.substring(2,4);

                                        bd_1 = HexToBin(hd_1); // Converting the split parts to Hex
                                        bd_2 = HexToBin(hd_2);

                                        b_data = bd_2+" "+bd_1;   // Immediate data in Binary
                                        h_data = hd_2+" "+hd_1;   // immediate data in Hex

                                        binResult = insc1 + " " + b_data;
                                        binF.text(binResult);

                                        hexResult = h_insc1 + " " + h_data;
                                        hexF.text(hexResult);

                                    }
                                }
                            }else if (op1.search(/(AX|AL)/i) < 0){ // Continue with immediate addressing case for other registers

                                if(t_Op1H >= 0){
                                    w = "1"; // 16 Bit

                                    insc2 = mod+"000"+rm;     // Instruction code 2 (Bin)

                                    if (op2.length == "2"){
                                        s = "1"; // High absent; Low Present

                                        insc1 = resImRegMem+s+w;  // Instruction code 1 (Bin)
                                        b_data = HexToBin(op2);   // Immediate data in Binary

                                        binResult = insc1 +" "+insc2+" "+b_data; // Binary Equivalent of the Instruction (w=1)

                                        h_insc1 = BinToHex(insc1); // Instruction code 1 (Hex)
                                        h_insc2 = BinToHex(insc2); // Instruction code 2 (Hex)

                                        hexResult = h_insc1+" "+h_insc2+" "+op2; // Hexadecimal Equivalent of the Instruction (w=1)

                                        binF.text(binResult); // Output Binary
                                        hexF.text(hexResult); // Output Hexadecimal

                                    }else if(op2.length == "4"){

                                        hd_1 = op2.substring(0,2); 
                                        hd_2 = op2.substring(2,4);

                                        t_hd_1 = parseInt(hd_1); // Check if High is present

                                        if( t_hd_1 == "0" ){

                                            s = "1"; // High Absent
                                            insc1 = resImRegMem+s+w;  // Instruction code 1 (Bin)

                                            bd_1 = HexToBin(hd_1);
                                            bd_2 = HexToBin(hd_2);

                                            b_data = bd_1+" "+bd_2;   // Immediate data in Binary

                                            binResult = insc1 +" "+insc2+" "+b_data; // Binary Equivalent of the Instruction (w=1)

                                            h_insc1 = BinToHex(insc1); // Instruction code 1 (Hex)
                                            h_insc2 = BinToHex(insc2); // Instruction code 2 (Hex)

                                            hexResult = h_insc1+" "+h_insc2+" "+op2; // Hexadecimal Equivalent of the Instruction (w=1)

                                            binF.text(binResult); // Output Binary
                                            hexF.text(hexResult); // Output Hexadecimal

                                        }else if( t_hd_1 > 0 ){

                                            s = "0"; // High Present
                                            insc1 = resImRegMem+s+w;  // Instruction code 1 (Bin)

                                            bd_1 = HexToBin(hd_1);
                                            bd_2 = HexToBin(hd_2);

                                            b_data = bd_2+" "+bd_1;   // Immediate data in Binary
                                            h_data = hd_2+" "+hd_1;   // Immediate data in Hex

                                            binResult = insc1 +" "+insc2+" "+b_data; // Binary Equivalent of the Instruction (w=1)

                                            h_insc1 = BinToHex(insc1); // Instruction code 1 (Hex)
                                            h_insc2 = BinToHex(insc2); // Instruction code 2 (Hex)

                                            hexResult = h_insc1+" "+h_insc2+" "+h_data; // Hexadecimal Equivalent of the Instruction (w=1)

                                            binF.text(binResult); // Output Binary
                                            hexF.text(hexResult); // Output Hexadecimal
                                        }
                                    }
                                }else if((t_Op1L >= 0)&&(op2.length == "2")){
                                    w = "0"; // 8 Bit
                                    s = "0";

                                    insc1 = resImRegMem+s+w;  // Instruction code 1 (Bin)
                                    insc2 = mod+"000"+rm;     // Instruction code 2 (Bin)
                                    b_data = HexToBin(op2);

                                    binResult = insc1 +" "+insc2+" "+b_data; // Binary Equivalent of the Instruction (w=1)

                                    h_insc1 = BinToHex(insc1); // Instruction code 1 (Hex)
                                    h_insc2 = BinToHex(insc2); // Instruction code 2 (Hex)

                                    hexResult = h_insc1+" "+h_insc2+" "+op2; // Hexadecimal Equivalent of the Instruction (w=1)

                                    binF.text(binResult); // Output Binary
                                    hexF.text(hexResult); // Output Hexadecimal

                                }else if( ((t_Op1L >=0)&&(op2.length == "4")) || ((t_Op1H >=0)&&(op2.length == "2")) ){
                                    errorMsg("Invalid instruction: Incompatible Operand types");
                                }
                            }
                        
                        }else{
                            errorMsg("Invalid Operand: Operand must be an 8-Bit or 16-Bit Hex value");
                        }
                    }else{
                        errorMsg("Invalid Instruction");
                    }
            }else if( (t_Op1H >= 0 && t_Op2L >= 0)||(t_Op1L >= 0 && t_Op2H >= 0) ){
                errorMsg("Invalid instruction");
            }else{
                errorMsg("Invalid instruction");
            }
            
    }else{
        errorMsg("Invalid Instruction");
    }
        
    }else{
        errorMsg("Missing/Incorrect ADD mnemonic");
    }
    }

});