const container = document.querySelector(".word");
const wordMistakes = document.querySelector(".word-mistakes");
const correctCount = document.querySelector(".correct-count");
const wrongCount = document.querySelector(".wrong-count");
const timer = document.querySelector("#timer");

const words = ["apple", "keyboard", "language", "table", "world", "mistake", "unicorn", "number"];
let index = 0;
let errorsCount = 0;
let countCorrect = 0;
let currentMistakes = 0;
let minutes = 0;
let seconds = 0;
let timerId;

function getRandomWord(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function addZero(value) {
    if (value < 10) {
        return "0" + value;
    }
    return value;
}
startTimer();

function addWord() {

    const fragment = new DocumentFragment();
    const word = words[getRandomWord(0, 8)];
    const letters = word.split("");
    container.innerHTML = "";

    letters.forEach(letter => {
        const element = document.createElement("span");
        element.textContent = letter;
        fragment.append(element);
    })
    container.append(fragment);

}

function checkPress(event) {
    const spanElements = document.querySelectorAll('.word span');
    if (event.key === spanElements[index].textContent) {
        spanElements[index].classList.add("c");
        spanElements[index].classList.remove("w");
        index++;

    } else {
        spanElements[index].classList.add("w");
        currentMistakes++;
        wordMistakes.textContent = currentMistakes;
    };

    if (index === spanElements.length) {
        if (currentMistakes > 0) {
            errorsCount++;
        } else {
            countCorrect++;
        }
        wrongCount.textContent = errorsCount;
        correctCount.textContent = countCorrect;
        setTimeout(nextWord, 0);
    };
}

function resetGame() {
    clearInterval(timerId);
    errorsCount = 0;
    countCorrect = 0;
    wordMistakes.textContent = 0;
    correctCount.textContent = 0;
    wrongCount.textContent = 0;
    timer.textContent = `${addZero(minutes)}:${addZero(seconds)}`;
}

function checkEndGame() {
    if (countCorrect === 5) {
        alert(`Победа! Ваше время: ${timer.textContent}`);
        resetGame();

    }
    if (errorsCount === 5) {

        alert("Вы проиграли. Попробуйте еще раз.");
        resetGame();

    }
}

function nextWord() {
    checkEndGame();
    addWord();
    index = 0;
    currentMistakes = 0
    wordMistakes.textContent = 0;
}

document.addEventListener('keydown', checkPress);

function startTimer() {
    timerId = setInterval(() => {
        timer.textContent = `${addZero(minutes)}:${addZero(seconds)}`;
        seconds++;
        if (seconds === 59) {
            minutes++;
            seconds = 0;
        }
    }, 1000);


}