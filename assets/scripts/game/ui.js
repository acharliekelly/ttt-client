'use strict'
// game/ui.js

// GAME PLAY LOGIC
//
// When reset button is clicked, assign events to all squares
// and start game (app.initBoardBindings)
//  - for all events, first check if square is empty
//  - on hover (mouseover): if empty, set square background to player color
//  - on leave (mouseout): remove background color
//  - on click:
//   - if empty:
//      - assign mark, disable square
//      - check for win, update API
//       - if win, notify user, set game over
//       - if no win, move to next turn
//   - if not empty: show invalid move message, continue current turn
//
// beginning of game
//  - statusPanel: set .game-status #currentGame to game ID#, #gameStatus to 'In Progress'
//
// end of game
//  - deactivate squares, change #gameStatus to 'Over'
//
// beginning each turn:
//  - change color of .turn-status player color
//  - change color of .square background-color on hover
//  - set player name (#currentTurn)
//
// end of turn:
//  - check for win
//  - update API with: move (player mark and index), game status (over)
//
// load old game:
//  - set game ID # in .game-status #currentGame
//  - if over:
//   - set .game-status #gameStatus to 'Over'
//   - indicate winner (TODO)
//  - if not over:
//   - set .game-status #gameStatus to 'In Progress'
//   - call nextTurn()

const players = require('./player')
const utils = require('../main/utility')
const gameApi = require('./api')
const store = require('../store')
const logic = require('./logic')

const DEFAULT_TEXT_COLOR = '#000'
const DEFAULT_TEXT_BG = 'transparent'
const USED_CELL_BG = 'transparent'
const ACTIVE_TEXT_COLOR = '#fff'

/* RESPONSE DATA HANDLERS -
.then() callbacks from game/events -> game/api */

const createGameSuccess = function (responseData) {
  store.currentGame = responseData.game
  const msg = `Game #${responseData.game.id} created`
  utils.userMessage(msg)

  initTurn(players.getCurrentPlayer())
  $('#currentGame').text(responseData.game.id)
  $('#gameStatus').text('In Progress')
  $('#resetBtn').text('Reset')
  // set to ready-color for new game
  $('#GameBoard .square').css('background-color',
    utils.getTheme().readySquare)
}

/**
 * showWinner - display the winner, halt the game
 *  - already saved win via API update
 * @param  {Player} player the winning player
 * @return {undefined}
 */
const showWinner = function (responseData) {
  const player = players.getCurrentPlayer()
  // TODO: indicate winner status

  utils.userMessage(`Player ${player.name} Wins!`)

  gameOver()
}

// Display any fail notice from Game API
const gameApiFailure = function (responseData) {
  utils.errorMessage('Unable to communicate with Game Server')
}

// return from API
const finishTurn = function (responseData) {
  store.currentGame = responseData.game
  initTurn(players.nextPlayerTurn())
}

// Show user stats
const displayStatistics = function (responseData) {
  // Calculate player stats
  $('#playerStats').addClass('display-info')
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

  const lostByX = logic.gamesWonByO(finishedGames)
  const lostCnt = lostByX.length
  $('#playerStats .games-lost').text(lostCnt)

  const tied = logic.gamesTied(finishedGames)
  const tiedCnt = tied.length
  $('#playerStats .games-tied').text(tiedCnt)

  let wins
  if (finishedCnt > 0) {
    const winPct = Math.trunc((wonCnt / finishedCnt) * 100)
    wins = winPct + '%'
  } else {
    wins = 'N/A'
  }
  $('#playerStats .win-pct').text(wins)
}

// Display finished games
const showFinishedGames = function (responseData) {
  showGameHistory(responseData, true)
}

// Display unfinished games
const showUnfinishedGames = function (responseData) {
  showGameHistory(responseData, false)
}

// show single game from history
const displayGame = function (responseData) {
  clearBoard()
  $('#currentGame').text('#' + responseData.game.id)
  // if isOver -> displayFinishedGame
  // else -> displayGameInProgress
  if (responseData.game.over) {
    displayFinishedGame(responseData.game)
  } else {
    displayGameInProgress(responseData.game)
  }
}

/* PUBLIC NON-API FUNCTIONS -
  exported and called from other files,
  but not as API callbacks */

// Public: intitialize board
const startGame = function () {
  clearBoard()

  if (utils.isAuthenticated()) {
    gameApi.createGame()
      .then(createGameSuccess)
      .catch(gameApiFailure)
  }
  // only continue if API call is successful
}

/**
 * showStalemate
 *
 * @return {undefined}
 */
const showStalemate = function () {
  utils.userMessage('No winner')
  $('#gameStatus').text('Draw')
  // TODO: display somewhere else
  $('.turn-status').css('background-color', DEFAULT_TEXT_BG)
  $('#currentTurn').text('--').css('color', DEFAULT_TEXT_COLOR)
  gameOver()
}

// Clear the board for new game
const clearBoard = function (enable = true) {
  const squareBgColor = enable ? utils.getTheme().readySquare : utils.getTheme().disableSquare
  $('#GameBoard .square').empty()
    .removeClass('x o')
    .data('enabled', enable ? 'true' : 'false')
    .css('background-color', squareBgColor)
  $('.turn-status').css('background-color', DEFAULT_TEXT_BG)
  $('#currentTurn').text('--').css('color', DEFAULT_TEXT_COLOR)
}

const gameOver = function () {
  // disable squares
  $('#GameBoard .square').data('enabled', 'false')
  $('#gameStatus').text('Over')
}

const initTurn = function (player) {
  const th = utils.getTheme()
  $('#statusPanel .turn-status').css('background-color', player.getColor(th))
  $('#currentTurn').text(player.name)
    .css('color', ACTIVE_TEXT_COLOR)
}

/* PRIVATE FUNCTIONS -
not exported, only referenced from within game/ui.js */

// takes API response from showFinishedGames & showUnfinishedGames,
// displays game history
const showGameHistory = function (responseData, isFinished) {
  const title = isFinished ? 'Completed Games' : 'Games In-Progress'
  $('#gameHistory .card-header').text(title)
  $('#pastGames').html('')
  responseData.games.forEach(game => {
    // TODO: for finished games, change button color to show who won
    const btnColor = isFinished ? 'light' : 'dark'
    const item = `<li class="list-group-item"><button id="g${game.id}" class="btn btn-${btnColor}">Game #${game.id}</button></li>`
    $('#pastGames').append(item)
  })

  $('#gameHistory .card').show()
}

// display single finished game
const displayFinishedGame = function (gameData) {
  const cells = gameData.cells
  markCells(cells, false)

  // show winner
  if (logic.isDraw(cells)) {
    // stalemate
    $('#gameStatus').text('Draw')
  } else {
    // somebody won
    let bgColor
    const winX = logic.isWin(cells, 'x')
    const winO = logic.isWin(cells, 'o')
    if (winX >= 0) {
      // x won
      bgColor = utils.getMarkColor('x')
      logic.highlightWinningSquares(winX, bgColor)
      $('#gameStatus').text('Won by X')
    } else {
      // o won
      bgColor = utils.getMarkColor('o')
      logic.highlightWinningSquares(winO, bgColor)
      $('#gameStatus').text('Won by O')
    }
  }
}

// display single unfinished game
const displayGameInProgress = function (gameData) {
  if (logic.isBlank(gameData)) {
    clearBoard(true)
  } else {
    // show used cells
    markCells(gameData.cells, true)
  }
  playGame(gameData)
}

// mark board from historical game
const markCells = function (cells, enableEmptyCells) {
  // loop through cell array, mark board where appropriate
  for (let idx = 0; idx < cells.length; idx++) {
    const mark = cells[idx]
    const sq = '#' + logic.indexToSquare(idx)
    if (mark === '') {
      // cell is empty
      if (enableEmptyCells) {
        $(sq).data('enabled', 'true').css('background-color', utils.getTheme().readySquare)
      } else {
        $(sq).data('enabled', 'false').css('background-color', utils.getTheme().disableSquare)
      }
    } else {
      // cell contains mark
      const img = utils.getMarkImage(mark)
      $(sq).addClass(mark)
        .css('background-color', USED_CELL_BG)
        .data('enabled', 'false')
        .html(img)
    }
  }
}

// takes unfinished game data from API, restarts game play
const playGame = function (game) {
  store.currentGame = game
  const xo = logic.playerTurn(game.cells)
  if (xo === null) {
    // board is full, yet somehow inexplicably the game is not over
    utils.warningMessage('Board is Full!')
  } else {
    const player = players.getPlayer(xo)
    initTurn(player)
  }
  utils.userMessage(`Game #${game.id} re-started`)
  $('#gameStatus').text('In Progress')
  $('#resetBtn').text('Reset')
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
