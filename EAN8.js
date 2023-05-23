// EAN8.js
// Transform a 7-digit number into an EAN-8-encoded string of 0s and 1s
// James Staub
// Nashville Public Library
// 20150402
// Borrowing very heavily from JsBarcode https://github.com/lindell/JsBarcode
function EAN8(EANnumber){
        this.EANnumber = EANnumber+"0";
        this.valid = function(){
                return valid(this.EANnumber);
        };
        this.encoded = function (){
                if(valid(this.EANnumber)){
                        return createUPC(this.EANnumber);
                }
                return "error";
        }
        //The L (left) type of encoding
        var Lbinary = {
        0: "0001101",
        1: "0011001",
        2: "0010011",
        3: "0111101",
        4: "0100011",
        5: "0110001",
        6: "0101111",
        7: "0111011",
        8: "0110111",
        9: "0001011"}
        //The R (right) type of encoding
        var Rbinary = {
        0: "1110010",
        1: "1100110",
        2: "1101100",
        3: "1000010",
        4: "1011100",
        5: "1001110",
        6: "1010000",
        7: "1000100",
        8: "1001000",
        9: "1110100"}
        //The start bits
        var startBin = "101";
        //The end bits
        var endBin = "101";
        //The middle bits
        var middleBin = "01010";
        //Regexp to test if the EAN8 code is correct formatted
        var regexp = /^[0-9]{8}$/;
        //Create the binary representation of the EAN8 code
        //number needs to be a string
        function createUPC(number){
                //Create the return variable
                var result = "";
                //Get the number to be encoded on the left side of the EAN code
                var leftSide = number.substr(0,4);
                //Get the number to be encoded on the right side of the EAN code
                var rightSide = number.substr(4,4);
                //Add the start bits
                result += startBin;
                //Add the left side
                result += encode(leftSide,"LLLL");
                //Add the middle bits
                result += middleBin;
                //Add the right side
                result += encode(rightSide,"RRRR");
                //Add the end bits
                result += endBin;
                return result;
        }
        //Convert a numberarray to the representing
        function encode(number,struct){
                //Create the variable that should be returned at the end of the function
                var result = "";
                //Loop all the numbers
                for(var i = 0;i<number.length;i++){
                        //Using the L, G or R encoding and add it to the returning variable
                        if(struct[i]=="L"){
                                result += Lbinary[number[i]];
                        }
                        else if(struct[i]=="R"){
                                result += Rbinary[number[i]];
                        }
                }
                return result;
        }
        //Calulate the checksum digit
        function checksum(number){
                var result = 0;
                for(var i=0;i<7;i+=2){result+=parseInt(number[i])*3}
                for(var i=1;i<7;i+=2){result+=parseInt(number[i])}
                return ((10 - (result % 10)) % 10);
        }
        function valid(number){
                if(number.search(regexp)==-1){
                        return false;
                }
                else{
                        number = number.substr(0,7)
                        number += checksum(number);
                        return number;
                }
        }
}
