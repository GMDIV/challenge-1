
// var express = require('express');
// var bodyParser = require('body-parser');
var http = require('http');
var fs = require('fs');
// var app = express();
var nDays;
var kWindowDays;
var minDays = 1;
var maxDays = 200000;
var fileData;
var fileDataLineOne;
var fileDataLineTwo;

fs.readFile('./input.txt', "utf-8", function read(err, data) {
    if (err) {
        throw err;
    }
    fileData = data.split("\r\n");
    fileDataLineOne = fileData[0].split(" ");
    fileDataLineTwo = fileData[1].split(" ");
    nDays = fileDataLineOne[0];
    kWindowDays = Number(fileDataLineOne[1]);


    console.log("fileData: ", fileData); 
    console.log("fileDataLineOne: ", fileDataLineOne);
    console.log("fileDataLineTwo: ", fileDataLineTwo);
    console.log("nDays", nDays);
    console.log("kWindowDays", kWindowDays);
    checkWindowDifference();
});
//need to create a slice of linetwo for it to check against so that it doesn't go 
//beyond the limits of the k days. It checks for consequitive, so it will 
//be looking for [1, 2, 3], [1,2], and [2,3] to equal 3. It will not compare [3,4]
function checkWindowDifference(){
    console.log("line two", fileDataLineTwo)
    var countArray = [];
    var count = 0;
    var kCount = 0;
    console.log("kWindowDays",kWindowDays)
    for(var j = 0; j < kWindowDays; j++){
        kCount++    
        var parseEnd = (j + kWindowDays);
        var continued = false;
        var continueStreak = 1
        console.log("parseEnd", parseEnd)
        console.log("j is ", j)
        var parsedLine = fileDataLineTwo.slice(j, (j+kWindowDays))

        for(var i = 0; i < kWindowDays-1; i++){

            console.log(" ");
            console.log("parsedLine", parsedLine)
            console.log("i", i)
            console.log("average", parsedLine[i])
            console.log("compared average is ", parsedLine[i+1])
            console.log("kCount", kCount);
            console.log("count", count);
            console.log("continued", continued)
            if( i == nDays ){
                console.log("Nope. Stop here.")
            }
            else{
                if(parsedLine[i] < parsedLine[i+1] ){
                count++
                console.log("count has increased! The count is now ", count)
                if(continued === true){
                    continueStreak++
                }
                continued = true
                }
                else if(parsedLine[i] > parsedLine[i+1] ){
                    count--
                    console.log("count has decreased! The count is now ", count)
                    continued = false
                }
                else {
                    console.log("count has remained the same! The count is now ", count)
                    continued = false
                }
            }
        }
        countArray.push(count);
        count = 0
        console.log("The current countArray is: ", countArray)
    }
}

function display (difference){
    console.log(difference + "\n")
}



http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Check out the console for the results. In the command line. Not over there ----->>>>');
}).listen(1337, "127.0.0.1");
    
console.log('Server running at http://127.0.0.1:1337/');