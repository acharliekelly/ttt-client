'use strict'
// assets/scripts/tic/events.js

const gameUi = require('./ui')
const players = require('./player')
const getFormFields = require('../../../lib/get-form-fields')

const onShowGameBoard = function () {
  $('.panel').hide()
  $('#game-board-panel').show()
  gameUi.drawBoard()
  gameUi.showGameBoard()
  gameUi.initGame()
  onInitBoard()
}

const onOptions = function (event) {
  console.log('Returning to Options form')
  gameUi.showOptions()
}

const onReset = function (boardSize) {
  console.log('Re-drawing board: ' + boardSize)
  gameUi.drawBoard(boardSize)
  gameUi.initGame()
  onInitBoard()
}

const onInitBoard = function () {
  // has to run after board is drawn
  $('#GameBoard .square')
    .on('click', onClickSquare)
    .on('mouseover', onHoverSquare)
    .on('mouseout', onLeaveSquare)
}

const onClickSquare = function (event) {
  console.log('Square clicked: ' + event.target.id)
  const square = getEmptySquare(event)
  if (square) {
    console.log('square is empty')
    const p = players.getCurrentPlayer()
    setSquare(square, p)
    gameUi.nextTurn()
  } else {
    console.log('square is already used')
  }
}

const onHoverSquare = function (event) {
  const square = getEmptySquare(event)
  if (square) {
    const p = players.getCurrentPlayer()
    square.css('background-color', p.color)
  }
}

const onLeaveSquare = function (event) {
  const square = getEmptySquare(event)
  if (square) {
    square.css('background-color', 'transparent')
  }
}

const setSquare = function (square, player) {
  square.addClass(player.squareClass)
  square.css('background-color', 'transparent')
  square.off()
}

// return square as jq object only if empty
const getEmptySquare = function (event) {
  const sqId = event.target.id
  // get square as $ object
  const square = $(`#${sqId}`)
  if (square.hasClass('x') || square.hasClass('o')) {
    return false
  } else {
    return square
  }
}

module.exports = {
  onOptions,
  onReset,
  onClickSquare,
  onHoverSquare,
  onLeaveSquare,
  onShowGameBoard
}
