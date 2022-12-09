import GuessState from "./GuessState.js";

function evaluateGuess(word, currentGuessWord, maxWordLength) {
    console.log("evaluating: " + currentGuessWord);

    var alreadyContained = "";
    var alreadyMatched = "";
    var currentGuessResult = Array(maxWordLength).fill(GuessState.NotContained);

    for (let i = 0; i < maxWordLength; i++) {
        if (currentGuessWord[i] === word[i]) {
            alreadyMatched += currentGuessWord[i];
            // row.children[i].classList.add("tile-letter-matched");
            currentGuessResult[i] = GuessState.Matched;
            console.log("matched at " + i);

            var guessPostion = alreadyContained.indexOf(currentGuessWord[i]);
            if (guessPostion !== -1) {
                console.log("replacing contains for match");
                // row.children[guessPostion].classList.remove("tile-letter-contained");
                // row.children[guessPostion].classList.add("tile-letter-not-contained");
                currentGuessResult[i] = GuessState.Contained;
                currentGuessResult[i] = GuessState.NotContained;
            }
        } else if (word.indexOf(currentGuessWord[i]) !== -1 
                && alreadyContained.indexOf(currentGuessWord[i]) === -1
                && alreadyMatched.indexOf(currentGuessWord[i]) === -1) {
            alreadyContained += currentGuessWord[i];
            // row.children[i].classList.add("tile-letter-contained");
            currentGuessResult[i] = GuessState.Contained;
            console.log("contained at " + i);
        } else {
            // row.children[i].classList.add("tile-letter-not-contained");
            currentGuessResult[i] = GuessState.NotContained;
            console.log("no match at " + i);
        }
    }
    // displayCurrentGuess();
    return currentGuessResult;  
}

function checkWin(guessResult) {
    for (var i = 0; i < guessResult.length; i++) {
        if (guessResult[i] !== GuessState.Matched) {
            return false;
        }
    }
    return true;
}

export { evaluateGuess, checkWin };