'use strict'

const players = require('./player')

const drawBoard = function (size) {
  console.log('drawing board: ' + size + ' x ' + size + ' squares')

  $('#GameBoard').html('')

  for (let col = 0; col < size; col++) {
    let colStr = '<div class="column">'
    for (let row = 0; row < size; row++) {
      colStr += `<span id="cell-${col}-${row}" class="square">`
      colStr += '<img src="public/images/x.png" alt="X" class="x">'
      colStr += '<img src="public/images/o.png" alt="O" class="o">'
      colStr += '</span>'
    }
    colStr += '</div>'
    $('#GameBoard').append(colStr)
  }
  $('#GameBoard').attr('data-size', size)
}

const showWinner = function (player) {
  console.log('displaying winner: Player ' + player.name)
  // TODO: set div class to player.winClass
  userMessage(`Player ${player} Wins!`)
}

const showOptions = function () {
  $('main').removeClass().addClass('game-options')
}

const showGameBoard = function () {
  $('main').removeClass().addClass('game-board')
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
  initTurn(players.nextPlayerTurn())
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
  initGame
}
