'use strict'
// /game/events.js

const gameUi = require('./ui')
const players = require('./player')
const gameApi = require('./api')
const winning = require('./winning')
const utils = require('../main/utility')

const SQUARE_BACKGROUND_COLOR = '#ffffff'

// Public: when user clicks Reset button
const onReset = function () {
  // TODO: check if moves made in current game;
  // if not, ignore reset
  gameUi.startGame()
}

// Public: when user clicks square
const onClickSquare = function (event) {
  const square = getEmptySquare(event)
  if (square) {
    // square is empty, proceed with move
    const p = players.getCurrentPlayer()

    // update html board
    markSquare(square, p)

    // update API board
    const index = square.data('index')
    let successFn = gameUi.finishTurn
    let isOver = false

    if (winning.checkForWin(p)) {
      successFn = gameUi.showWinner
      isOver = true
    } else if (winning.checkForDraw()) {
      successFn = gameUi.showStalemate
      isOver = true
    }
    const gameId = utils.getCurrentGameId()
    gameApi.updateGame(gameId, p.xo, index, isOver)
      .then(successFn)
      .catch(gameUi.gameApiFailure)
  } else {
    utils.userMessage('That square is already taken', 'warning')
  }
}

// Public: when mouse hovers over empty square
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
    square.css('background-color', SQUARE_BACKGROUND_COLOR)
  }
}

const onPlayerStats = function () {
  if (utils.isAuthenticated()) {
    gameApi.myGames()
      .then(gameUi.displayStatistics)
      .catch(gameUi.gameApiFailure)
  }
}

const onGetFinishedGames = function () {
  if (utils.isAuthenticated()) {
    gameApi.myFinishedGames()
      .then(gameUi.showFinishedGames)
      .catch(gameUi.gameApiFailure)
  }
}

const onGetUnfinishedGames = function () {
  if (utils.isAuthenticated()) {
    gameApi.myUnfinishedGames()
      .then(gameUi.showUnfinishedGames)
      .catch(gameUi.gameApiFailure)
  }
}

const onShowGame = function (gameId) {
  gameApi.showGame(gameId)
    .then(gameUi.displayGame)
    .catch(gameUi.gameApiFailure)
}

const markSquare = function (square, player) {
  square.addClass(player.squareClass)
  square.css('background-color', 'transparent')
  square.data('enabled', 'false')
}

// return square as jq object only if empty
const getEmptySquare = function (event) {
  // get square as $ object
  const square = $(event.target)
  if (square.hasClass('x') ||
      square.hasClass('o') ||
      square.data('enabled') !== 'true') {
    return false
  } else {
    return square
  }
}

module.exports = {
  onReset,
  onClickSquare,
  onHoverSquare,
  onLeaveSquare,
  onPlayerStats,
  onGetFinishedGames,
  onGetUnfinishedGames,
  onShowGame,
  SQUARE_BACKGROUND_COLOR
}
