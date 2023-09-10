import { easyGridArraySolution, easyGridArray, mediumGridArray, mediumGridArraySolution, hardGridArray, hardGridArraySolution, size } from "./grid.js";

// Global variables
const board = new Array(size);
let gridSolusion;
const cells = document.querySelectorAll(".cell");
const collection = document.querySelectorAll("#collection > .nums");
let containerStart = document.querySelector("#containerStart");
let containerGame = document.querySelector("#containerGame");
let containerFinish = document.querySelector("#finishDiv");
let timersElm = document.querySelectorAll(".timer");
let isGameStart = false; // flag to know if the game start for the first time
let isCellActive = false;
let isGamePause = false;
let pickedCell; // restore the cell
let pickRow; // restore the row
let pickCol; // restore the column
let lives = 3;
let min = 0; // timer variable
let sec = 0; // timer variable

// init game - fill 2d array with all cells
const init = (grid) => {
  let index = 0;
  for (let row = 0; row < size; row++) {
    board[row] = new Array(size);
    for (let col = 0; col < size; col++) {
      board[row][col] = cells[index];
      if (grid[row][col]) {
        board[row][col].innerHTML = grid[row][col].toString();
        board[row][col].classList.add("constant-cell");
      } else {
        board[row][col].innerHTML = "";
      }
      if (col === 2 || col === 5) {
        board[row][col].style.borderRight = "1px solid #000";
      }
      if (row === 2 || row === 5) {
        board[row][col].style.borderBottom = "1px solid #000";
      }
      index++;
    }
  }
};

// Set the constant cells that come from the grid script
const initBoard = () => {
  if (board) {
    for (let row = 0; row < size; row++) {
      for (let col = 0; col < size; col++) {
        board[row][col].addEventListener("click", () => {
          if (!isGamePause) {
            if (!board[row][col].classList.contains("constant-cell")) {
              handleCells(row, col);
            }
          }
        });
      }
    }
  }
}

// reset the board if this is not the first game
const resetBoard = () => {
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      if (!board[i][j].innerHTML) {
        board[i][j].classList.remove("constant-cell");
      }
    }
  }
}

// Random function return int between 0 - max exclusive
const randomNumber = (max) => {
  return Math.floor(Math.random() * (max));
}

// Reset all global variables and make the board by difficulty level
const newGame = (level) => {
  isCellActive = false;
  pickedHighlight();
  lives = 3;
  isGamePause = false;
  pickedCell = "";
  pickRow = "";
  pickCol = "";
  let localGrid = [];
  setLives();
  sec = 0;
  min = 0;

  if (level == "Easy") {
    let randomIndex = randomNumber(easyGridArray.length);
    localGrid = easyGridArray[randomIndex];
    gridSolusion = easyGridArraySolution[randomIndex];
  } else if (level == "Medium") {
    let randomIndex = randomNumber(mediumGridArray.length);
    localGrid = mediumGridArray[randomIndex];
    gridSolusion = mediumGridArraySolution[randomIndex];
  } else if (level == "Hard") {
    let randomIndex = randomNumber(hardGridArray.length);
    localGrid = hardGridArray[randomIndex];
    gridSolusion = hardGridArraySolution[randomIndex];
  }

  // settings if this is not the first game
  if (isGameStart) {
    init(localGrid);
    resetBoard();
  }

  // first game setting
  else if (!isGameStart) {
    init(localGrid);
    initBoard();
    timerFunc();
    isGameStart = true;
  }
};

// check if all cell are assign
const isBoardFill = () => {
  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      if (!board[row][col].innerHTML) {
        return false;
      }
    }
  }
  return true;
};

// compare active number to grid location
const comparePosition = () => {
  if (gridSolusion[pickRow][pickCol] == board[pickRow][pickCol].innerHTML) {
    gameOver();
    return true;
  } else {
    lives--;
    setLives();
    return false;
  }
};

// save picked variables to use in different locations
const pickedActivities = (cell, row, col) => {
  pickedCell = cell;
  pickRow = row;
  pickCol = col;
};

// By the condition pick what to do, if cell click twice or cell click and another cell is active or no cell active before
const handleCells = (row, col) => {
  if (pickedCell === board[row][col]) {
    isCellActive = false;
    pickedHighlight();
    pickedActivities("", "", "");
  } else if (pickedCell && isCellActive) {
    isCellActive = false;
    pickedHighlight();
    pickedActivities(board[row][col], row, col);
    isCellActive = true;
    pickedHighlight();
  } else if (!isCellActive) {
    pickedActivities(board[row][col], row, col);
    isCellActive = true;
    pickedHighlight();
  }
};

// Turn on highlight cell, row, column and box or turn off
const pickedHighlight = () => {
  if (pickedCell) {
    if (isCellActive) {
      for (let row = 0; row < size; row++) {
        for (let col = 0; col < size; col++) {
          if (pickRow == row || pickCol == col) {
            if (pickRow == row && pickCol == col) {
              board[row][col].classList.add("active-cell");
            } else {
              board[row][col].classList.add("help-cells");
            }
          }
        }
      }
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          board[pickRow - (pickRow % 3) + i][
            pickCol - (pickCol % 3) + j
          ].classList.add("help-cells");
        }
      }
    } else {
      pickedCell.classList.remove("active-cell");
      let allPicked = document.querySelectorAll(".help-cells");
      for (let cell of allPicked) {
        cell.classList.remove("help-cells");
      }
    }
  }
};

// Make a new number constant
const handleCollection = () => {
  if (comparePosition()) {
    pickedCell.classList.add("constant-cell");
    pickedCell.classList.remove("active-cell");
    isCellActive = false;
    pickedHighlight();
  }
};

// check if the game is over by lives and fill board
const gameOver = () => {
  if (lives < 1) {
    containerGame.style.display = "none";
    containerFinish.firstElementChild.innerHTML = "Game Over!";
    containerFinish.style.display = "block";
    isGamePause = true;
  }
  if (isBoardFill()) {
    containerFinish.firstElementChild.innerHTML = "You Won!";
    containerFinish.style.display = "block";
    isGamePause = true;
  }
};

// Update lives
const setLives = () => {
  let livesDiv = document.querySelector("#livesDiv");
  if (livesDiv) {
    if (lives < 0) {
      gameOver();
      return;
    }
    livesDiv.innerHTML = "lives: " + lives;
  }
};

// Update timer
const timerFunc = () => {
  setInterval(() => {
    if (!isGamePause && isGameStart && timersElm) {
      sec++;
      if (sec == 60) {
        min++;
        sec = 0;
      }
      for (let item of timersElm) {
        if (sec < 10 && min < 10) {
          item.innerHTML = `Time: 0${min}:0${sec}`;
        }
        else if (min < 10) {
          item.innerHTML = `Time: 0${min}:${sec}`;
        }
        else if (sec < 10) {
          item.innerHTML = `Time: ${min}:0${sec}`;
        } else {
          item.innerHTML = `Time: ${min}:${sec}`;
        }
      }
    }
  }, 1000)
}

window.addEventListener("load", () => {
  let difficultyList = document.querySelectorAll("#difficultyList > div");
  let pauseDiv = document.querySelector("#pauseDiv");
  let pauseBtn = document.querySelector("#pauseBtn");
  let resumeBtn = document.querySelector("#resumeBtn");
  let restartBtn = document.querySelector("#restartBtn");
  let mainMenuBtn = document.querySelector("#mainMenuBtn");
  let clearBtn = document.querySelector("#clearBtn");

  if (difficultyList) {
    for (let level of difficultyList) {
      level.addEventListener("click", () => {
        newGame(level.innerHTML);
        containerStart.style.display = "none";
        containerGame.style.display = "block";
      })
    }
  }

  if (collection) {
    for (let num of collection) {
      num.addEventListener("click", () => {
        if (!isGamePause) {
          if (isCellActive) {
            pickedCell.innerHTML = num.innerHTML;
            handleCollection();
          }
        }
      });
    }
  }

  if (pauseBtn) {
    pauseBtn.addEventListener("click", () => {
      if (pauseDiv) {
        if (!isGamePause) {
          isGamePause = true;
          pauseDiv.style.display = "block";
        }
      }
    });
  }
  if (resumeBtn) {
    resumeBtn.addEventListener("click", () => {
      if (pauseDiv) {
        if (isGamePause) {
          isGamePause = false;
          pauseDiv.style.display = "none";
        }
      }
    });
  }
  if (restartBtn) {
    restartBtn.addEventListener("click", () => {
      if (pauseDiv && containerStart) {
        pauseDiv.style.display = "none";
        containerStart.style.display = "block";
        containerGame.style.display = "none";
      }
    })
  }
  if (mainMenuBtn) {
    mainMenuBtn.addEventListener("click", () => {
      containerFinish.style.display = "none";
      containerStart.style.display = "block";
    })
  }
  if (clearBtn) {
    clearBtn.addEventListener("click", () => {
      if (pickedCell && isCellActive && !isGamePause) {
        pickedCell.innerHTML = "";
      }
    })
  }
});
