let currentLevel = ""; // difficulty
let score = 0;
let op = ""; // Mathematical operations
let num1 = 0;
let num2 = 0;

// switch between start container and game container. set the init by selected level
const setLevel = (str) => {
    let containerStart = document.querySelector(".container-start");
    let containerGame = document.querySelector(".container-game");
    if (containerGame && containerStart) {
        containerStart.style.display = "none";
        containerGame.style.display = "block";
        if (str === "Easy") {
            initGame(10);
        } else if (str === "Medium") {
            initGame(100);
        } else if (str === "Hard") {
            initGame(1000);
        }
    }
}

// reset all global variables
const initGame = (level) => {
    currentLevel = level;
    num1 = 0;
    num2 = 0;
    score = 0;
    refresh();
}

// Randomlly pinked numbers and operations
const refresh = () => {
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
    let scoreDiv = document.querySelector(".score");
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

const getRandomNums = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
}

const getRandomOperations = () => {
    let arr = ["+", "-", "x", ":"];
    return arr[getRandomNums(0, arr.length - 1)];
}

window.addEventListener("load", () => {
    let difficultyArr = document.querySelectorAll(".difficulty > div");
    let refreshId = document.querySelector("#refreshId");
    let sendBtn = document.querySelector("#sendBtn");
    if (difficultyArr) {
        for (let level of difficultyArr) {
            level.addEventListener("click", () => {
                setLevel(level.innerHTML);
            });
        }
    }
    if (refreshId) {
        refreshId.addEventListener("click", refresh);
    }
    if (sendBtn) {
        sendBtn.addEventListener("click", () => {
            if (checkAnswer()) {
                updateScore(10);
                refresh();
            } else {
                updateScore(-5);
            }
        });
    }
})