// GAME FUNCTION:
// - Player must guess a number between a min and a max
// - Player gets a certain amount of guesses
// - Notify player of guesses remaining
// - Notifiy the player of the correct answer if lose
// - Let player choose to play again

// Game values
let min = 1,
  max = 10,
  winningNum = getRandomNum(min, max), // later will be random
  guessesLeft = 3;

// UI Elements
const UIgame = document.querySelector("#game"),
  minNum = document.querySelector(".min-num"),
  maxNum = document.querySelector(".max-num"),
  guessBtn = document.querySelector("#guess-btn"),
  guessInput = document.querySelector("#guess-input"),
  message = document.querySelector(".message");

// Assign UI min & max
minNum.textContent = min;
maxNum.textContent = max;

// Play again event listener
UIgame.addEventListener("mousedown", function(e) {
  if (e.target.className === "play-again") {
    window.location.reload();
  }
});

// Listen for guess
guessBtn.addEventListener("click", function() {
  // Wrap the value inside a parseInt because until this point it's returned as a string
  let guess = parseInt(guessInput.value);

  // Validate, isNaN is a javascript registered function
  if (isNaN(guess) || guess < min || guess > max) {
    setMessage(`Please enter a number between ${min} and ${max}`, "red");
  }

  // Check if won
  if (guess === winningNum) {
    // Game over - won
    gameOver(true, `${winningNum} is correct, you WIN!`);
  } else {
    guessesLeft -= 1; // Shorter way of doing guessesLeft = guessesLeft -1
    if (guessesLeft === 0) {
      // Game over - lost
      gameOver(
        false,
        `Game Over, you lost. The correct number was ${winningNum}`
      );
    } else {
      // Game continues - answer wrong

      // Change border color
      guessInput.style.borderColor = "red";
      // Clear input
      guessInput.value = "";
      // Tell user its the wrong number
      setMessage(`${guess} is not correct, ${guessesLeft} guesses left`, "red");
    }
  }
});

// Game over, 1st parameter 'won' can be true or false, 2nd is a message
function gameOver(won, msg) {
  // Empty var
  let color;
  // Ternary operator, if won then color is green, if then lose color is red
  won === true ? (color = "lightgreen") : (color = "red");

  // Disable input
  guessInput.disabled = true;
  // Change border color
  guessInput.style.borderColor = color;
  // Set text color
  message.style.color = color;
  // Set message
  setMessage(msg);

  // Play again?
  guessBtn.value = "Play again";
  guessBtn.className += "play-again"; // Append class, in case element already has a class
}

// JAVASCRIPT FUNCTIONS HOISTING
// IMPORTANT TO DECLARE ALL VARIABLES AT THE TOP OF A FUNCTION
// FUNCTION DECLARATIONS DON'T NEED TO BE DECLARED IN THE CODE BEFORE THEY'RE USED
// THIS ONLY APPLIES TO DECLARATIONS, NOT EXPRESSIONS

// functionExpression();        // undefined
// functionDeclaration();        // "Function declaration called."

// var functionExpression = function() {
//     console.log('Function expression called.');
// };

// functionExpression();        // "Function expression called."
// functionDeclaration();        // "Function declaration called."

// function functionDeclaration() {
//     console.log('Function declaration called.');
// }

// functionExpression();        // "Function expression called."
// functionDeclaration();        // "Function declaration called."

// Get Random Winning Number
function getRandomNum(min, max) {
  // With random we generate a random number with 18 decimals (0.022642528939712525)

  // round down to integer       10  -  1   +  1  = 9
  return Math.floor(Math.random() * (max - min) + min);
  // This is to random between 1-10, we can change the min & max vars and still get the value between them without hitting the max or going down the min.
}

// Set message
function setMessage(msg, color) {
  message.style.color = color;
  message.textContent = msg;
}
