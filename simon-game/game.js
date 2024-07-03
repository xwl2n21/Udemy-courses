var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var first = false;
var level = 0;

$(document).keypress(function() {
    if (!first) {
        $("h1").text("Level " + level);
        first = true;
        nextSequence();
    } 
})

$("div[type='button']").click(function() {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    console.log(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1)
});

function nextSequence() {
    userClickedPattern = [];
    var randomNumber = getRandomInteger(0, 4);
    var randomChosenColour = buttonColors[randomNumber]
    gamePattern.push(randomChosenColour);
    console.log(randomNumber);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);

    level += 1;
    $("h1").text("Level " + level);
}

function playSound(name) {
    var audio = new Audio('sounds/' + name + '.mp3');
    audio.play();
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");        
    console.log($(this).hasClass("pressed"));
    setTimeout(function() {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            console.log("success");
            setTimeout(function() {
                nextSequence();
            }, 1000)
        }
    } else {
        var audio = new Audio("sounds/wrong.mp3");
        audio.play();
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);
        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
        console.log("false");
    }
}

function startOver() {
    level = 0;
    gamePattern = [];
    first = false;
}

function getRandomInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}