'use strict'

// GAME PLAY LOGIC
//
// initGame:
//  - draw board inside #GameBoard:
//  - div.column x3, each containing spans:
//    - span #cell-[c]-[r] .square
//      - img .x
//      - img .o
//
// after board is drawn, assign to each .square:
//  - mouseover: onHover (shows player color if square is available)
//  - click: onClickSquare
//      - set player class (x | o) to square
//      - remove handlers from .square
//      - init next turn
//        - check if winner or stalemate -> game over
//
// beginning each turn:
//  - add turnClass (x-turn | o-turn) to #GameBoard
//  - add turnClass to #player-info
//  - set player name to #player-name

const players = require('./player')
const winning = require('./winning')

const BOARD_SIZE = 3 // originally planned to make this arbitrary

/**
 * drawBoard - draw the board
 *
 */
const drawBoard = function () {
  $('#GameBoard').html('')

  for (let col = 0; col < BOARD_SIZE; col++) {
    let colStr = '<div class="column">'
    for (let row = 0; row < BOARD_SIZE; row++) {
      colStr += `<span id="cell-${col}-${row}" class="square">`
      colStr += '<img src="public/images/x.png" alt="X" class="x">'
      colStr += '<img src="public/images/o.png" alt="O" class="o">'
      colStr += '</span>'
    }
    colStr += '</div>'
    $('#GameBoard').append(colStr)
  }
}

/**
 * showWinner - display the winner, halt the game
 *
 * @param  {Player} player the winning player
 * @return {undefined}
 */
const showWinner = function (player) {
  console.log('displaying winner: Player ' + player.name)
  // TODO: set div class to player.winClass

  userMessage(`Player ${player} Wins!`)

  // TODO: submit win stats to API
  gameOver()
}


/**
 * showStalemate
 *
 * @return {undefined}
 */
const showStalemate = function () {
  console.log('no winner')
  // TODO: display status
  userMessage('No winner')
  gameOver()
}

const gameOver = function () {
  // remove handlers
  $('#GameBoard').removeClass()
  $('#GameBoard .square').off()
}

const showOptions = function () {
  $('.panel').hide()
  $('#game-options-panel').show()
}

const showGameBoard = function () {
  $('.panel').hide()
  $('#game-board-panel').show()
}

const userMessage = function (message) {
  $('#user-feedback').html(message).addClass('message')

  setTimeout(() => {
    $('#user-feedback').html('').removeClass('message')
  }, 5000)
}

const failure = function () {
  $('#user-feedback')
    .html('Something went wrong, please try again.')
    .addClass('error')

  setTimeout(() => {
    $('#user-feedback').html('').removeClass('error')
  }, 5000)
}

const errorMessage = function (message) {
  $('#user-feedback')
    .html('Error: ' + message)
    .addClass('error')

  setTimeout(() => {
    $('#user-feedback').html('').removeClass('error')
  }, 5000)
}

const nextTurn = function () {
  const p = players.getCurrentPlayer()
  if (winning.checkForWin(p)) {
    showWinner(p)
  } else if (winning.checkForDraw()) {
    showStalemate()
  } else { // proceed with next turn
    initTurn(players.nextPlayerTurn())
  }
}

const initTurn = function (player) {
  const turn = player.turnClass
  $('#GameBoard').removeClass().addClass(turn)
  $('#player-info').removeClass().addClass(turn)
  $('#player-name').html(player.name)
}

const initGame = function () {
  initTurn(players.getCurrentPlayer())
}

module.exports = {
  drawBoard,
  showWinner,
  showOptions,
  showGameBoard,
  userMessage,
  errorMessage,
  failure,
  nextTurn,
  initGame,
  gameOver
}
