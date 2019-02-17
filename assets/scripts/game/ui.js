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
const store = require('../store')

// Public: intitialize board
const startGame = function () {
  // debugger
  clearBoard()

  if (utils.isAuthenticated()) {
    gameApi.createGame()
      .then(createGameSuccess)
      .catch(gameApiFailure)
  }
  initTurn(players.getCurrentPlayer())
  utils.userMessage('New Game')
  $('#resetBtn').text('Reset')
}

const createGameSuccess = function (responseData) {
  store.currentGame = responseData.game
  const msg = `Game #${responseData.game.id} created`
  utils.userMessage(msg)
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
  $('#GameBoard .square').removeClass('x o').data('enabled', 'true')
}

const gameOver = function () {
  console.log('Game Over')
  // remove turn-classes, handlers
  $('#GameBoard').removeClass('x-turn o-turn')
  $('#GameBoard .square').data('enabled', 'false')
}

// return from API
const finishTurn = function (responseData) {
  store.currentGame = responseData.game
  initTurn(players.nextPlayerTurn())
}

const initTurn = function (player) {
  const turn = player.turnClass
  $('#GameBoard').removeClass('x-turn o-turn').addClass(turn)
  $('#playerTurn')
    .removeClass('x-turn o-turn')
    .addClass(turn)
    .text('Player ' + player.name)
}

const displayStatistics = function (responseData) {
  const gamesPlayed = responseData.games.length
  $('#playerStats .all-games').text(gamesPlayed)
  // TODO: figure out the rest of the stats
}

const showFinishedGames = function (responseData) {
  $('#gameHistory .card-header').text('Completed Games')
  responseData.games.forEach(game => {
    const item = `<li class="list-group-item">Game #${game.id} <a class="game" href="#${game.id}>view</a></li>"`
    $('#gameHistory').append(item)
  })
  $('#gameHistory a').on('click', (event) => {
    event.preventDefault()
    // TODO: show game
    console.log('Show Game #' + event.target.href)
  })
  $('#gameHistory .card').show()
}

const showUnfinishedGames = function (responseData) {
  $('#gameHistory .card-header').text('In-Progress Games')
  responseData.games.forEach(game => {
    const item = `<li class="list-group-item">Game #${game.id} <a class="game" href="#load-${game.id}>view</a></li>"`
    $('#gameHistory').append(item)
  })
  $('#gameHistory a').on('click', (event) => {
    event.preventDefault()
    // TODO: show game
    console.log('Show Game #' + event.target.href)
  })
  $('#gameHistory .card').show()
}

const displayGame = function (responseData) {
  console.log('Display Game')
  clearBoard()
  const isOver = responseData.game.over
  const cells = responseData.game.cells
  $('#GameBoard .square').each(() => {
    const index = $(this).data('index')
    if (cells[index].length > 0) {
      $(this).addClass(cells[index])
        .css('background-color', 'transparent')
        .data('enabled', 'false')
    } else {
      $(this).data('enabled', isOver)
    }
  })
  if (!isOver) {
    // TODO: figure out whose turn it is
  }
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
  displayStatistics,
  showFinishedGames,
  showUnfinishedGames,
  displayGame
}
