
// defining some variables 
var buttonColors = ["red","blue","green","yellow"]
var gamePattern = [];
var userClickPattern = [];
var started = false;
var Level = 0 ;
var i ;


// to attach a level to the game 
// when the keyboard key is pressed 
$(document).keypress(function(){
    if (started === false) {
        // this occus only when when the started is true which is manipulated in the end by startover fn !
        nextSequence();
        started=true;
}});
// when the screen mobile is used an extra feature
$(document).click(function(){
    if (started === false) {
        // this occus only when when the started is true which is manipulated in the end by startover fn !
        nextSequence();
        started=true;
}});

// making the game restart and what should i do ??
// setting values to defualt 
function startOver() {
    Level = 0;
    gamePattern = [];
    started = false
}


//now to do some shit

function checkAnswer() {
    var length = userClickPattern[userClickPattern.length -1];
    var benth = gamePattern[userClickPattern.length -1];
    if (length===benth) {
        if (userClickPattern.length == gamePattern.length) {
            setTimeout(function () {nextSequence();} ,1000)
           
        }else{
            // var audio1 = new Audio("./sounds/wrong.mp3")
            // audio1.play();
        }
        ;
        // WHEN THE INPUT IS WRONG 
    }else {
        // here audio is played when the wrong answer is clicked 
        var audio1 = new Audio("./sounds/wrong.mp3")
        audio1.play();
        // the class of game over to get a red screen 
        $("body").addClass("game-over");
        // removing the class as we need it only for a particulat time emaning removing after 200 milliseconds
        setInterval(function() {
            $("body").removeClass("game-over");
        },200 )
        $("h1").text("Game-Over , Press any key to Restart")
        // here making the whole game restart as you lost and refining all the main points to zero 
        startOver();
    }
    
}

//generating random value and operating the staring of the game 

function nextSequence(){
// all the selected by the user dissapears and have to be selected again 
userClickPattern = [];
Level++;
$("h1").text("Level " + Level);
// specieing random numbers 
var randomNumber = Math.floor(Math.random()*4)
var randomChosenColor = buttonColors[randomNumber]
gamePattern.push(randomChosenColor);
// basic animation when the buttons are clicked
$("."+randomChosenColor).animate({opacity : 0} , 50);
$("."+randomChosenColor).animate({opacity : 1} , 50);
// sound played randomly linked to the random varibale selected from the defines array 
var sound = new Audio("./sounds/" + randomChosenColor +".mp3");
sound.play();    
}

// when a button <pushed into userclick> is clicked the sound and animation occurs
// when the user puts his input 

$(".btn").click(function(){
        
        var userChosencolor = $(this).attr("id");
        userClickPattern.push(userChosencolor);
        console.log(userClickPattern);
        // this is connected to everything on the anmation of the seleted button , 
        //--> the sound selcted of the button  
        playsound(userChosencolor);
        animatePress(userChosencolor);
        checkAnswer();
})

// function for the sound when the button is clicked 
function playsound(name){
    var clickSound = new Audio("./sounds/" + name + ".mp3")
    clickSound.play();
}

//function for the animation for the button clicked 
function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed")
    setTimeout(
        function() {
            $("#" + currentColor).removeClass('pressed')
        } , 100
    )
}

