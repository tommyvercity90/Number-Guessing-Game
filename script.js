
const guessForm = document.getElementById("guessForm");
const guessInput = document.getElementById("guessInput");
const message = document.getElementById("message");
const attemptsDisplay = document.getElementById("attempts");
const playAgainButton = document.getElementById("playAgain");
const guessButton = document.getElementById("guessButton");

let targetNumber;
let attempts;
let gameOver;

// Start or restart the game
function startGame() {
    targetNumber = Math.floor(Math.random() * 100) + 1;
    attempts = 0;
    gameOver = false;

    attemptsDisplay.textContent = attempts;
    message.textContent = "Good luck! Make your first guess.";

    guessInput.value = "";
    guessInput.disabled = false;
    guessButton.disabled = false;
    playAgainButton.hidden = true;

    guessInput.focus();
}

// Handle the player's guess
guessForm.addEventListener("submit", function (event) {
    event.preventDefault();

    if (gameOver) {
        return;
    }

    const guess = Number(guessInput.value);

    // Validate the input
    if (
        guessInput.value.trim() === "" ||
        !Number.isInteger(guess) ||
        guess < 1 ||
        guess > 100
    ) {
        message.textContent =
            "Please enter a whole number between 1 and 100.";
        return;
    }

    // Count each valid guess
    attempts++;
    attemptsDisplay.textContent = attempts;

    // Compare the guess with the target
    if (guess === targetNumber) {
        message.textContent =
            `🎉 Correct! You guessed it in ${attempts} attempt(s)!`;

        message.style.color = "#28a745";
        endGame();
    } else if (guess < targetNumber) {
        message.textContent = "📈 Too low! Try a higher number.";
        message.style.color = "#e67e22";
    } else {
        message.textContent = "📉 Too high! Try a lower number.";
        message.style.color = "#e74c3c";
    }

    if (!gameOver) {
        guessInput.value = "";
        guessInput.focus();
    }
});

// Finish the current game
function endGame() {
    gameOver = true;
    guessInput.disabled = true;
    guessButton.disabled = true;
    playAgainButton.hidden = false;
}

// Play again
playAgainButton.addEventListener("click", function () {
    message.style.color = "#555";
    startGame();
});

// Initialize the game when the page loads
startGame();
