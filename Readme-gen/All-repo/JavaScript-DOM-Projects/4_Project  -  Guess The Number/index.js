let ChosenNumber = parseInt(Math.floor((Math.random() * 100) + 1)); 
let GuessMade = [];
let NumGuess = 1;
let GuessAllowed = 10;
let PlayGame = true;


const SubmitButtonPressed = document.querySelector('.guessSubmit');
const StartOver = document.querySelector('.resultParas');
const SubmitUserInput = document.querySelector('.guessField');
const Remaining = document.querySelector('.remain');
const PrevGuess = document.querySelector('.guesses');
const LowOrHi = document.querySelector('.lowOrHi'); 
const p = document.createElement('p');


if(PlayGame){
    SubmitButtonPressed.addEventListener('click', function(event) {
        event.preventDefault();
        const Guess = parseInt(SubmitUserInput.value);
        ValidateGuess(Guess);
    });
}

function ValidateGuess(guess){
    if(isNaN(guess)){
        alert("The input is not a number");
    }else if(guess < 1 || guess > 100){
        alert("The Number is beyond the range");
    }else{
        GuessMade.push(guess);
        if(NumGuess === GuessAllowed + 1){
            displayGuess(guess);
            displayMessage(`Game Over !! The number chosen was ${ChosenNumber}`);
            endGame();
        }else{
            displayGuess(guess);
            checkGuess(guess);
        }
    }
}

function checkGuess(guess){
    if(guess === ChosenNumber){
        displayMessage(`Correct Guess you passed !`);
        endGame();
    }else if(guess > ChosenNumber){
        displayMessage(`Number Too Big , Choose a smaller number !`);
    }else{
        displayMessage(`Number Too Small , Choose a larger number !`);
    }
}

function displayGuess(guess){
    SubmitUserInput.value = '';
    PrevGuess.innerHTML += `${guess} `;
    NumGuess += 1;
    Remaining.innerHTML = `${GuessAllowed - NumGuess + 1}`;
}

function displayMessage(message){
    LowOrHi.innerHTML = `<h2>${message}</h2>`;
}

function endGame(){
    SubmitUserInput.value = '';
    SubmitUserInput.setAttribute('disabled','');
    p.classList.add('button');
    p.innerHTML = `<h2 class="newGame">Start new Game</h2>`;
    StartOver.appendChild(p);
    PlayGame = false;
    newGame();
}   

function newGame() {
    const newGameButton = document.querySelector('.newGame');
    newGameButton.addEventListener('click', function () {
        ChosenNumber = parseInt(Math.floor((Math.random() * 100) + 1)); 
        GuessMade = [];
        NumGuess = 1;
        PrevGuess.innerHTML = ''; 
        Remaining.innerHTML = `${GuessAllowed}`;
        SubmitUserInput.removeAttribute('disabled');
        StartOver.removeChild(p); 
        PlayGame = true;
    });
}
