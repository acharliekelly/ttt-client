'use strict'
// /game/events.js

const gameUi = require('./ui')
const players = require('./player')
const gameApi = require('./api')
const winning = require('./winning')
const utils = require('../main/utility')

// Public: when user clicks Reset button
const onReset = function () {
  // check if moves made in current game;
  // if not, ignore reset
  if (utils.allowReset()) {
    gameUi.startGame()
  } else {
    utils.userMessage('You already started a game. How about finishing that one before you start a new one?')
  }
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

    // callback depends on current board state,
    // so determine that first. if current player
    // won, the winning squares will be highlighted
    // by checkForWin (which is why it has to get the theme)
    if (winning.checkForWin(p, utils.getTheme())) {
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
    // find out why the move is invalid
    if (!utils.isAuthenticated()) {
      // not logged in
      utils.warningMessage('You must be logged in to play')
    } else if (utils.getCurrentGameId() === 0) {
      // logged in, but need to start a new game
      $('#resetBtn').text('New Game')
      utils.userMessage('Click the "New Game" Button to start a new game')
      // } else if (square.has('img')) { // source of the one MVP-breaking error
    } else if ($('#gameStatus').text() === 'Over') {
      // game is over
      utils.userMessage('The game is over. Click the "New Game" button to play again')
    } else if ($(event.target).has('img')) {
      // square is already taken
      utils.warningMessage('That square is already taken, please pick another square')
    } else {
      // some other reason
      utils.warningMessage('That move is invalid, but I\'m not sure why')
    }
  }
}

// Public: when mouse hovers over empty square
const onHoverSquare = function (event) {
  const square = getEmptySquare(event)
  if (square) {
    const p = players.getCurrentPlayer()
    const theme = utils.getTheme()
    square.css('background-color', p.getColor(theme))
  }
}

// Public: when mouse leaves empty square
const onLeaveSquare = function (event) {
  const square = getEmptySquare(event)
  if (square) {
    square.css('background-color', utils.getTheme().readySquare)
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

const onShowGame = function (event) {
  const gameId = event.target.id.substring(1)
  gameApi.showGame(gameId)
    .then(gameUi.displayGame)
    .catch(gameUi.gameApiFailure)
}

// Mark Square
const markSquare = function (square, player) {
  square.addClass(player.xo)
  const img = utils.getMarkImage(player.xo)
  square.html(img)
  square.css('background-color', 'transparent')
  square.data('enabled', 'false')
}

// return square as jq object only if empty
const getEmptySquare = function (event) {
  // get square as $ object
  const square = $(event.target)
  if ((square.children('img').length > 0) ||
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
  onShowGame
}
