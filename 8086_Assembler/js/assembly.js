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
        }
 
    });

    function dec(code){

            var x = code;
            x = x.trim();
            var y = x.includes(" ");
            var zopen = x.includes("[");
            var zclose = x.includes("]");
            (y || (zopen === true && zclose === true)) ? compare(x) : errorMsg("invalid or incomplete mnemonics or instruction");;

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
            //console.log
            switch (instr.length) {
                case 2:
                case 3:
                    wordreg(instr);
                    break;
                case 4:
                case 5:
                case 6:
                case 7:
                case 8:
                case 9:
                    menmonics(instr);
                    break;
                default:
                    errorMsg("invalid or incomplete mnemonics or instruction");
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
            console.log(y);
            switch (y) {
                case "DEC":
                    generate(x.substring(3, x.length), x.length);
                    break;
                default:
                    errorMsg("invalid or incomplete mnemonics or instruction");
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