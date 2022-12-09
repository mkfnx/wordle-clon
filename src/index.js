import { evaluateGuess, checkWin } from "./wordCheck.js";
import GuessState from "./GuessState.js";

const wordLength = 5;
const word = "steam";
const board = document.getElementById("gameboard");
const keyboard = document.getElementById("keyboard");
const maxGuesses = 6;

var gameInProgress = true;
var guessNumber = 0;
var row = board.children[guessNumber];
var currentGuessWord = "";
var currentUsedKeys = [];

function setupListeners() {
    for (var i = 0; i < keyboard.children.length; i++) {
        for (var j = 0; j < keyboard.children[i].children.length; j++) {
            const key = keyboard.children[i].children[j];
            key.addEventListener("click", function () { onKeyPressed(key) });
        }
    }
}
setupListeners();

function onKeyPressed(key) {
    if (!gameInProgress) {
        console.log("Game ended");
        return;
    }

    const keyCode = key.innerHTML;
    console.log("pressed " + keyCode);

    row = board.children[guessNumber];

    if (keyCode === "enter") {
        console.log("processing " + keyCode);
        if (currentGuessWord.length != wordLength) {
            alert("ingresa las letras requeridas");
            return;
        }
        const guessResult = evaluateGuess(word, currentGuessWord, wordLength);
        updateUsedLetters(guessResult);
        displayGuessResult(guessResult);
        currentGuessWord = "";
        currentUsedKeys = [];
        guessNumber += 1;

        if (guessNumber == 6) {
            gameInProgress = false;
            alert("Perdiste... :(");
        }
        else if (checkWin(guessResult)) {
            gameInProgress = false;
            alert("Ganaste!")
        }
    } else if (keyCode === "←") {
        console.log("processing " + keyCode);
        if (currentGuessWord.length < 1) {
            console.log("no more letters");
            return;
        }

        currentGuessWord = currentGuessWord.slice(0, -1);
        currentUsedKeys.pop();
        displayCurrentGuess();
        return;
    } else if (currentGuessWord.length < wordLength) {
        console.log("processing " + keyCode);
        currentGuessWord += keyCode;
        currentUsedKeys.push(key)
        displayCurrentGuess();
    }
}

function updateUsedLetters(guessResult) {
    for (var i = 0; i < wordLength; i++) {
        currentUsedKeys[i].classList.remove("key-state-default");

        switch (guessResult[i]) {
            case GuessState.Contained:
                currentUsedKeys[i].classList.add("key-state-contained");
                break;

            case GuessState.Matched:
                currentUsedKeys[i].classList.add("key-state-matched");
                break;

            case GuessState.NotContained:
                currentUsedKeys[i].classList.add("key-state-not-contained");
            default:
                break;
        }
    }
}

function displayGuessResult(guessResult) {
    for (var i = 0; i < wordLength; i++) {
        switch (guessResult[i]) {
            case GuessState.Contained:
                row.children[i].classList.add("tile-letter-contained");
                break;

            case GuessState.Matched:
                row.children[i].classList.add("tile-letter-matched");
                break;

            case GuessState.NotContained:
                row.children[i].classList.add("tile-letter-not-contained");
            default:
                break;
        }
    }
    displayCurrentGuess();
}

function displayCurrentGuess() {
    console.log("displayCurrentGuess");
    clearCurrentRowLetters();
    for (let i = 0; i < currentGuessWord.length && i < wordLength; i++) {
        row.children[i].innerHTML = currentGuessWord[i];
    }
}

function clearCurrentRowLetters() {
    for (let i = 0; i < wordLength; i++) {
        row.children[i].innerHTML = "";
    }
}
