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
const logic = require('./logic')

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
  $('#GameBoard .square').empty()
    .removeClass('x o')
    .data('enabled', 'true')
  $('#playerTurn').css('color', '#000').text('')
}

const gameOver = function () {
  console.log('Game Over')
  // remove turn-classes, handlers
  $('#GameBoard .square').data('enabled', 'false')
}

// return from API
const finishTurn = function (responseData) {
  store.currentGame = responseData.game
  initTurn(players.nextPlayerTurn())
}

const initTurn = function (player) {
  const th = utils.getTheme()
  $('#playerTurn').text('Player ' + player.name)
    .css('color', player.getColor(th))
}

const displayStatistics = function (responseData) {
  // Calculate player stats
  const games = responseData.games
  const numTotal = games.length
  $('#playerStats .all-games').text(numTotal)

  const finishedGames = games.filter(game => game.over === true)
  const finishedCnt = finishedGames.length
  $('#playerStats .complete-games').text(finishedCnt)

  const unstarted = logic.gamesUnstarted(games)
  const unstartedCnt = unstarted.length
  $('#playerStats .unstarted-games').text(unstartedCnt)

  const wonByX = logic.gamesWonByX(finishedGames)
  const wonCnt = wonByX.length
  $('#playerStats .games-won').text(wonCnt)

  let winPct = 0
  if (finishedCnt > 0 && wonCnt > 0) {
    winPct = wonCnt / finishedCnt
  }
  $('#playerStats .win-pct').text(winPct)
}

const showFinishedGames = function (responseData) {
  showGameHistory(responseData, true)
}

const showUnfinishedGames = function (responseData) {
  showGameHistory(responseData, false)
}

const showGameHistory = function (responseData, isFinished) {
  const title = isFinished ? 'Completed Games' : 'Games In-Progress'
  $('#gameHistory .card-header').text(title)
  $('#pastGames').html('')
  responseData.games.forEach(game => {
    const btnColor = isFinished ? 'light' : 'dark'
    const item = `<li class="list-group-item"><button id="g${game.id}" class="btn btn-${btnColor}">Game #${game.id}</button></li>`
    $('#pastGames').append(item)
  })
  $('#pastGames button').on('click', onShowGame)

  $('#gameHistory .card').show()
}

// Kind of unnecessary, come to think of it
const onShowGame = function (event) {
  const gameId = event.target.id.substring(1)
  console.log('Show Game #' + gameId)
  gameApi.showGame(gameId)
    .then(displayGame)
    .catch(gameApiFailure)
}

const displayGame = function (responseData) {
  console.log('Display Game:', responseData.game)
  clearBoard()
  const isOver = responseData.game.over
  const cells = responseData.game.cells
  if (logic.isEmpty(cells)) {
    console.log('Board is empty')
    $('#GameBoard .square').data('enabled', isOver ? 'true' : 'false')
  } else {
    console.log('Cell Array:', cells)
    $('#GameBoard .square').each((index) => {
      // const index = $(this).data('index')
      const mark = cells[index]
      console.log('Cell ' + index + ': ' + mark)
      if (mark !== '') {
        console.log('marking cell: ' + mark)
        // same as events.markSquare
        const img = utils.getMarkImage(mark)
        $(this).addClass(mark)
          .css('background-color', 'transparent')
          .data('enabled', 'false')
          .html(img)
      } else {
        $(this).data('enabled', isOver ? 'true' : 'false')
      }
    })
  }
  if (!isOver) { // play
    const xo = logic.playerTurn(cells)
    if (xo === null) {
      // board is full, yet somehow inexplicably the game is not over
      utils.userMessage('Board is Full!')
    } else {
      const player = players.getPlayer(xo)
      initTurn(player)
    }
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
