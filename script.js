"use strict";
//selecting scores of both players

const score0El = document.querySelector("#score--0");
const score1El = document.querySelector("#score--1");
const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
const current0El = document.querySelector("#current--0");
const current1El = document.querySelector("#current--1");
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");

//console.log(current0El);
//applying hidden class to dice

diceEl.classList.add("hidden"); //not .hidden as we already know we are adding class no need to specify that hidden is a claas by ading .

score0El.textContent = 0;
score1El.textContent = 0;
let score = [0, 0];
let currentScore;
let activePlayer = 0;
let playing;

const init = function () {
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove("player--winner");

  diceEl.classList.add("hidden");

  current0El.textContent = 0;
  current1El.textContent = 0;

  score[0] = 0;
  score[1] = 0;
  score0El.textContent = 0;
  score1El.textContent = 0;
  currentScore = 0;
  playing = true;
  activePlayer = 0;
  player0El.classList.add("active");
  player1El.classList.remove("active");
};
init();

//switch player function
const switchPlayer = function () {
  document.querySelector(`#current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
};

//rolling die
btnRoll.addEventListener("click", function () {
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1;
    // console.log(dice);
    diceEl.classList.remove("hidden");
    diceEl.src = `dice-${dice}.png`;

    if (dice != +1) {
      currentScore += dice;
      document.querySelector(`#current--${activePlayer}`).textContent =
        currentScore;
      //current0El.textContent = currentScore;
      // console.log(currentscore);
    } else {
      switchPlayer();
    }
  }
});

//btn hold
btnHold.addEventListener("click", function () {
  if (playing) {
    //adding curent score to toatal score of active player
    score[activePlayer] += currentScore;
    document.querySelector(`#score--${activePlayer}`).textContent =
      score[activePlayer];

    //
    if (score[activePlayer] >= 10) {
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");

      diceEl.classList.add("hidden");
    } else {
      switchPlayer();
    }
  }
});

btnNew.addEventListener("click", init);
