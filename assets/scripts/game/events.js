'use strict'
// /game/events.js

const gameUi = require('./ui')
const players = require('./player')
const gameApi = require('./api')
const winning = require('./winning')

// Public: when user clicks Reset button
const onReset = function () {
  console.log('Re-drawing board')
  gameUi.startGame()
}

// Public: when user clicks square
const onClickSquare = function (event) {
  console.log('Square clicked: ' + event.target.id)
  const square = getEmptySquare(event)
  if (square) {
    // square is empty, proceed with move
    console.log('square is empty')
    const p = players.getCurrentPlayer()

    // update html board
    markSquare(square, p)

    // update API board
    const index = square.data('index')
    let success = gameUi.finishTurn
    let isOver = false

    if (winning.checkForWin(p)) {
      success = gameUi.showWinner
      isOver = true
    } else if (winning.checkForDraw()) {
      success = gameUi.showStalemate
      isOver = true
    }
    gameApi.updateGame(p.squareClass, index, isOver)
      .then(success)
      .catch(gameUi.gameApiFailure)
  } else {
    console.log('square is already used')
  }
}

// Public: when mouse hovers empty square
const onHoverSquare = function (event) {
  const square = getEmptySquare(event)
  if (square) {
    const p = players.getCurrentPlayer()
    square.css('background-color', p.color)
  }
}

// Public: when mouse leaves empty square
const onLeaveSquare = function (event) {
  const square = getEmptySquare(event)
  if (square) {
    square.css('background-color', 'transparent')
  }
}

const markSquare = function (square, player) {
  square.addClass(player.squareClass)
  square.css('background-color', 'transparent')
  square.off()
}

// return square as jq object only if empty
const getEmptySquare = function (event) {
  // get square as $ object
  const square = $(event.target)
  if (square.hasClass('x') || square.hasClass('o')) {
    return false
  } else {
    return square
  }
}

module.exports = {
  onReset,
  onClickSquare,
  onHoverSquare,
  onLeaveSquare
}
