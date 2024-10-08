let randomNumber = Math.floor(Math.random() * 100) + 1;
let attempts = 0;

document.getElementById('submitGuess').addEventListener('click', function() {
    let userGuess = parseInt(document.getElementById('guessInput').value);
    attempts++;

    if (userGuess > randomNumber) {
        document.getElementById('message').textContent = "Too high! Try again.";
    } else if (userGuess < randomNumber) {
        document.getElementById('message').textContent = "Too low! Try again.";
    } else {
        document.getElementById('message').textContent = `Congratulations! You guessed the number in ${attempts} attempts!`;
        document.getElementById('submitGuess').disabled = true;
    }

    document.getElementById('attempts').textContent = `Attempts: ${attempts}`;
});

document.getElementById('resetGame').addEventListener('click', function() {
    randomNumber = Math.floor(Math.random() * 100) + 1;
    attempts = 0;
    document.getElementById('guessInput').value = '';
    document.getElementById('message').textContent = '';
    document.getElementById('attempts').textContent = '';
    document.getElementById('submitGuess').disabled = false;
});
