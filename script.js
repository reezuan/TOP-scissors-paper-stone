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
        gameScreen.style.visibility = "visible";
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

function removeGameScreen() {
    const choices = document.querySelectorAll(".choice");
    const gameScreen = document.querySelector(".game-screen");
    
    choices.forEach((choice) => {
        choice.removeEventListener("click", playRound);
    });

    // Fade everything on game screen out.
    gameScreen.classList.toggle("game-over");
    gameScreen.classList.remove("active");
    gameScreen.addEventListener("transitionend", () => {
        gameScreen.style.visibility = "hidden";
        gameScreen.style.display = "none";
    });
}

function displayWinnerUser(event) {
    // Create & append container for final screen.
    const body = document.querySelector("body");
    const finalScreen = document.createElement("div");
    body.appendChild(finalScreen);
    
    finalScreen.classList.toggle("final-screen");
    
    // Create & append container for winning character's image.
    const winnerImageContainer = document.createElement("div");
    const winnerImage = document.createElement("img");
    
    winnerImage.setAttribute("src", document.querySelector("#player-character").getAttribute("src"));
    winnerImageContainer.appendChild(winnerImage);
    finalScreen.appendChild(winnerImageContainer);

    // Create & append container for final screen text.
    const winnerTextContainer = document.createElement("div");
    const winnerText = document.createElement("h2");

    winnerTextContainer.classList.toggle("final-text");

    winnerText.textContent = "You have won this battle today. The fountains of catnip have opened...";

    winnerTextContainer.appendChild(winnerText);
    finalScreen.appendChild(winnerTextContainer);
}

function displayWinnerComputer(event) {
    // Create & append container for final screen.
    const body = document.querySelector("body");
    const finalScreen = document.createElement("div");
    body.appendChild(finalScreen);
    
    finalScreen.classList.toggle("final-screen");
    
    // Create & append container for winning character's image.
    const winnerImageContainer = document.createElement("div");
    const winnerImage = document.createElement("img");
    
    winnerImage.setAttribute("src", "assets/evil-cat.png");
    winnerImageContainer.appendChild(winnerImage);
    finalScreen.appendChild(winnerImageContainer);

    // Create & append container for final screen text.
    const winnerTextContainer = document.createElement("div");
    const winnerText = document.createElement("h2");

    winnerTextContainer.classList.toggle("final-text");

    winnerText.textContent = "Lucifer has won. Today is a dark day for us all...";

    winnerTextContainer.appendChild(winnerText);
    finalScreen.appendChild(winnerTextContainer);
}

function playRound(event) {
    // Get the current score of the user & the computer.
    const userScore = document.querySelector("#user-score");
    const computerScore = document.querySelector("#computer-score");

    // To show who wins/loses each round, or if it's a draw.
    const announcement = document.querySelector("#announcement");
    
    // Store the user's & computer's choice for this round in variables.
    const userChoice = event.target.parentElement.attributes.id.nodeValue;
    const computerChoice = getComputerChoice();
    
    if (userChoice === computerChoice) {
        announcement.textContent = `You chose ${userChoice}. Lucifer chose ${computerChoice}. It's a draw!`;
    } else if ((userChoice === "scissors" && computerChoice === "paper") ||
    (userChoice === "paper" && computerChoice === "stone") ||
    (userChoice === "stone" && computerChoice === "scissors")) {
        announcement.textContent = `You chose ${userChoice}. Lucifer chose ${computerChoice}. You win!`;
        userScore.textContent = +userScore.textContent + 1
    } else {
        announcement.textContent = `You chose ${userChoice}. Lucifer chose ${computerChoice}. Lucifer wins!`;
        computerScore.textContent = +computerScore.textContent + 1
    }

    if (+userScore.textContent === 5) {
        document.querySelector(".game-screen").addEventListener("transitionend", displayWinnerUser); // Detecting 2 transitions?
        removeGameScreen();
    } else if (+computerScore.textContent === 5) {
        document.querySelector(".game-screen").addEventListener("transitionend", displayWinnerComputer);
        removeGameScreen();
    }
}

initialiseSelectionScreen();
initialiseGameScreen();