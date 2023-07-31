/*
When user lands on the page, it'll show a dog on the left & a cat on the right. Can use this Google search for ideas: cats vs dogs war
User picks the player they want to play as.
Once they choose, elements currently on screen will fade out & main game elements will transition in.
*/
    
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
});

function game() {
    if (!confirm("Do you want to play the game?")) {
        alert("You're not playing? Aw :(");
    } else {
        alert("Let's play! The player who wins the most out of 5 rounds wins.");

        // Initialise counter variables for no. of rounds played, user's score, and computer's score.
        let roundsPlayed = 0;
        let userScore = 0;
        let computerScore = 0;

        while (roundsPlayed < 5 && userScore < 3 && computerScore < 3) {
            let userChoice = getUserChoice();
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

            alert(`You currently have ${userScore} point${userScore === 1 ? "" : "s"}. The computer has ${computerScore} point${computerScore === 1 ? "" : "s"}.`);
        }

        if (userScore > computerScore) {
            alert("You have emerged... victorious. While the battle wages on, know that, for today at least, you have struck fear in the machines.");
        } else {
            alert("The machines have won. While the battle wages on & all hope is not lost yet, humanity has suffered a major defeat today.");
        }
    }
}

function getUserChoice() {
    let userChoice;

    while (userChoice !== "scissors" && userChoice !== "paper" && userChoice !== "stone") {
        userChoice = prompt("Time to make a choice! Enter either Scissors, Paper, or Stone.").toLowerCase();
    }

    return userChoice;
}

function getComputerChoice() {
    let computerChoice = Math.floor(Math.random() * 3);
    console.log(`Computer choice is ${computerChoice}`);

    if (computerChoice === 0) {
        return "scissors";
    } else if (computerChoice === 1) {
        return "paper";
    } else {
        return "stone";
    }
}

function playRound(userChoice,computerChoice) {
    if (userChoice === computerChoice) {
        return "draw";
    } else if ((userChoice === "scissors" && computerChoice === "paper") || (userChoice === "paper" && computerChoice === "stone") || (userChoice === "stone" && computerChoice === "scissors")) {
        return "user";
    } else {
        return "computer";
    }
}

// game();