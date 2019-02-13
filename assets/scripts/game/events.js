'use strict'

const gameUi = require('./ui')
const players = require('./player')
const getFormFields = require('../../../lib/get-form-fields')

const onOptionSubmit = function (event) {
  event.preventDefault()
  const formData = getFormFields(event.target)
  console.log('submitting options form', formData)
  gameUi.drawBoard()
  gameUi.showGameBoard()
  gameUi.initGame()
  onInitBoard()
}

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
  $('#GameBoard .square').on('click', onClickSquare)
}

const onClickSquare = function (event) {
  const sqId = event.target.id
  console.log('Square clicked:', sqId)
  // get clicked square as $ object
  const square = $(`#${sqId}`)
  // make sure square is currently not marked X or O
  if (!(square.hasClass('x') || square.hasClass('o'))) {
    // if not, mark it with class of current player
    const p = players.getCurrentPlayer()
    square.addClass(p.squareClass)
    square.off('click')
    gameUi.nextTurn()
  }
}

module.exports = {
  onOptionSubmit,
  onOptions,
  onReset,
  onClickSquare,
  onShowGameBoard
}
