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
        }else if(code.search(/JNBE/i) >=0){
            partA = code.split(",");
            jnbe(partA[0],partA[1]);
        }else if(code.search(/AAM/i) >=0){
            aam(code);
        }else if(code.search(/IN/i) >=0){
            IN(code);
        }else if(code.search(/CALL/i) >=0){
            partA = code.split(",");
            call(partA[0],partA[1]);
        }
 
    });

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
                        console.log(f2+" "+l2+" "+f1+" "+fl1+" "+fl2);
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
        console.log(input);
        var word = (input.substring(3,5) === "AL") ? 0 : 1;
        var port = input.substring(7);

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
        console.log(mem);
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
            console.log(instr.length)
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
            console.log(y);
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