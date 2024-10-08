let timeRemaining = 60;
let stage = 1;
let correctClicks = 0;
let sequence = [];
let playerClicks = [];
let timer;
let isGameRunning = false;

function startGame() {
    if (isGameRunning) return;
    isGameRunning = true;
    resetGame();
    startStage(stage);
    startTimer(timeRemaining);
    document.getElementById("submit-btn").style.display = "inline-block";
}

function resetGame() {
    document.getElementById("result-message").innerText = "";
    document.getElementById("game-board").innerHTML = "";
    timeRemaining = 60;
    stage = 1;
    correctClicks = 0;
    playerClicks = [];
    updateGameInfo();
}

function startStage(stage) {
    sequence = generateSequence(stage);
    shuffleArray(sequence);
    displayBlocks(sequence);
    correctClicks = 0;
    playerClicks = [];
}

function generateSequence(stage) {
    let numbers = [];
    if (stage === 1) {
        numbers = Array.from({ length: 12 }, (_, i) => i + 1);
    } else if (stage === 2) {
        numbers = Array.from({ length: 12 }, (_, i) => i + 13);
    } else if (stage === 3) {
        numbers = Array.from({ length: 12 }, (_, i) => String.fromCharCode(i + 65)); // A-L
    } else if (stage === 4) {
        numbers = Array.from({ length: 12 }, (_, i) => String.fromCharCode(i + 77)); // M-X
    } else if (stage === 5) {
        numbers = Array.from({ length: 12 }, (_, i) => i + 25);
    }
    return numbers;
}

function displayBlocks(sequence) {
    const gameBoard = document.getElementById("game-board");
    gameBoard.innerHTML = "";
    sequence.forEach((num, index) => {
        const block = document.createElement("div");
        block.classList.add("game-block");
        block.innerText = num;
        block.addEventListener("click", () => handleClick(block, num));
        gameBoard.appendChild(block);
    });
}

function handleClick(block, value) {
    if (!isGameRunning) return;

    const expectedValue = sequence[correctClicks];
    if (value === expectedValue) {
        correctClicks++;
        block.classList.add("correct");
        playerClicks.push(value);
    } else {
        timeRemaining--; // Deduct time for incorrect click
    }

    updateGameInfo();
}

function submitSequence() {
    if (playerClicks.length === sequence.length && arraysMatch(playerClicks, sequence)) {
        showStageCompleteModal();
    } else {
        endGame("Incorrect sequence! Game over.");
    }
}

function arraysMatch(arr1, arr2) {
    if (arr1.length !== arr2.length) return false;
    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) return false;
    }
    return true;
}

function showStageCompleteModal() {
    const modal = document.getElementById("stage-complete-modal");
    const modalText = document.getElementById("modal-text");

    if (stage === 5) {
        modalText.innerText = "Congratulations, you've completed the game!";
        document.getElementById("next-stage-btn").style.display = "none";
    } else {
        modalText.innerText = `Stage ${stage} Complete!`;
        document.getElementById("next-stage-btn").style.display = "inline-block";
    }

    modal.style.display = "block";
}

function closeModal() {
    document.getElementById("stage-complete-modal").style.display = "none";
}

function nextStage() {
    closeModal();
    stage++;
    if (stage > 5) {
        endGame("Congratulations, you won!");
    } else {
        startStage(stage);
    }
    updateGameInfo();
}

function updateGameInfo() {
    document.getElementById("time").innerText = timeRemaining;
    document.getElementById("stage").innerText = stage;
}

function startTimer(seconds) {
    timer = setInterval(() => {
        seconds--;
        timeRemaining = seconds;
        updateGameInfo();
        if (seconds <= 0) {
            clearInterval(timer);
            endGame("Game Over! Time's up.");
        }
    }, 1000);
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function endGame(message) {
    clearInterval(timer);
    isGameRunning = false;
    document.getElementById("submit-btn").style.display = "none";
    document.getElementById("result-message").innerText = message;
}
