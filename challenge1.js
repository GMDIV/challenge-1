var http = require('http');
var fs = require('fs');

var nDays;
var kWindowDays;
var minDays = 1;
var maxDays = 200000;
var fileData;
var fileDataLineOne;
var fileDataLineTwo;
var countArray = []; //The array that we push our count into.
var count = 0; //The sum of increases and decreases for each window. 

/*
The basics:
-Start up the node.js server with http. Run in the command line with "node challenge1.js"
-fs.readFile will scan the given text file "./imput.txt" and convert it into string form
-Then this data gets parsed out into "n days", "k windows", and an array of averages
-We make a few conditional statements to make sure our data is proper with the given constraints
-If it checks out, then we run checkWindowDifference to measure increases and decreases in each window
-After each count result is pushed into the given array, we loop through and show our result for each window in the console. 
*/



//read the file ./input.text as a string
fs.readFile('./input.txt', "utf-8", function read(err, data) {
    if (err) {
        throw err;
    }
    //The data split into an array of two strings - line one and line two
    fileData = data.split("\r\n");  
    //Line one as an array of two values - n and k
    fileDataLineOne = fileData[0].split(" ");
    //Line two as an array of all of the averages
    fileDataLineTwo = fileData[1].split(" ");
    nDays = fileDataLineOne[0]; //n
    kWindowDays = Number(fileDataLineOne[1]); //k
    var lessThanOneMillion = false;

    //check to make sure none of the averages are above 1 million dollars.
    // for(var m = 0; m < fileDataLineTwo.length; m++){
    //     if(fileDataLineTwo[m] < 1000000){
    //         lessThanOneMillion = true;
    //     }
    //     else{
    //         lessThanOneMillion = false;
    //         console.log("Error. One of the averages is greater than 1 million.")
    //     }
    // }

    //check to make sure none of the averages are above 1 million dollars.  
    lessThanOneMillion = !(fileDataLineTwo.some(function(average){ 
                            return average > 1000000}) 
                        )
    
    // console.log("fileData: ", fileData); 
    // console.log("fileDataLineOne: ", fileDataLineOne);
    // console.log("fileDataLineTwo: ", fileDataLineTwo);
    // console.log("nDays", nDays);
    // console.log("kWindowDays", kWindowDays);

    if( (minDays <= nDays && nDays <= maxDays) && (1 <= kWindowDays && kWindowDays <= nDays) ){
        if(lessThanOneMillion === true){
            checkWindowDifference(); //Check to see what the increase count is for each window
            countArray.forEach(function(count){ console.log(count) }) //Display the results
        }
        else{
            console.log("We're sorry. The file does not fit the required parameters. Please make sure that the daily averages are below $1,000,000.")
        }
    }
    else{ 
        console.log("We're sorry. The file does not fit the required parameters. Please make sure that N and K are correct.")
    }
});
//need to create a slice of linetwo for it to check against so that it doesn't go 
//beyond the limits of the k days. It checks for consequitive, so it will 
//be looking for [1, 2, 3], [1,2], and [2,3] to equal 3. It will not compare [3,4]


function checkWindowDifference(){
    
    //iterate a number of times equal to the number of windows
    for(var j = 0; j < kWindowDays; j++){
        var continued = false; //By default 
        var continueStreak = 1; //Streak of increased averages

        //We parse a new array based off of line two that is k days long.
        //The array is recreated with each iteration with j as the starting point
        var parsedLine = fileDataLineTwo.slice(j, (j+kWindowDays));

        function streakBreaker(){
            continued = false //No longer continuing a streak
            //We check the streak to see if it continued past 1
            if(continueStreak > 1){
                //If so, we increase the count 
                count++
            }
            //Then we reset the streak back to one
            countinueStreak = 1
        }

        //iterate a number of times equal to the amount of k days -1. 
        //We don't iterate the last time since we don't compare outside of
        //A window equal to k days. 
        for(var i = 0; i < kWindowDays-1; i++){            

            if(parsedLine[i] < parsedLine[i+1] ){
                //if the next average is greater...
                count++ //increase the count
                if(continued === true){ //if there was a pervious increase...
                    continueStreak++ //increase the streak by 1
                }
                //since the count was increased, we set continued to true
                //creating a streak, or continuing to validate it
                continued = true 
            }
            else if(parsedLine[i] > parsedLine[i+1] ){ 
                //if the next average is less...
                count-- //Decrease the count
                streakBreaker() //break the streak
            }
            else {
                //if the next average is the same...
                streakBreaker() //break the streak
            }
            
        }
        //In case the last iteration was an increase...
        if(continueStreak > 1){ 
            count++ //we increase count one final time
        }
        countArray.push(count); //Then we push the count into the countArray
        count = 0 //and reset the count
        // console.log("The current countArray is: ", countArray)
    }
}

// function display (differenceArray){ //Console log each item in the array
//     for(var i = 0; i < differenceArray.length; i++){
//         console.log(differenceArray[i])    
//     }
// }

//Run the server
http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Check out the console for the results. In the command line. Not over there ----->>>>');
}).listen(3000, "127.0.0.1");
    
console.log('Server running at http://127.0.0.1:3000/');

//console.log heavy version of the code:


// function checkWindowDifference(){
//     console.log("line two", fileDataLineTwo)
//     var countArray = [];
//     var count = 0;
//     //var kCount = 0;
//     console.log("kWindowDays",kWindowDays)
//     for(var j = 0; j < kWindowDays; j++){
//         //kCount++    
//         //var parseEnd = (j + kWindowDays);
//         var continued = false;
//         var continueStreak = 1
//         //console.log("parseEnd", parseEnd)
//         console.log("j is ", j)
//         var parsedLine = fileDataLineTwo.slice(j, (j+kWindowDays))


//         function streakBreaker(){
//             continued = false
//             if(continueStreak > 1){
//                 count++
//             }
//             countinueStreak = 1
//         }

//         for(var i = 0; i < kWindowDays-1; i++){

//             console.log(" ");
//             console.log("parsedLine", parsedLine)
//             console.log("i", i)
//             console.log("average", parsedLine[i])
//             console.log("compared average is ", parsedLine[i+1])
//             //console.log("kCount", kCount);
//             console.log("count", count);
//             console.log("continued", continued)
            
//             if(parsedLine[i] < parsedLine[i+1] ){
//                 count++
//                 console.log("count has increased! The count is now ", count)
//                 if(continued === true){
//                     continueStreak++
//                     console.log("continueStreak", continueStreak)
//                 }
//                 continued = true
//                 console.log("continueStreak", continueStreak)
//             }
//             else if(parsedLine[i] > parsedLine[i+1] ){
//                 count--
//                 console.log("count has decreased! The count is now ", count)
//                 streakBreaker()
//                 console.log("continueStreak", continueStreak)

//             }
//             else {
//                 console.log("count has remained the same! The count is now ", count)
//                 streakBreaker()
//                 console.log("continueStreak", continueStreak)
//             }
            
//         }
//         if(continueStreak > 1){
//             count++
//         }
//         countArray.push(count);
//         count = 0
//         console.log("The current countArray is: ", countArray)
//     }
// }

// function streakBreaker(){
//     continued = false
//     if(continueStreak > 1){
//         count++
//     }
//     countinueStreak = 1
// }