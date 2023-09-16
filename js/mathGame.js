let currentLevel = "";
let score = 0;
let op = ""; // Mathematical operations
let num1 = 0;
let num2 = 0;
let sec = 59;
let min = 1;
let isGameOver = false;

// switch between start container and game container. set the init by selected level
const setLevel = (str) => {
    let containerStart = document.querySelector(".container-start");
    let containerGame = document.querySelector(".container-game");
    if (containerGame && containerStart) {
        containerStart.style.display = "none";
        containerGame.style.display = "block";
        if (str === "Easy") {
            init(10);
        } else if (str === "Medium") {
            init(100);
        } else if (str === "Hard") {
            init(1000);
        }
    }
}

const init = (level) => {
    score = 0;
    sec = 59;
    min = 1;
    currentLevel = level;
    newGame();
}

// Init the game and set all variables to a new game
const newGame = () => {
    isGameOver = false;
    let questionId = document.querySelector("#questionId");
    let inputId = document.querySelector("#inputId");
    if (questionId && inputId) {
        inputId.value = "";
        num1 = getRandomNums(-currentLevel, currentLevel);
        num2 = getRandomNums(-currentLevel, currentLevel);
        let num1Str = num1;
        let num2Str = num2;
        op = getRandomOperations();
        if (+num1 < 0 && +num2 < 0) {
            num1Str = `(${num1})`;
            num2Str = `(${num2})`;
        } else if (+num1 < 0 && +num2 >= 0) {
            num1Str = `(${num1})`;
        } else if (+num1 >= 0 && +num2 < 0) {
            num2Str = `(${num2})`;
        } else {
            num1Str = num1;
            num2Str = num2;
        }
        questionId.innerHTML = `${num1Str} ${op} ${num2Str} = `;
    }
}

// check if the answer is between epsilon range and return true / false
const checkAnswer = () => {
    let inputId = document.querySelector("#inputId");
    let ans;
    let eps = 0.5;
    if (inputId) {
        switch (op) {
            case "+":
                ans = +num1 + +num2;
                break;
            case "-":
                ans = +num1 - +num2;
                break;
            case "x":
                ans = +num1 * +num2;
                break;
            case ":":
                ans = +num1 / +num2;
                break;
        }

        if (Math.abs(+inputId.value - ans) < eps)
            return true;
        else
            return false;
    }
}

// update the scoreDiv by the current score
const updateScore = (num) => {
    let scoreDiv = document.querySelector("#scoreGame");
    if (scoreDiv) {
        score += num;
        if (score < 0) {
            score = 0;
            scoreDiv.innerHTML = "Score: 00";
        } else if (score < 10) {
            scoreDiv.innerHTML = `Score: 0${score}`;
        } else {
            scoreDiv.innerHTML = `Score: ${score}`;
        }

        // style
        if (num > 0) {
            scoreDiv.style.color = "green";
            scoreDiv.style.scale = "1.1";
            setTimeout(() => {
                scoreDiv.style.color = "black";
                scoreDiv.style.scale = "1";
            }, 300)
        } else {
            scoreDiv.style.color = "red";
            scoreDiv.style.scale = "1.1";
            setTimeout(() => {
                scoreDiv.style.color = "black";
                scoreDiv.style.scale = "1";
            }, 300)
        }
    }
}

const updateTime = (num) => {
    let time = document.querySelector(".timer");
    if (sec + num > 60) {
        sec = (sec + num) - 60;
        min++;
    }
    else if (sec + num < 0) {
        sec = 60 + sec + num;
        min--;
    } else {
        sec += num;
    }
    if (num > 0) {
        time.style.color = "green";
        time.style.scale = "1.1";
        setTimeout(() => {
            time.style.color = "black";
            time.style.scale = "1";
        }, 300)
    } else {
        time.style.color = "red";
        time.style.scale = "1.1";
        setTimeout(() => {
            time.style.color = "black";
            time.style.scale = "1";
        }, 300)
    }
}

// return random number 
const getRandomNums = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
}

// return random oparator
const getRandomOperations = () => {
    let arr = ["+", "-", "x", ":"];
    return arr[getRandomNums(0, arr.length - 1)];
}

// timer count down
const timerFunc = () => {
    let time = document.querySelector(".timer");
    setInterval(() => {
        if (!isGameOver) {
            if (time) {
                if (sec < 0) {
                    sec = 59;
                    min--;
                }
                if (min < 0) {
                    gameOver();
                    return;
                }
                if (sec < 10) {
                    time.innerHTML = `Time: ${min}:0${sec}`;
                } else {
                    time.innerHTML = `Time: ${min}:${sec}`;
                }
                sec--;
            }
        }

    }, 1000)
}

// When the time is over switch to finish container
const gameOver = () => {
    let finishDiv = document.querySelector(".container-finish");
    let gameDiv = document.querySelector(".container-game");
    isGameOver = true;
    if (finishDiv && gameDiv) {
        gameDiv.style.display = "none";
        finishDiv.style.display = "block";
        let scoreFinish = document.querySelector("#scoreFinish");
        scoreFinish.innerHTML = `Score: ${score}`;
    }
}

window.addEventListener("load", () => {
    timerFunc();
    let difficultyArr = document.querySelectorAll(".difficulty > div");
    let refreshId = document.querySelector("#refreshId");
    let sendBtn = document.querySelector("#sendBtn");
    let finishBtn = document.querySelector(".finish-button");
    if (difficultyArr) {
        for (let level of difficultyArr) {
            level.addEventListener("click", () => {
                setLevel(level.innerHTML);
            });
        }
    }
    if (refreshId) {
        refreshId.addEventListener("click", () => {
            newGame();
        });
    }
    if (sendBtn) {
        sendBtn.addEventListener("click", () => {
            if (checkAnswer()) {
                updateScore(10);
                updateTime(5);
                newGame();
            } else {
                updateScore(-5);
                updateTime(-10);
            }
        });
    }
    if (finishBtn) {
        finishBtn.addEventListener("click", () => {
            let finishDiv = document.querySelector(".container-finish");
            let startDiv = document.querySelector(".container-start");
            if (finishDiv && startDiv) {
                finishDiv.style.display = "none";
                startDiv.style.display = "block";
            }
        })
    }
})