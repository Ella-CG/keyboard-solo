const container = document.querySelector(".word");
const wordMistakes = document.querySelector(".word-mistakes");
const correctCount = document.querySelector(".correct-count");
const wrongCount = document.querySelector(".wrong-count");
const timer = document.querySelector("#timer");

const words = ["apple", "keyboard", "language", "table", "world", "mistake", "unicorn", "number"];
let index = 0;
let errorsCount = 0;
let countCorrect = 0;
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
        errorsCount++;
        wordMistakes.textContent = errorsCount;
        wrongCount.textContent = errorsCount;
    };

    if (index === spanElements.length) {
        index = 0;
        addWord();
        countCorrect++;
        wordMistakes.textContent = 0;
        correctCount.textContent = countCorrect;
    };

    showResult();


}

function showResult() {
    if (countCorrect === 5) {
        clearInterval(timerId);
        alert(`Победа! Ваше время: ${timer.textContent}`);
        addWord();
        errorsCount = 0;
        countCorrect = 0;
        wordMistakes.textContent = 0;
        correctCount.textContent = 0;
        wrongCount.textContent = 0;
        timer.textContent = `${addZero(minutes)}:${addZero(seconds)}`;

    }
    if (errorsCount === 5) {
        clearInterval(timerId);
        alert("Вы проиграли. Попробуйте еще раз.");
        addWord();
        errorsCount = 0;
        countCorrect = 0;
        wordMistakes.textContent = 0;
        correctCount.textContent = 0;
        wrongCount.textContent = 0;
        index = 0;
        timer.textContent = `${addZero(minutes)}:${addZero(seconds)}`;

    }
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

// document.addEventListener("click", () => {
//     timerId = setInterval(startTimer, 1000);
// })