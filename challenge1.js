
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

fs.readFile('./input.txt', "utf-8", function read(err, data) {
    if (err) {
        throw err;
    }
    fileData = data.split("\r\n");
    fileDataLineOne = fileData[0].split(" ");
    fileDataLineTwo = fileData[1].split(" ");

    console.log("fileData: ", fileData); 
    console.log("fileDataLineOne: ", fileDataLineOne);
    console.log("fileDataLineTwo: ", fileDataLineTwo);
});




http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Check out the console for the results. In the command line. Not over there ----->>>>');
}).listen(1337, "127.0.0.1");
    
console.log('Server running at http://127.0.0.1:1337/');