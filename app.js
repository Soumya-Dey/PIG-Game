/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
var scores, roundScore, activePlayer, gameIsNotFinished;
var diceDom = document.querySelector(".dice");
var score0Dom = document.getElementById("score-0");
var score1Dom = document.getElementById("score-1");
var current0Dom = document.getElementById("current-0");
var current1Dom = document.getElementById("current-1");
var panel0Dom = document.querySelector(".player-0-panel");
var panel1Dom = document.querySelector(".player-1-panel");
var name0Dom = document.getElementById("name-0");
var name1Dom = document.getElementById("name-1");
var btnRollDom = document.querySelector(".btn-roll");
var btnHoldDom = document.querySelector(".btn-hold");

init();

// function for initializing a new game
function init(){
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0; // for choosing the active player
    gameIsNotFinished = true;

    diceDom.style.display = "none";
    score0Dom.textContent = "0";
    score1Dom.textContent = "0";
    current0Dom.textContent = "0";
    current1Dom.textContent = "0";

	name0Dom.textContent = "Player 1";
    name1Dom.textContent = "PLayer 2";
    panel0Dom.classList.remove("loser");
    panel1Dom.classList.remove("loser");
    panel0Dom.classList.remove("winner");
    panel1Dom.classList.remove("winner");
    panel0Dom.classList.remove("active");
    panel1Dom.classList.remove("active");
    panel0Dom.classList.add("active");
    btnRollDom.style.display = "block";
    btnHoldDom.style.display = "block";
}

// function for toggle the active player
function togglePlayer() {
    roundScore = 0;
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    current0Dom.textContent = "0";
    current1Dom.textContent = "0";

    panel0Dom.classList.toggle("active");
    panel1Dom.classList.toggle("active");
    diceDom.style.display = "none";
}

document.querySelector(".btn-roll").addEventListener("click", function () {
    if(gameIsNotFinished){
        // random number for dice rolling
        var dice = Math.floor(Math.random() * 6) + 1; // for getting a number between 1 and 6

        // showing the result score and dice
        diceDom.style.display = "block";
        diceDom.src = "dice-" + dice + ".png";

        // updating the round score if the rolled number is not 1
        if (dice !== 1) {
            roundScore += dice;
            document.getElementById("current-" + activePlayer).textContent = roundScore;
        } else {
            togglePlayer();
        }
    }
})

document.querySelector(".btn-hold").addEventListener("click", function () {
    if(gameIsNotFinished){
        // adding round score to the global score
        scores[activePlayer] += roundScore;
        document.getElementById("score-" + activePlayer).textContent = scores[activePlayer];

        // checking if the active player has won
        var playerNameDom = document.getElementById("name-" + activePlayer);
        if (scores[activePlayer] >= 100) {
            playerNameDom.textContent = "WINNER! PLAYER " + (activePlayer + 1);
            diceDom.style.display = "none";
            document.querySelector(".player-" + activePlayer + "-panel").classList.remove("active");
            document.querySelector(".player-" + activePlayer + "-panel").classList.add("winner");
            document.querySelector(".player-" + (1 - activePlayer) + "-panel").classList.add("loser");
            btnRollDom.style.display = "none";
            btnHoldDom.style.display = "none";

            var winningAudio = new Audio("winning-sound.wav");
            winningAudio.play();

            gameIsNotFinished = false; // means that the game has finished
        } else {
            // change the active player
            togglePlayer();
        }
    }
})

document.querySelector(".btn-new").addEventListener("click", init);
