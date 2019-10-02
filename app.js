/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- If the player rolls two 6 in a row, all his GLOBAL score gets lost
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
var scores, roundScore, activePlayer, gameIsNotFinished;
var diceDom = document.getElementById("dice-1");
var dice1Dom = document.getElementById("dice-2");
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
var scoreInputDom = document.getElementById("final-score");

init();

// function for initializing a new game
function init() {
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0; // for choosing the active player
    gameIsNotFinished = true;

    diceDom.style.display = "none";
    dice1Dom.style.display = "none";
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
    scoreInputDom.style.display = "block";
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
    dice1Dom.style.display = "none";
}

function themeChanger(imageSrc, srcDomId) {
    document.body.style.backgroundImage = "linear-gradient(rgba(62, 20, 20, 0.4), rgba(62, 20, 20, 0.4)), url(" + imageSrc + ")";
    document.getElementById(srcDomId).classList.add("active");
}

document.getElementById("cool-li").addEventListener("click", function(){
    themeChanger("back_cool.png", "cool-li");
    document.getElementById("breeze-li").classList.remove("active");
    document.getElementById("bright-li").classList.remove("active");
    document.getElementById("summer-li").classList.remove("active");
})

document.getElementById("breeze-li").addEventListener("click", function(){
    themeChanger("back_breeze.png", "breeze-li");
    document.getElementById("cool-li").classList.remove("active");
    document.getElementById("bright-li").classList.remove("active");
    document.getElementById("summer-li").classList.remove("active");
})

document.getElementById("bright-li").addEventListener("click", function(){
    themeChanger("back_bright.png", "bright-li");
    document.getElementById("breeze-li").classList.remove("active");
    document.getElementById("cool-li").classList.remove("active");
    document.getElementById("summer-li").classList.remove("active");
})

document.getElementById("summer-li").addEventListener("click", function(){
    themeChanger("back_summer.png", "summer-li");
    document.getElementById("breeze-li").classList.remove("active");
    document.getElementById("bright-li").classList.remove("active");
    document.getElementById("cool-li").classList.remove("active");
})


document.querySelector(".btn-roll").addEventListener("click", function () {
    if (gameIsNotFinished) {
        // random number for dice rolling
        var dice = Math.floor(Math.random() * 6) + 1; // for getting a number between 1 and 6
        var dice1 = Math.floor(Math.random() * 6) + 1;

        // showing the result score and dice
        diceDom.style.display = "block";
        dice1Dom.style.display = "block";
        diceDom.src = "dice-" + dice + ".png";
        dice1Dom.src = "dice-" + dice1 + ".png";

        // updating the round score if the rolled number is not 1
        if (dice !== 1 && dice1 !== 1) {
            roundScore += (dice + dice1);
            document.getElementById("current-" + activePlayer).textContent = roundScore;
        } else {
            togglePlayer();
        }
    }
})

document.querySelector(".btn-hold").addEventListener("click", function () {
    if (gameIsNotFinished) {
        // adding round score to the global score
        scores[activePlayer] += roundScore;
        document.getElementById("score-" + activePlayer).textContent = scores[activePlayer];

        var winingScore;
        var input = scoreInputDom.value;
        if (input) winingScore = input;
        else winingScore = 100;

        // checking if the active player has won
        var playerNameDom = document.getElementById("name-" + activePlayer);
        if (scores[activePlayer] >= winingScore) {
            var winningAudio = new Audio("winning-sound.wav");
            winningAudio.play();

            playerNameDom.textContent = "WINNER! PLAYER " + (activePlayer + 1);
            diceDom.style.display = "none";
            dice1Dom.style.display = "none";
            document.querySelector(".player-" + activePlayer + "-panel").classList.remove("active");
            document.querySelector(".player-" + activePlayer + "-panel").classList.add("winner");
            document.querySelector(".player-" + (1 - activePlayer) + "-panel").classList.add("loser");
            btnRollDom.style.display = "none";
            btnHoldDom.style.display = "none";
            scoreInputDom.style.display = "none";

            gameIsNotFinished = false; // means that the game has finished
        } else {
            // change the active player
            togglePlayer();
        }
    }
})

document.querySelector(".btn-new").addEventListener("click", init);
