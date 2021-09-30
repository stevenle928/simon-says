const buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];

var userClickedPattern = [];
var level = 0;

var gameStart = false;
$(document).on("keydown", function() {
  if (gameStart === false) {
    gameStart = true;
    $("#level-title").html("Level " + level);
    nextSequence();
  }
});


$(".btn").click(function() {
  var userChosenColour = $(this).attr('id');

  playSound(userChosenColour);
  animatePress(userChosenColour);
  if (gameStart === true) {
    userClickedPattern.push(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
  }

});

function nextSequence() {
  level++;
  $("#level-title").html("Level " + level);
  userClickedPattern = [];
  var num = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[num];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeOut(200).fadeIn(200).fadeOut(200).fadeIn(200);
  playSound(randomChosenColour);
}

function playSound(name) {
  var audio = new Audio('sounds/' + name + '.mp3');
  audio.play();
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

function checkAnswer(lastIndex) {
  if (gamePattern[lastIndex] === userClickedPattern[lastIndex]) {
    console.log("success");
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(nextSequence(), 1000);
    }
  } else {
    $("#level-title").html("Game Over, Press Any Key to Restart");
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    console.log("wrong");
    startOver();
  }
}

function startOver() {
  level = 0;
  gamePattern = [];
  gameStart = false;
}
