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
  // set to white for new game
  $('#GameBoard .square').css('background-color', '#fff')
}

/**
 * showWinner - display the winner, halt the game
 *  - already saved win via API update
 * @param  {Player} player the winning player
 * @return {undefined}
 */
const showWinner = function (responseData) {
  const player = players.getCurrentPlayer()
  console.log('displaying winner: Player ' + player.name)
  // TODO: indicate winner status, highlight winning squares

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

// show game from history
const displayGame = function (responseData) {
  console.log('Display Game:', responseData.game)
  clearBoard()
  $('#currentGame').text('#' + responseData.game.id)
  const isOver = responseData.game.over
  const cells = responseData.game.cells
  if (logic.isEmpty(cells)) {
    console.log('Board is empty')
    $('#GameBoard .square').data('enabled', isOver ? 'true' : 'false')
  } else {
    console.log('Cell Array:', cells)
    for (let idx = 0; idx < cells.length; idx++) {
      const mark = cells[idx]
      console.log('Cell ' + idx + ': ' + mark)
      const sq = '#' + logic.indexToSquare(idx)
      if (mark !== '') {
        const img = utils.getMarkImage(mark)
        $(sq).addClass(mark)
          .css('background-color', 'transparent')
          .data('enabled', 'false')
          .html(img)
      } else { // cell is empty
        $(sq).data('enabled', isOver ? 'true' : 'false')
      }
    }

    if (isOver) {
      // show winner
      // can't use events.js method because we
      // can't reach it without circular reference
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
    } else {
      // play
      playGame(responseData.game)
    }
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
  console.log('no winner')
  // TODO: display status
  utils.userMessage('No winner')
  gameOver()
}

// Clear the board for new game
const clearBoard = function () {
  $('#GameBoard .square').empty()
    .removeClass('x o')
    .data('enabled', 'true')
  $('.turn-status').css('background-color', 'transparent')
  $('#currentTurn').text('--').css('color', '#000')
}

const gameOver = function () {
  console.log('Game Over')
  // disable squares
  $('#GameBoard .square').data('enabled', 'false')
  $('#currentGame').text('Over')
}

const initTurn = function (player) {
  const th = utils.getTheme()
  $('#statusPanel .turn-status').css('background-color', player.getColor(th))
  $('#currentTurn').text(player.name)
    .css('color', '#fff')
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
    const btnColor = isFinished ? 'light' : 'dark'
    const item = `<li class="list-group-item"><button id="g${game.id}" class="btn btn-${btnColor}">Game #${game.id}</button></li>`
    $('#pastGames').append(item)
  })
  $('#pastGames button').on('click', onShowGame)

  $('#gameHistory .card').show()
}

// takes unfinished game data from API, restarts game play
const playGame = function (game) {
  store.currentGame = game
  const xo = logic.playerTurn(game.cells)
  if (xo === null) {
    // board is full, yet somehow inexplicably the game is not over
    console.log('board is full')
    // utils.userMessage('Board is Full!')
  } else {
    const player = players.getPlayer(xo)
    initTurn(player)
  }
  utils.userMessage(`Game #${game.id} re-started`)
  $('#resetBtn').text('Reset')
}

// event handler
const onShowGame = function (event) {
  const gameId = event.target.id.substring(1)
  console.log('Show Game #' + gameId)
  gameApi.showGame(gameId)
    .then(displayGame)
    .catch(gameApiFailure)
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
