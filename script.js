function game() {
    while (roundsPlayed < 5 && userScore < 3 && computerScore < 3) {
        let computerChoice = getComputerChoice();


        let roundWinner = playRound(userChoice,computerChoice);
        
        if (roundWinner === "draw") {
            alert(`You chose ${userChoice} and the computer chose ${computerChoice}. It's a draw!`);
        } else if (roundWinner === "user") {
            alert(`You chose ${userChoice} and the computer chose ${computerChoice}. You win!`);
            userScore++;
            roundsPlayed++;
        } else {
            alert(`You chose ${userChoice} and the computer chose ${computerChoice}. You lose D:`);
            computerScore++;
            roundsPlayed++;
        }
    }
}

function initialiseSelectionScreen() {
    const fighters = document.querySelectorAll(".fighter");
    fighters.forEach((fighter) => {
        // Add the 'hover' class when the cursor is over any of the fighters.
        fighter.addEventListener("mouseover", () => {
            fighter.classList.toggle("hover");
        });
    
        // Remove the 'hover' class when the cursor leaves the fighter's image.
        fighter.addEventListener("mouseout", () => {
            fighter.classList.toggle("hover");
        });
    
        fighter.addEventListener("click", selectFighter, {
            once: true
        });
    });
}

function selectFighter(event) {
    const selectionScreen = document.querySelector(".selection-screen");
    const selectedFighter = event.srcElement.parentElement.dataset.fighter;
    const gameScreen = document.querySelector(".game-screen");

    setPlayerCharacter(selectedFighter); // Set the player character's image filepath first.
    
    selectionScreen.addEventListener("transitionend", () => {
        selectionScreen.style.display = "none";
        gameScreen.style.display = "flex";
        gameScreen.classList.add("active"); // Have to use 'add' because 'toggle' doesn't work.
    });
    
    selectionScreen.classList.toggle("character-selected");
}

function setPlayerCharacter(chosenCharacter) {
    const playerCharacterImage = document.querySelector("#player-character");
    playerCharacterImage.setAttribute("src", `assets/${chosenCharacter}.png`);
}

function initialiseGameScreen() {
    const choices = document.querySelectorAll(".choice");
    choices.forEach((choice) => {
        choice.addEventListener("click", playRound);
    });
}

function getComputerChoice() {
    const possibleChoices = ["scissors", "paper", "stone"];
    let computerChoice = Math.floor(Math.random() * 3);
    console.log(`Computer choice is ${possibleChoices[computerChoice]}`);
    
    return possibleChoices[computerChoice];
}

function playRound(event) {
    // Get the current score of the user & the computer.
    let userScore = document.querySelector("#user-score");
    let computerScore = document.querySelector("#computer-score");
    
    // Store the user's & computer's choice for this round in variables.
    const userChoice = event.target.parentElement.attributes.id.nodeValue;
    const computerChoice = getComputerChoice();
    
    if (userChoice === computerChoice) {
        // Show on screen that it's a draw.
        console.log("Draw!");
    } else if ((userChoice === "scissors" && computerChoice === "paper") ||
    (userChoice === "paper" && computerChoice === "stone") ||
    (userChoice === "stone" && computerChoice === "scissors")) {
        // Show on screen that user won.
        
        // Increase the user score.
        userScore.textContent = +userScore.textContent + 1
    } else {
        // Show on screen that computer won.
        
        // Increase the computer score.
        computerScore.textContent = +computerScore.textContent + 1
    }

    if (+userScore < 3 && computerScore < 3) {
        // Run a function to initialise the final screen.
    }
}

initialiseSelectionScreen();
initialiseGameScreen();