const btnRules = document.querySelector(".rules-btn");
const btnClose = document.querySelector(".close-btn");
const modalRules = document.querySelector(".modal");

const CHOICES = [
  {
    name: "paper",
    beats: "rock",
  },
  {
    name: "scissors",
    beats: "paper",
  },
  {
    name: "rock",
    beats: "scissors",
  },
];
const choiceButtons = document.querySelectorAll(".choice-btn");
const gameDiv = document.querySelector(".game");
const resultsDiv = document.querySelector(".results");
const resultDivs = document.querySelectorAll(".results__result");

const resultWinner = document.querySelector(".results__winner");
const resultText = document.querySelector(".results__text");

const playAgainBtn = document.querySelector(".play-again");

const scoreNumber = document.querySelector(".score__number");
let playerScore = parseInt(localStorage.getItem("playerScore")) || 0;

const scoreNumber1 = document.querySelector(".score1__number1");
let aiScore = parseInt(localStorage.getItem("aiScore")) || 0;


choiceButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const choiceName = button.dataset.choice;
    const choice = CHOICES.find((choice) => choice.name === choiceName);
    choose(choice);
  });
});

function choose(choice) {
  const aiChoice = aiChoose();
  displayResults([choice, aiChoice]);
  displayWinner([choice, aiChoice]);
}

function aiChoose() {
  const rand = Math.floor(Math.random() * CHOICES.length);
  return CHOICES[rand];
}

function displayResults(results) {
  resultDivs.forEach((resultDiv, idx) => {
    setTimeout(() => {
      resultDiv.innerHTML = `
        <div class="choice ${results[idx].name}">
          <img src="${results[idx].name}.svg" alt="${results[idx].name}" />
        </div>
      `;
    });
  });

  gameDiv.classList.toggle("hidden");
  resultsDiv.classList.toggle("hidden");
}

function displayWinner(results) {
  setTimeout(() => {
    const userWins = isWinner(results);
    const aiWins = isWinner(results.reverse());

    if (userWins) {
      resultText.innerText = "you win ";
      resultDivs[0].classList.toggle("winner");
      updateScores(1, 0);
      document.querySelector(".next-btn").classList.remove("hidden");
     
    } else if (aiWins) {
      resultText.innerText = "you lose";
      resultDivs[1].classList.toggle("winner");
      updateScores(0, 1);
    } else {
      resultText.innerText = "Tie up";
      updateScores(0, 0);
    }

    scoreNumber.innerText = playerScore;
    scoreNumber1.innerText = aiScore;

    resultWinner.classList.toggle("hidden");
    resultsDiv.classList.toggle("show-winner");

    playAgainBtn.disabled = false;

    
  });
}

function isWinner(results) {
  return results[0].beats === results[1].name;
}

function updateScores(playerPoint, aiPoint) {
  playerScore += playerPoint;
  aiScore += aiPoint;

  localStorage.setItem("playerScore", playerScore);
  localStorage.setItem("aiScore", aiScore);
}

function resetScores() {
  playerScore = 0;
  aiScore = 0;
  scoreNumber.innerText = playerScore;
  scoreNumber1.innerText = aiScore;

  localStorage.removeItem("playerScore");
  localStorage.removeItem("aiScore");
}


window.addEventListener("load", () => {
  scoreNumber.innerText = playerScore;
  scoreNumber1.innerText = aiScore;
});


playAgainBtn.addEventListener("click", () => {
  gameDiv.classList.toggle("hidden");
  resultsDiv.classList.toggle("hidden");

  resultDivs.forEach((resultDiv) => {
    resultDiv.innerHTML = "";
    resultDiv.classList.remove("winner");
  });

  resultText.innerText = "";
  resultWinner.classList.toggle("hidden");
  resultsDiv.classList.toggle("show-winner");

 

  playAgainBtn.disabled = true;
});


btnRules.addEventListener("click", () => {
  modalRules.classList.toggle("show-modal");
});
btnClose.addEventListener("click", () => {
  modalRules.classList.toggle("show-modal");
});


playAgainBtn.addEventListener("click", () => {
  window.location.href = "index.html";
});

const nextBtn = document.querySelector(".next-btn");
nextBtn.addEventListener("click", () => {
  window.location.href = "winner.html";
});