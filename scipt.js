// Scores
let userScore = 0;
let compScore = 0;
let roundCount = 0;
const maxRounds = 5;

// Select elements
const choices = document.querySelectorAll(".choice");
const msg = document.querySelector("#msg");
const userScorePara = document.querySelector("#user-score");
const compScorePara = document.querySelector("#comp-score");

const userChoicePara = document.querySelector("#user-choice");
const compChoicePara = document.querySelector("#comp-choice");

// Select the Play Again button from HTML
const playAgainBtn = document.querySelector("#play-again");

// Generate computer choice
const genCompChoice = () => {
    const options = ["rock", "paper", "scissors"];
    const randIdx = Math.floor(Math.random() * 3);
    return options[randIdx];
};

// Draw game
const drawGame = () => {
    msg.innerText = "Game was Draw. Play again!";
    msg.style.backgroundColor = "#081b31";
};

// Show winner
const showWinner = (userWin, userChoice, compChoice) => {
    if (userWin) {
        userScore++;
        userScorePara.innerText = userScore;
        msg.innerText = `You Win! ${userChoice} beats ${compChoice}`;
        msg.style.backgroundColor = "green";
    } else {
        compScore++;
        compScorePara.innerText = compScore;
        msg.innerText = `You Lost! ${compChoice} beats ${userChoice}`;
        msg.style.backgroundColor = "red";
    }
};

// FINAL RESULT
const showFinalResult = () => {
    if (userScore > compScore) {
        msg.innerText = "🎉 You Won the Game!";
        msg.style.backgroundColor = "green";
    } else if (compScore > userScore) {
        msg.innerText = "😢 Computer Won the Game!";
        msg.style.backgroundColor = "red";
    } else {
        msg.innerText = "🤝 Game Draw!";
        msg.style.backgroundColor = "#081b31";
    }

    playAgainBtn.style.display = "block"; // show button after game ends
};

// Main game logic
const playGame = (userChoice) => {

    if (roundCount >= maxRounds) return; // stop game

    roundCount++;

    const compChoice = genCompChoice();

    // Show choices
    userChoicePara.innerText = `Your choice: ${userChoice}`;
    compChoicePara.innerText = `Computer choice: ${compChoice}`;

    if (userChoice === compChoice) {
        drawGame();
    } else {
        let userWin;

        if (userChoice === "rock") {
            userWin = compChoice === "paper" ? false : true;
        } else if (userChoice === "paper") {
            userWin = compChoice === "scissors" ? false : true;
        } else {
            userWin = compChoice === "rock" ? false : true;
        }

        showWinner(userWin, userChoice, compChoice);
    }

    // after max rounds
    if (roundCount === maxRounds) {
        setTimeout(showFinalResult, 500);
    }
};

// Click events for choices
choices.forEach((choice) => {
    choice.addEventListener("click", (e) => {
        playGame(e.currentTarget.id);
    });
});

// RESET GAME
playAgainBtn.addEventListener("click", () => {
    userScore = 0;
    compScore = 0;
    roundCount = 0;

    userScorePara.innerText = 0;
    compScorePara.innerText = 0;

    msg.innerText = "Play your move";
    msg.style.backgroundColor = "#081b31";

    userChoicePara.innerText = "Your choice: -";
    compChoicePara.innerText = "Computer choice: -";

    playAgainBtn.style.display = "none";
});