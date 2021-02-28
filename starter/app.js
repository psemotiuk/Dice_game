/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLOBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

let scores, roundScore, activePlayer, gamePlaying, previousDice;

init();


document.querySelector('.btn-roll').addEventListener('click', function () {
    if (gamePlaying) {

        // 1. Random number
        let dice1 = Math.floor(Math.random() * 6) + 1;
        let dice2 = Math.floor(Math.random() * 6) + 1;


        // 2. Display result
        document.getElementById('dice-1').style.display = 'block';
        document.getElementById('dice-2').style.display = 'block';

        document.getElementById('dice-1').src = 'dice-' + dice1 + '.png';
        document.getElementById('dice-2').src = 'dice-' + dice2 + '.png';

        // 3. Update the round score IF the rolled number was NOT 1
        if (previousDice === 6 && dice1 === 6 ) {
            scores[activePlayer] = 0;
            dice1 = 0;
            document.getElementById('score-' + activePlayer).textContent = scores[activePlayer].toString();
            nextPlayer();
        }
        else if (dice1 !== 1 && dice2 !== 1) {
            // Add score
            roundScore += dice1 + dice2;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        }
        else {
            // Next player
            nextPlayer();
        }

        // 4. Check previous dice

        previousDice = dice;

    }
})
// document.querySelector('.btn-winScore').addEventListener('click', function () {
//     debugger
//     winningScore = document.getElementById('defScore').value;
// })

document.querySelector('.btn-hold').addEventListener('click', function () {
    if (gamePlaying) {
        // Add CURRENT score to GLOBAL score
        scores[activePlayer] += roundScore;

        // Update the UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        let input = document.getElementById('defScore').value;
        let winningScore;

        //Undefined, 0, null, ""  are COERCED to false
        //Anything else is COERCED to false

        if (input) {
            winningScore = input;
        }
        else {
            winningScore = 100;
        }

        // Check if player won the game
        if (scores[activePlayer] >= winningScore) {
            document.querySelector('#name-' + activePlayer).textContent = 'Winner';
            document.getElementById('dice-1').style.display = 'none';
            document.getElementById('dice-2').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            gamePlaying = false;
        }
        else {

            // Next player
            nextPlayer();
        }
    }

});

function nextPlayer() {
    // Next player
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');


    //document.querySelector('.player-0-panel').classList.remove('active');
    //document.querySelector('.player-1-panel').classList.add('active');

    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';
    previousDice = 0;
}

function init() {
    roundScore = 0;
    scores = [0, 0];
    activePlayer = 0;
    gamePlaying = true;
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none'
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}

document.querySelector('.btn-new').addEventListener('click', init);



//document.querySelector('#current-' + activePlayer).textContent = dice;
//document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>'

//let x = document.querySelector('#score-0').textContent;
