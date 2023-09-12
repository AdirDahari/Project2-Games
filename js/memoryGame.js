// Global variable
const boxs = document.querySelectorAll(".box");
const sponImgs = document.querySelectorAll(".sponImg");
const imgs = [
  "./img/img1.png",
  "./img/img2.png",
  "./img/img3.png",
  "./img/img4.png",
  "./img/img5.png",
  "./img/img6.png",
  "./img/img7.png",
  "./img/img8.png",
];
let twoImg = [];
let openCards = 0;
let isGameOver = false;
let isGamePause = false;
let sec = 0;
let min = 0;


// Random function
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
}

// Set the board
const init = () => {
  boxClick();
  newGame();
};

// Randomlly set the images
const newGame = () => {
  for (let img of sponImgs) {
    img.src = "";
  }
  for (let box of boxs) {
    box.firstChild.style.display = "none";
  }
  let timer = document.querySelectorAll(".timer");
  let numsThatAdd = [];
  let i = 0;
  isGameOver = false;
  isGamePause = false;
  sec = 0;
  min = 0;
  for (let time of timer) {
    time.innerHTML = "Time: 00:00";
  }
  while (sponImgs.length != numsThatAdd.length) {
    let num1 = getRandomIntInclusive(0, 15);
    let num2 = getRandomIntInclusive(0, 15);
    if (
      num1 != num2 &&
      !numsThatAdd.includes(num1) &&
      !numsThatAdd.includes(num2)
    ) {
      sponImgs[num1].src = imgs[i];
      sponImgs[num2].src = imgs[i];
      numsThatAdd.push(num1);
      numsThatAdd.push(num2);
      i++;
    }
  }
  openCards = 0;
}

// Set the click
const boxClick = () => {
  for (let box of boxs) {
    box.addEventListener("click", () => {
      if (box.firstChild.style.display != "block" && !isGamePause) {
        box.firstChild.style.display = "block";
        twoImg.push(box.firstChild);
        if (twoImg.length == 2) {
          checkTwoImg(twoImg);
        }
      }
    });
  }
};

// Check between two cards
const checkTwoImg = (arr) => {
  if (arr[0].src == arr[1].src) {
    openCards += 2;
    if (openCards == sponImgs.length) {
      gameOver();
    }
  } else {
    setTimeout(() => {
      arr[0].style.display = "none";
      arr[1].style.display = "none";
    }, 600);
  }
  twoImg = [];
};

// Reset the game by display the finishDiv and call newGame function
const restartFunc = () => {
  let finishDiv = document.querySelector("#finishDiv");
  let pauseDiv = document.querySelector("#pauseDiv");
  if (finishDiv && pauseDiv) {
    finishDiv.style.display = "none";
    pauseDiv.style.display = "none";
  }
  newGame();
}

// active finishDiv
const gameOver = () => {
  let finishDiv = document.querySelector("#finishDiv");
  if (finishDiv) {
    finishDiv.style.display = "block";
  }
  isGameOver = true;
}

// Timer
const setTimer = (timerArr) => {
  setInterval(() => {
    if (!isGameOver && !isGamePause) {
      sec++;
      if (sec == 60) {
        min++;
        sec = 0;
      }
      for (let time of timerArr)
        if (sec < 10 && min < 10) {
          time.innerHTML = `Time: 0${min}:0${sec}`;
        }
        else if (min < 10) {
          time.innerHTML = `Time: 0${min}:${sec}`;
        }
        else if (sec < 10) {
          time.innerHTML = `Time: ${min}:0${sec}`;
        } else {
          time.innerHTML = `Time: ${min}:${sec}`;
        }
    }
  }, 1000)
}

// Load website
window.addEventListener("load", () => {
  init();
  let restartBtn = document.querySelectorAll(".restartBtn");
  let timer = document.querySelectorAll(".timer");
  let pauseBtn = document.querySelector("#pauseBtn");
  let resumeBtn = document.querySelector("#resumeBtn");
  let pauseDiv = document.querySelector("#pauseDiv");

  if (restartBtn) {
    for (let item of restartBtn) {
      item.addEventListener("click", restartFunc)
    }
  }
  if (timer) {
    setTimer(timer)
  }
  if (pauseBtn) {
    pauseBtn.addEventListener("click", () => {
      if (pauseDiv) {
        pauseDiv.style.display = "block";
        isGamePause = true;
      }
    })
  }
  if (resumeBtn) {
    resumeBtn.addEventListener("click", () => {
      if (pauseDiv) {
        pauseDiv.style.display = "none";
        isGamePause = false;
      }
    })
  }
});
