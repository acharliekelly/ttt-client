'use strict'
// game/ui.js

// GAME PLAY LOGIC
//
// initGame:
//  - clear 'x' and 'o' classes from board squares - clearBoard()
//  - bind squares to events - initBoardBindings()
//
// after board is drawn, assign to each .square:
//  - mouseover: onHover (shows player color if square is available)
//  - click: onClickSquare
//      - set player class (x | o) to square
//      - remove handlers from .square
//      - finishTurn
//        - check if winner or stalemate -> game over
//        - send move to API
//      - init next turn
//
// beginning each turn:
//  - add turnClass (x-turn | o-turn) to #GameBoard
//  - add turnClass to #player-info
//  - set player name to #player-name

const players = require('./player')
const utils = require('../main/utility')
const gameApi = require('./api')
const gameEvents = require('./events')
const store = require('../store')

let _currentMove

const resetMoves = function () {
  _currentMove = 0
}

const nextMove = function () {
  if (players.getCurrentPlayer().name === 'X') {
    _currentMove++
  }
  return _currentMove
}

// Public: current move counter
const getCurrentMove = function () {
  return _currentMove
}

// Public: intitialize board
const startGame = function () {
  // board already drawn
  // just need to bind square handlers
  clearBoard()
  initBoardBindings()
  gameApi.createGame()
    .then(createGameSuccess)
    .catch(gameApiFailure)
  initTurn(players.getCurrentPlayer())
  resetMoves()
  $('#resetBtn').text('Reset')
}

const createGameSuccess = function (responseData) {
  store.currentGame = responseData.game
  const msg = `Game #${responseData.game.id} created`
  console.log(msg)
  utils.userMessage(msg)
}

const initBoardBindings = function () {
  $('#GameBoard .square')
    .on('click', gameEvents.onClickSquare)
    .on('mouseover', gameEvents.onHoverSquare)
    .on('mouseout', gameEvents.onLeaveSquare)
    .css('background-color', '#888')
}

/**
 * showWinner - display the winner, halt the game
 *
 * @param  {Player} player the winning player
 * @return {undefined}
 */
const showWinner = function (responseData) {
  const player = players.getCurrentPlayer()
  console.log('displaying winner: Player ' + player.name)
  // TODO: set div class to player.winClass

  utils.userMessage(`Player ${player.name} Wins!`)

  gameOver()
}

const gameApiFailure = function () {
  utils.errorMessage('Unable to communicate with Game Server')
}

/**
 * showStalemate
 *
 * @return {undefined}
 */
const showStalemate = function () {
  console.log('no winner')
  // TODO: display status
  utils.userMessage('No winner')
  gameOver()
}

const clearBoard = function () {
  $('#GameBoard .square').removeClass('x o')
}

const gameOver = function () {
  // remove turn-classes, handlers
  $('#GameBoard').removeClass('x-turn o-turn')
  $('#GameBoard .square').off()
}

// return from API
const finishTurn = function (responseData) {
  store.currentGame = responseData.game
  initTurn(players.nextPlayerTurn())
  nextMove()
}

const initTurn = function (player) {
  const turn = player.turnClass
  $('#GameBoard').removeClass('x-turn o-turn').addClass(turn)
  $('#playerTurn')
    .removeClass('x-turn o-turn')
    .addClass(turn)
    .text('Player ' + player.name)
}

module.exports = {
  startGame,
  createGameSuccess,
  gameApiFailure,
  showWinner,
  showStalemate,
  clearBoard,
  finishTurn,
  gameOver,
  getCurrentMove,
  nextMove
}
