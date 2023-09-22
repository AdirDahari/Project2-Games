let whoPlayNow; // string contain X / O
let isGameOver = false;

/* this function checking all options to win the game.
   if their is a winner the variable whoWonTheGame store it.
   if the variable whoWonTheGame is still empty check if the board is full before continue the game. */
const isEndGame = () => {
  let whoWonTheGame;
  let cells = document.querySelectorAll("#gamerDiv > div");

  // check vertical
  for (let i = 0; i <= 2; i++) {
    if (
      cells[i].innerHTML == cells[i + 3].innerHTML &&
      cells[i].innerHTML == cells[i + 6].innerHTML &&
      cells[i].innerHTML != ""
    ) {
      whoWonTheGame = cells[i].innerHTML;
    }
  }

  // check horizontal
  for (let i = 0; i <= 6; i += 3) {
    if (
      cells[i].innerHTML == cells[i + 1].innerHTML &&
      cells[i].innerHTML == cells[i + 2].innerHTML &&
      cells[i].innerHTML != ""
    ) {
      whoWonTheGame = cells[i].innerHTML;
    }
  }

  // check diagonal
  let i = 0;
  if (
    cells[i].innerHTML == cells[i + 4].innerHTML &&
    cells[i].innerHTML == cells[i + 8].innerHTML &&
    cells[i].innerHTML != ""
  ) {
    whoWonTheGame = cells[i].innerHTML;
  }

  i = 2;
  if (
    cells[i].innerHTML == cells[i + 2].innerHTML &&
    cells[i].innerHTML == cells[i + 4].innerHTML &&
    cells[i].innerHTML != ""
  ) {
    whoWonTheGame = cells[i].innerHTML;
  }

  if (whoWonTheGame) {
    alert(`${whoWonTheGame} won the game`);
    isGameOver = true;
  } else {
    for (let cell of cells) {
      if (!cell.innerHTML) {
        return;
      }
    }
    alert("no one won the game");
    isGameOver = true;
  }
};

/* return if this cell taken.
   set cell text to whoPlayNow variable, and switch whoPlayNow variable between X / O.
   call isEndGame Function to check if we have a winner. */
const handlePlay = (myE) => {
  if (myE.target.innerHTML) {
    return;
  }
  if (!isGameOver) {
    myE.target.innerHTML = whoPlayNow;
    if (whoPlayNow == "x") {
      myE.target.style.color = "blue";
    } else {
      myE.target.style.color = "red";
    }
    whoPlayNow == "x" ? (whoPlayNow = "o") : (whoPlayNow = "x");
    isEndGame();
  }
};

// set the click event for all cells
const initPageLoad = () => {
  let cells = document.querySelectorAll("#gamerDiv > div");
  for (let cell of cells) {
    if (cell) {
      cell.addEventListener("click", handlePlay);
    }
  }
};

// x start first, and clear all cells
const newGame = () => {
  whoPlayNow = "x";
  isGameOver = false;
  let cells = document.querySelectorAll("#gamerDiv > div");
  for (let cell of cells) {
    if (cell) {
      cell.innerHTML = "";
    }
  }
};

// after website finish loading call the functions
window.addEventListener("load", () => {
  initPageLoad();
  newGame();
  document.querySelector("#playAgainBtn").addEventListener("click", () => {
    newGame();
  });
});
