const testWrapper = document.querySelector(".test-wrapper");
const testArea = document.querySelector("#test-area");
const originText = document.querySelector("#origin-text p").innerHTML;
const resetButton = document.querySelector("#reset");
const theTimer = document.querySelector(".timer");

//var timer = 0;


var timer = [0,0,0,0];
var interval;
var timerRunning = false;


// Add leading zero to numbers 9 or below (purely for aesthetics):
function leadingZero(time){
    if(time <=9){
        time = "0" + time;
    }
    return time;
}

//---------------------------------- Run a standard minute/second/hundredths timer:
function runtimer(){
    // let currentTime = leadingZero(timer[0]) + " : "+ leadingZero(timer[1]) + " : "+ leadingZero(timer[2]); +" : "+ leadingZero(timer[3]);
    let currentTime = leadingZero(timer[1]) + " : "+ leadingZero(timer[2]) +" : "+ leadingZero(timer[3]);

    theTimer.innerHTML = currentTime;
    timer[3]++;
    if (timer[3] == 100){
        timer[2]++;
        timer[3] = 0;
    }
    if(timer[2] == 60){
        timer[1]++;
        timer[2] = 0;
    }

    // if(timer[1] == 60){
    //     timer[0]++;
    //     timer[1] = 0;
    // }
}


// -------------------Match the text entered with the provided text on the page:

function spellcheck() {
    let textEntered = testArea.value;
    let correctSubstring = originText.substring(0,textEntered.length);

    if (textEntered == originText){
        clearInterval(interval);
        testArea.style.color = "green";
        testWrapper.style.borderColor = "green";
    }
    else if(textEntered == correctSubstring){
        testArea.style.color = "blue";
        testWrapper.style.borderColor = "blue";

    }
    else{
        testArea.style.color = "red";
        testWrapper.style.borderColor = "red";

    }
    console.log(textEntered);
}


// -------------------Start the timer:

function start() {
    let textEnteredLength = testArea.value.length;
    if (textEnteredLength == 0 && !timerRunning){
        timerRunning = true;
        interval = setInterval(runtimer,10);
    }
    console.log(textEnteredLength);
}


//--------------- Reset everything:
function reset() {
    clearInterval(interval);
    theTimer.innerHTML = "00:00:00";
    timer = [0,0,0,0];
    testArea.value = "";
    timerRunning = false;
    testWrapper.style.borderColor = "grey";
}

// Event listeners for keyboard input and the reset button:
testArea.addEventListener("keypress",start,false);
testArea.addEventListener("keyup",spellcheck,false);
resetButton.addEventListener("click",reset,false);